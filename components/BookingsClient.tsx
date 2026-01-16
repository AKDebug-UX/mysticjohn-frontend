"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from '@/components/navigation'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { MysticalSparkles } from '@/components/mystical-sparkles'
import { BookingDialog } from '@/components/BookingDialog'
import { useBookings } from '@/lib/hooks'
import type { Service } from '@/lib/api/types'
import { Video, MapPin, Clock, DollarSign } from 'lucide-react'

export default function BookingsClient() {
  const searchParams = useSearchParams()
  const { services, isLoading, error, fetchServices } = useBookings()
  const [filter, setFilter] = useState<'all' | 'online' | 'in-person'>('all')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  // Auto-open booking dialog if coming from "Book New Session" button
  useEffect(() => {
    const shouldOpen = searchParams.get('book') === 'true'
    const serviceId = searchParams.get('serviceId')

    if (shouldOpen && services.length > 0 && !isBookingDialogOpen) {
      // If serviceId is provided, find that service
      if (serviceId) {
        const service = services.find(s => s.id === serviceId)
        if (service) {
          setSelectedService(service)
          setIsBookingDialogOpen(true)
        }
      } else {
        // Otherwise, open first available service
        setSelectedService(services[0])
        setIsBookingDialogOpen(true)
      }
    }
  }, [searchParams, services, isBookingDialogOpen])

  // Note: Services don't have a type field - users choose ONLINE/IN_PERSON when booking
  // Filter is kept for future enhancement if services get categorized
  const filteredServices = services.filter(service => {
    if (filter === 'all') return true
    // For now, all services support both online and in-person
    // This can be enhanced when service types are added to the API
    return true
  })

  const handleBookClick = (service: Service) => {
    // Check if user is authenticated before opening booking dialog
    // This will be handled by the BookingDialog component
    setSelectedService(service)
    setIsBookingDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 lg:ml-64">
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
                    <div className="max-w-md mx-auto space-y-4">
                      <p className="text-muted-foreground text-lg">No services available at the moment.</p>
                      <p className="text-sm text-muted-foreground">
                        We're working on adding more services. Check back soon or contact us for special requests.
                      </p>
                    </div>
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
                              <Button
                                size="sm"
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                                onClick={() => handleBookClick(service)}
                              >
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

      <MobileBottomNav />

      <BookingDialog
        open={isBookingDialogOpen}
        onOpenChange={setIsBookingDialogOpen}
        service={selectedService}
      />
    </div>
  )
}
