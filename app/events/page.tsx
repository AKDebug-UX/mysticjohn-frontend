import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navigation } from '@/components/navigation'
import { MysticalSparkles } from '@/components/mystical-sparkles'
import { Calendar, Clock, MapPin, Users, Star, Sparkles } from 'lucide-react'

const featuredEvent = {
  id: 1,
  name: 'Spring Equinox Spiritual Gathering',
  description: 'Join us for a magical evening celebrating the balance of light and dark. Experience group meditation, energy work, and connect with the spirits of the season.',
  date: 'March 20, 2025',
  time: '7:00 PM - 10:00 PM',
  location: 'The Sacred Space, Edinburgh',
  price: '£55',
  attendees: 24,
  maxAttendees: 30,
  featured: true,
}

const events = [
  {
    id: 2,
    name: 'Tarot Reading Workshop',
    description: 'Learn tae read the cards like a pro. Perfect for beginners and those wantin\' tae sharpen their skills.',
    date: 'March 15, 2025',
    time: '7:00 PM',
    location: 'Online via Google Meet',
    price: '£45',
    attendees: 12,
    maxAttendees: 20,
  },
  {
    id: 3,
    name: 'Full Moon Meditation',
    description: 'Harness the power of the full moon with guided meditation and crystal healing.',
    date: 'March 22, 2025',
    time: '8:00 PM',
    location: 'Holyrood Park, Edinburgh',
    price: 'Free',
    attendees: 45,
    maxAttendees: 50,
  },
  {
    id: 4,
    name: 'Psychic Development Circle',
    description: 'Develop yer psychic abilities in a safe, supportive environment with fellow seekers.',
    date: 'March 29, 2025',
    time: '6:30 PM',
    location: 'The Mystical Center, Glasgow',
    price: '£35',
    attendees: 8,
    maxAttendees: 15,
  },
  {
    id: 5,
    name: 'Spirit Guide Connection',
    description: 'Meet yer spirit guides through deep meditation and guided visualization.',
    date: 'April 5, 2025',
    time: '7:30 PM',
    location: 'Online via Google Meet',
    price: '£40',
    attendees: 18,
    maxAttendees: 25,
  },
  {
    id: 6,
    name: 'Crystal Healing Workshop',
    description: 'Discover the ancient power of crystals and how tae use them for healing and protection.',
    date: 'April 12, 2025',
    time: '2:00 PM',
    location: 'The Sacred Space, Edinburgh',
    price: '£50',
    attendees: 10,
    maxAttendees: 18,
  },
  {
    id: 7,
    name: 'Past Life Regression Session',
    description: 'Journey through yer past lives and uncover the mysteries that shape yer current path.',
    date: 'April 19, 2025',
    time: '6:00 PM',
    location: 'The Mystical Center, Glasgow',
    price: '£60',
    attendees: 5,
    maxAttendees: 12,
  },
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
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
                      <CardTitle className="text-3xl text-foreground mb-2">{featuredEvent.name}</CardTitle>
                      <CardDescription className="text-base text-muted-foreground leading-relaxed">
                        {featuredEvent.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="text-sm">{featuredEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="text-sm">{featuredEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="text-sm">{featuredEvent.location}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-5 w-5" />
                        <span className="text-sm">{featuredEvent.attendees} / {featuredEvent.maxAttendees} attending</span>
                      </div>
                      <div className="text-3xl font-bold text-accent">{featuredEvent.price}</div>
                    </div>
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      Get Your Ticket
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">All Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {events.map((event) => (
              <Card key={event.id} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 relative overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 relative overflow-hidden flex items-center justify-center">
                  <MysticalSparkles />
                  <Sparkles className="h-20 w-20 text-primary/40 animate-float relative z-10" />
                </div>
                <CardHeader>
                  <CardTitle className="text-foreground">{event.name}</CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{event.attendees} / {event.maxAttendees} attending</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <span className="text-2xl font-bold text-primary">{event.price}</span>
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Get Ticket
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Reminder */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <Sparkles className="h-12 w-12 mx-auto text-primary animate-glow" />
            <h2 className="text-2xl font-bold text-foreground">View Your Tickets Anytime</h2>
            <p className="text-muted-foreground text-pretty">
              All yer tickets will be available in the Spaces App. Never miss an event, lovely soul.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Download Spaces App
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
