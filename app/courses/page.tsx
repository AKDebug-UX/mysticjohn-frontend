'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navigation } from '@/components/navigation'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { MysticalSparkles } from '@/components/mystical-sparkles'
import { useCourses } from '@/lib/hooks'
import { BookOpen, Clock, Star, Play, Check, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function CoursesPage() {
  const { courses, isLoading, error, fetchCourses } = useCourses()

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

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
                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-4 text-muted-foreground">Loading courses...</p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center py-20">
                    <p className="text-destructive mb-4">{error}</p>
                    <Button onClick={() => fetchCourses()}>Try Again</Button>
                  </div>
                ) : courses.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">No courses available at the moment.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {courses.map((course) => (
                      <Card key={course.id} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 relative overflow-hidden flex flex-col">
                        <div className="h-48 bg-linear-to-br from-primary/20 via-accent/20 to-secondary/20 relative overflow-hidden flex items-center justify-center">
                          <MysticalSparkles />
                          <BookOpen className="h-20 w-20 text-primary/40 animate-float relative z-10" />
                          {course.coverImageUrl && (
                            <img
                              src={course.coverImageUrl}
                              alt={course.title}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <CardHeader className="grow">
                          <div className="flex items-start justify-between mb-2">
                            <CardTitle className="text-foreground">{course.title}</CardTitle>
                          </div>
                          {course.description && (
                            <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                              {course.description}
                            </CardDescription>
                          )}
                          {course.steps && course.steps.length > 0 && (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>{course.steps.length} lessons</span>
                              </div>
                            </div>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between pt-3 border-t border-border/50">
                            <span className="text-2xl font-bold text-primary">£{course.price}</span>
                            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                              <Link href={`/courses/${course.id}`}>
                                Start Course
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
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

            {/* CTA Section */}
            <section className="py-16 bg-linear-to-br from-primary/5 via-accent/5 to-transparent relative overflow-hidden">
              <MysticalSparkles />
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                  <Sparkles className="h-12 w-12 mx-auto text-primary animate-glow" />
                  <h2 className="text-3xl font-bold text-foreground">Ready tae Begin?</h2>
                  <p className="text-muted-foreground text-pretty">
                    Start yer spiritual education today and unlock the mysteries of the universe
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
        <MobileBottomNav />
      </div>
  )
}
