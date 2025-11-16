'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from '@/components/navigation'
import { MysticalSparkles } from '@/components/mystical-sparkles'
import { Video, MapPin, Clock, DollarSign } from 'lucide-react'
import { useState } from 'react'

const services = [
  {
    id: 1,
    name: 'Tarot Card Reading',
    description: 'Discover what the cards have tae tell ye about yer path',
    duration: '30 min',
    price: '£35',
    type: 'online',
  },
  {
    id: 2,
    name: 'Full Psychic Reading',
    description: 'Deep dive into yer spiritual journey with the universe',
    duration: '60 min',
    price: '£65',
    type: 'both',
  },
  {
    id: 3,
    name: 'Palm Reading',
    description: 'Let me read the secrets written in yer hands',
    duration: '45 min',
    price: '£45',
    type: 'in-person',
  },
  {
    id: 4,
    name: 'Energy Healing Session',
    description: 'Clear yer chakras and balance yer spiritual energy',
    duration: '60 min',
    price: '£70',
    type: 'both',
  },
  {
    id: 5,
    name: 'Quick Question',
    description: 'Get a swift answer from the spirits, no fuss',
    duration: '15 min',
    price: '£20',
    type: 'online',
  },
  {
    id: 6,
    name: 'Couples Reading',
    description: 'See what the universe has planned for you and yer partner',
    duration: '90 min',
    price: '£95',
    type: 'both',
  },
]

export default function BookingsPage() {
  const [filter, setFilter] = useState<'all' | 'online' | 'in-person'>('all')

  const filteredServices = services.filter(service => {
    if (filter === 'all') return true
    if (filter === 'online') return service.type === 'online' || service.type === 'both'
    if (filter === 'in-person') return service.type === 'in-person' || service.type === 'both'
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
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
              Online Readings (Google Meet)
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredServices.map((service) => (
              <Card key={service.id} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
                <CardHeader className="relative">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-foreground text-xl">{service.name}</CardTitle>
                    {service.type === 'online' && (
                      <Video className="h-5 w-5 text-primary flex-shrink-0" />
                    )}
                    {service.type === 'in-person' && (
                      <MapPin className="h-5 w-5 text-accent flex-shrink-0" />
                    )}
                    {service.type === 'both' && (
                      <div className="flex gap-1 flex-shrink-0">
                        <Video className="h-4 w-4 text-primary" />
                        <MapPin className="h-4 w-4 text-accent" />
                      </div>
                    )}
                  </div>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <span className="text-2xl font-bold text-foreground">{service.price}</span>
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
        </div>
      </section>

      {/* Availability Preview */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              Next Available Slots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { day: 'Monday', date: 'Mar 11', slots: ['10:00 AM', '2:00 PM', '6:00 PM'] },
                { day: 'Wednesday', date: 'Mar 13', slots: ['11:00 AM', '3:00 PM', '7:00 PM'] },
                { day: 'Friday', date: 'Mar 15', slots: ['9:00 AM', '1:00 PM', '5:00 PM'] },
              ].map((day, i) => (
                <Card key={i} className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">{day.day}</CardTitle>
                    <CardDescription className="text-muted-foreground">{day.date}, 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {day.slots.map((slot, j) => (
                        <Button
                          key={j}
                          variant="outline"
                          size="sm"
                          className="w-full border-primary/30 hover:bg-primary/10"
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
