'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from '@/components/navigation'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { MysticalSparkles } from '@/components/mystical-sparkles'
import { useBookings } from '@/lib/hooks'
import { Video, MapPin, Clock, DollarSign } from 'lucide-react'

export default function BookingsPage() {
  const { services, isLoading, error, fetchServices } = useBookings()
  const [filter, setFilter] = useState<'all' | 'online' | 'in-person'>('all')

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const filteredServices = services.filter(service => {
    if (filter === 'all') return true
    // Note: You may need to adjust this based on your Service type structure
    // For now, we'll assume services don't have a type field in the API response
    return true
  })

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="flex">
          <DashboardSidebar />

          <main className="flex-1">
            {/* Header */}
            <section className="relative overflow-hidden py-16 md:py-24">
              <MysticalSparkles />
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">
                    Book Your Session, Pal
                  </h1>
                  <p className="text-xl text-muted-foreground text-pretty">
                    Choose in-person or online — whatever suits yer vibes.
                  </p>
                </div>
              </div>
            </section>

            {/* Service Filters */}
            <section className="py-8 border-b border-border/50">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilter('all')}
                    className={filter === 'all' ? 'bg-primary text-primary-foreground' : 'border-primary/50 hover:bg-primary/10'}
                  >
                    All Services
                  </Button>
                  <Button
                    variant={filter === 'online' ? 'default' : 'outline'}
                    onClick={() => setFilter('online')}
                    className={filter === 'online' ? 'bg-primary text-primary-foreground' : 'border-primary/50 hover:bg-primary/10'}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Online Readings
                  </Button>
                  <Button
                    variant={filter === 'in-person' ? 'default' : 'outline'}
                    onClick={() => setFilter('in-person')}
                    className={filter === 'in-person' ? 'bg-primary text-primary-foreground' : 'border-primary/50 hover:bg-primary/10'}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    In-Person Readings
                  </Button>
                </div>
              </div>
            </section>

            {/* Service Grid */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-4 text-muted-foreground">Loading services...</p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center py-20">
                    <p className="text-destructive mb-4">{error}</p>
                    <Button onClick={() => fetchServices()}>Try Again</Button>
                  </div>
                ) : filteredServices.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">No services available at the moment.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {filteredServices.map((service) => (
                      <Card key={service.id} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-primary/20 to-accent/20 blur-2xl" />
                        <CardHeader className="relative">
                          <div className="flex items-start justify-between mb-2">
                            <CardTitle className="text-foreground text-xl">{service.name}</CardTitle>
                            <Video className="h-5 w-5 text-primary shrink-0" />
                          </div>
                          {service.description && (
                            <CardDescription className="text-muted-foreground leading-relaxed">
                              {service.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="relative">
                          <div className="space-y-3">
                            {service.duration && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{service.duration} minutes</span>
                              </div>
                            )}
                            <div className="flex items-center justify-between pt-2 border-t border-border/50">
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <span className="text-2xl font-bold text-foreground">£{service.price}</span>
                              </div>
                              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                Book Now
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
