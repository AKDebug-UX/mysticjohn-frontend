'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navigation } from '@/components/navigation'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { MysticalSparkles } from '@/components/mystical-sparkles'
import { useEvents } from '@/lib/hooks'
import { Calendar, Clock, MapPin, Users, Star, Sparkles } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'

export default function EventsPage() {
  const { events, isLoading, error, fetchEvents } = useEvents()

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  // Get featured event (first event or event with featured flag if you add that)
  const featuredEvent = events.length > 0 ? events[0] : null
  const otherEvents = events.slice(1)

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMMM d, yyyy')
    } catch {
      return dateString
    }
  }

  const formatTime = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'h:mm a')
    } catch {
      return ''
    }
  }

  return (
    <div className="min-h-screen bg-background">
        <Navigation />

        <div className="flex">
          <DashboardSidebar />

          <main className="flex-1 lg:ml-64 pb-20 lg:pb-0">
            {/* Header */}
            <section className="relative overflow-hidden py-16 md:py-24">
              <MysticalSparkles />
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">
                    Upcoming Events & Workshops
                  </h1>
                  <p className="text-xl text-muted-foreground text-pretty">
                    Grab yer ticket before the spirits beat ye to it.
                  </p>
                </div>
              </div>
            </section>

            {/* Featured Event Spotlight */}
            {featuredEvent && (
              <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-6">
                      <Star className="h-6 w-6 text-accent animate-glow" />
                      <h2 className="text-2xl font-bold text-foreground">Featured Event</h2>
                    </div>
                    <Card className="border-accent/50 relative overflow-hidden shadow-lg shadow-accent/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent" />
                      <MysticalSparkles />
                      <div className="relative z-10">
                        <CardHeader>
                          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                            <div>
                              <Badge className="bg-accent text-accent-foreground mb-3">Featured</Badge>
                              <CardTitle className="text-3xl text-foreground mb-2">{featuredEvent.title}</CardTitle>
                              {featuredEvent.description && (
                                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                                  {featuredEvent.description}
                                </CardDescription>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-5 w-5 text-primary" />
                              <span className="text-sm">{formatDate(featuredEvent.startDateTime)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="h-5 w-5 text-primary" />
                              <span className="text-sm">{formatTime(featuredEvent.startDateTime)}</span>
                            </div>
                            {featuredEvent.location && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-5 w-5 text-primary" />
                                <span className="text-sm">{featuredEvent.location}</span>
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="space-y-2">
                              {featuredEvent.capacity && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Users className="h-5 w-5" />
                                  <span className="text-sm">{featuredEvent.capacity} capacity</span>
                                </div>
                              )}
                            </div>
                            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                              <Link href={`/events/${featuredEvent.id}`}>
                                Get Your Ticket
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                </div>
              </section>
            )}

            {/* Events Grid */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-4 text-muted-foreground">Loading events...</p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center py-20">
                    <p className="text-destructive mb-4">{error}</p>
                    <Button onClick={() => fetchEvents()}>Try Again</Button>
                  </div>
                ) : otherEvents.length === 0 && !featuredEvent ? (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">No events available at the moment.</p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-foreground mb-8 text-center">All Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                      {otherEvents.map((event) => (
                        <Card key={event.id} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 relative overflow-hidden">
                          <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 relative overflow-hidden flex items-center justify-center">
                            <MysticalSparkles />
                            <Sparkles className="h-20 w-20 text-primary/40 animate-float relative z-10" />
                            {event.coverImageUrl && (
                              <img
                                src={event.coverImageUrl}
                                alt={event.title}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <CardHeader>
                            <CardTitle className="text-foreground">{event.title}</CardTitle>
                            {event.description && (
                              <CardDescription className="text-muted-foreground leading-relaxed">
                                {event.description}
                              </CardDescription>
                            )}
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span>{formatDate(event.startDateTime)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>{formatTime(event.startDateTime)}</span>
                              </div>
                              {event.location && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4 text-primary" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                              {event.capacity && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Users className="h-4 w-4 text-primary" />
                                  <span>{event.capacity} capacity</span>
                                </div>
                              )}
                              {event.ticketTypes && event.ticketTypes.length > 0 && (
                                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                                  <span className="text-2xl font-bold text-primary">
                                    £{event.ticketTypes[0].price}
                                  </span>
                                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                                    <Link href={`/events/${event.id}`}>
                                      Get Ticket
                                    </Link>
                                  </Button>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* App Reminder */}
            <section className="py-16 bg-card/50">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center space-y-4">
                  <Sparkles className="h-12 w-12 mx-auto text-primary animate-glow" />
                  <h2 className="text-2xl font-bold text-foreground">View Your Tickets Anytime</h2>
                  <p className="text-muted-foreground text-pretty">
                    All yer tickets will be available in yer dashboard. Never miss an event, lovely soul.
                  </p>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <Link href="/dashboard">View My Tickets</Link>
                  </Button>
                </div>
              </div>
            </section>
          </main>
        </div>
        <MobileBottomNav />
      </div>
  )
}
