import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Navigation } from '@/components/navigation'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { MysticalSparkles } from '@/components/mystical-sparkles'
import { Calendar, Star, BookOpen, Bell, Coins, Plus, Clock, MapPin, Play } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-6 lg:p-8">
          {/* Welcome Header */}
          <div className="mb-8 relative">
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Welcome Back, Lovely Soul
              </h1>
              <p className="text-muted-foreground text-lg">
                Here's what's happening in yer wee universe today.
              </p>
            </div>
          </div>

          {/* Dashboard Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Credit Balance Card */}
            <Card className="border-primary/50 relative overflow-hidden shadow-lg shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <MysticalSparkles />
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">Credit Balance</CardTitle>
                  <Coins className="h-5 w-5 text-primary" />
                </div>
                <CardDescription className="text-muted-foreground">Available for quick replies</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">3</div>
                    <p className="text-sm text-muted-foreground">Credits remaining</p>
                  </div>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-1" />
                    Buy More
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments Card */}
            <Card className="border-border/50 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">Next Appointment</CardTitle>
                  <Calendar className="h-5 w-5 text-accent" />
                </div>
                <CardDescription className="text-muted-foreground">Tarot Card Reading</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Tomorrow, 3:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Google Meet</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-2 border-accent/50 hover:bg-accent/10">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Event Tickets Card */}
            <Card className="border-border/50 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">Event Tickets</CardTitle>
                  <Star className="h-5 w-5 text-accent" />
                </div>
                <CardDescription className="text-muted-foreground">Upcoming events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-accent/5">
                    <span className="text-sm font-medium text-foreground">Full Moon Meditation</span>
                    <Badge variant="outline" className="border-accent/50 text-accent">Mar 22</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-accent/5">
                    <span className="text-sm font-medium text-foreground">Spring Equinox</span>
                    <Badge variant="outline" className="border-accent/50 text-accent">Mar 20</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Courses in Progress */}
            <Card className="lg:col-span-2 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">Courses in Progress</CardTitle>
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <CardDescription className="text-muted-foreground">Keep learning, lovely soul</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Tarot Fundamentals</h4>
                      <p className="text-sm text-muted-foreground">12 of 24 lessons completed</p>
                    </div>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Play className="h-4 w-4 mr-1" />
                      Continue
                    </Button>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Psychic Development Program</h4>
                      <p className="text-sm text-muted-foreground">4 of 32 lessons completed</p>
                    </div>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Play className="h-4 w-4 mr-1" />
                      Continue
                    </Button>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Community Notifications */}
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">Notifications</CardTitle>
                  <Bell className="h-5 w-5 text-accent" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">New message from John</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">Event reminder: Full Moon</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-muted mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">New course available</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Row */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-primary/50 hover:bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Book a Reading</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-accent/50 hover:bg-accent/10">
                <Star className="h-6 w-6 text-accent" />
                <span className="text-sm font-medium">Join a Group</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-primary/50 hover:bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Continue Course</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-accent/50 hover:bg-accent/10">
                <Coins className="h-6 w-6 text-accent" />
                <span className="text-sm font-medium">Spend a Credit</span>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
