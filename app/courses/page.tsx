import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Navigation } from '@/components/navigation'
import { MysticalSparkles } from '@/components/mystical-sparkles'
import { BookOpen, Clock, Star, Play, Check, Sparkles } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: 'Tarot Fundamentals',
    description: 'Master the art of tarot reading from the ground up. Learn each card, their meanings, and how tae read spreads like a true mystic.',
    duration: '6 weeks',
    lessons: 24,
    level: 'Beginner',
    price: '£199',
    badge: 'Bestseller',
    progress: 0,
  },
  {
    id: 2,
    title: 'Psychic Development Program',
    description: 'Unlock yer natural psychic abilities with guided exercises, meditation, and practical applications.',
    duration: '8 weeks',
    lessons: 32,
    level: 'Intermediate',
    price: '£299',
    badge: 'New',
    progress: 0,
  },
  {
    id: 3,
    title: 'Crystal Healing Mastery',
    description: 'Deep dive into the ancient wisdom of crystals. Learn tae harness their energy for healing and protection.',
    duration: '4 weeks',
    lessons: 16,
    level: 'Beginner',
    price: '£149',
    badge: null,
    progress: 0,
  },
  {
    id: 4,
    title: 'Advanced Mediumship',
    description: 'Connect with the spirit realm and deliver messages from beyond. For experienced practitioners only.',
    duration: '10 weeks',
    lessons: 40,
    level: 'Advanced',
    price: '£399',
    badge: null,
    progress: 0,
  },
  {
    id: 5,
    title: 'Energy Healing Certification',
    description: 'Become a certified energy healer. Learn Reiki, chakra balancing, and aura cleansing techniques.',
    duration: '12 weeks',
    lessons: 48,
    level: 'Intermediate',
    price: '£499',
    badge: 'Bestseller',
    progress: 0,
  },
  {
    id: 6,
    title: 'Astrology Basics',
    description: 'Read the stars and understand yer birth chart. Perfect introduction tae the cosmic science of astrology.',
    duration: '5 weeks',
    lessons: 20,
    level: 'Beginner',
    price: '£179',
    badge: 'New',
    progress: 0,
  },
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <MysticalSparkles />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">
              Online Psychic Programs
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Learn at yer ain pace, lovely soul.
            </p>
          </div>
        </div>
      </section>

      {/* Course Catalog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {courses.map((course) => (
              <Card key={course.id} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 relative overflow-hidden flex flex-col">
                <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 relative overflow-hidden flex items-center justify-center">
                  <MysticalSparkles />
                  <BookOpen className="h-20 w-20 text-primary/40 animate-float relative z-10" />
                  {course.badge && (
                    <Badge className={`absolute top-4 right-4 ${course.badge === 'New' ? 'bg-accent' : 'bg-primary'} text-white`}>
                      {course.badge}
                    </Badge>
                  )}
                </div>
                <CardHeader className="flex-grow">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-foreground">{course.title}</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                    {course.description}
                  </CardDescription>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{course.duration} • {course.lessons} lessons</span>
                    </div>
                    <Badge variant="outline" className="border-accent/50 text-accent">
                      {course.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <span className="text-2xl font-bold text-primary">{course.price}</span>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Start Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How Courses Work Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">1. Purchase</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Choose yer course and get instant access tae all the materials
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                  <Play className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">2. Learn</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Watch video lessons, complete exercises, and practice yer skills
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
                  <Check className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">3. Track Progress</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Monitor yer journey and earn certificates upon completion
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Progress Area */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              Your Learning Journey
            </h2>
            <Card className="border-border/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-foreground">Sample Course Progress</CardTitle>
                <CardDescription className="text-muted-foreground">
                  This is how ye'll track yer progress through each course
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Tarot Fundamentals</span>
                    <span className="text-sm text-muted-foreground">12 / 24 lessons</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Crystal Healing Mastery</span>
                    <span className="text-sm text-muted-foreground">16 / 16 lessons</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <Badge className="bg-accent text-accent-foreground">Completed</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Psychic Development Program</span>
                    <span className="text-sm text-muted-foreground">4 / 32 lessons</span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent relative overflow-hidden">
        <MysticalSparkles />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <Sparkles className="h-12 w-12 mx-auto text-primary animate-glow" />
            <h2 className="text-3xl font-bold text-foreground">Ready tae Begin?</h2>
            <p className="text-muted-foreground text-pretty">
              Start yer spiritual education today and unlock the mysteries of the universe
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Browse All Courses
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
