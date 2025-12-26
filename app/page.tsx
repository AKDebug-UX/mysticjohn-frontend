import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from '@/components/navigation'
import { MysticalSparkles } from '@/components/mystical-sparkles'
import { Calendar, BookOpen, Users, Sparkles, MessageSquare, Star } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <MysticalSparkles />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Mystical Aura Effect */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full animate-glow" />
              <div className="relative">
                <Sparkles className="h-24 w-24 mx-auto text-primary animate-float" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance leading-tight">
              Welcome, Lovely Soul
              <span className="block text-primary mt-2">Your Journey Starts Here</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground text-pretty">
              Aye, come in. Let's see what the universe has tae say today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8" asChild>
                <Link href="/bookings">Book a Reading</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary/50 hover:bg-primary/10" asChild>
                <Link href="#community">Join the Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Blocks Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/bookings" className="group">
              <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">Bookings</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Schedule yer session, pal
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/events" className="group">
              <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Star className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-foreground">Events</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Mystical workshops & gatherings
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/courses" className="group">
              <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4 group-hover:bg-secondary/30 transition-colors">
                    <BookOpen className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-foreground">Courses</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Learn at yer ain pace
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/dashboard" className="group">
              <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">Groups</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Join the spiritual circle
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Message Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-primary/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-accent/5 to-transparent" />
              <MysticalSparkles />
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl text-center text-foreground flex items-center justify-center gap-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  Daily Message From John
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="bg-card/50 rounded-lg p-6 border border-border/50">
                  <p className="text-muted-foreground text-center text-lg italic leading-relaxed">
                    "The universe whispers tae those who listen. Today, trust yer intuition—it's sharper than ye think.
                    The spirits are alignin' in yer favor, so dinnae doubt yerself, lovely soul."
                  </p>
                  <p className="text-right text-sm text-muted-foreground mt-4">— John</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground text-lg">
              Grab yer ticket before the spirits beat ye to it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Tarot Reading Workshop', date: 'March 15, 2025', price: '£45', time: '7:00 PM' },
              { name: 'Full Moon Meditation', date: 'March 22, 2025', price: 'Free', time: '8:00 PM' },
              { name: 'Psychic Development Circle', date: 'March 29, 2025', price: '£35', time: '6:30 PM' },
            ].map((event, i) => (
              <Card key={i} className="border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                <CardHeader>
                  <div className="h-40 bg-linear-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    <MysticalSparkles />
                    <Star className="h-16 w-16 text-accent/40 animate-float" />
                  </div>
                  <CardTitle className="text-foreground">{event.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {event.date} • {event.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">{event.price}</span>
                    <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      Get Ticket
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-primary/50 hover:bg-primary/10" asChild>
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Join the Community CTA */}
      <section id="community" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-accent/10 to-secondary/10" />
        <MysticalSparkles />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
              Join the Circle
            </h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Connect with fellow souls, get exclusive readings, and unlock yer spiritual potential
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8">
              Join the Circle on Spaces App
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground text-sm">
            <p>© 2025 Mystic Readings by John. All rights reserved.</p>
            <p className="mt-2">Connecting souls with the universe, one reading at a time. 🔮</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
