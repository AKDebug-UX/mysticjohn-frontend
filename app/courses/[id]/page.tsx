'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { MysticalSparkles } from '@/components/mystical-sparkles'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Clock, ArrowLeft, Loader2, Play } from 'lucide-react'
import Link from 'next/link'
import { useCourses } from '@/lib/hooks/useCourses'
import { useCheckout } from '@/lib/hooks/useCheckout'
import { useAuthContext } from '@/contexts/AuthContext'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import type { Course } from '@/lib/api/types'

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { fetchCourse, isLoading: isCourseLoading, error: courseError } = useCourses()
  const { checkout, isLoading: isCheckoutLoading } = useCheckout()
  const { isAuthenticated } = useAuthContext()
  const router = useRouter()

  const [course, setCourse] = useState<Course | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCourse = async () => {
      // Guard against invalid IDs to prevent `/api/courses/undefined` calls
      if (!id || id === 'undefined' || id === 'null') {
        setError('Invalid course ID')
        return
      }
      const data = await fetchCourse(id)
      if (data) {
        setCourse(data)
      } else {
        setError('Course not found')
      }
    }
    loadCourse()
  }, [id, fetchCourse])

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to enroll')
      router.push(`/login?redirect=/courses/${id}`)
      return
    }

    try {
      const result = await checkout({
        itemType: 'course',
        courseId: id,
        quantity: 1,
        price: course?.price,
      })

      if (result) {
        if ('checkoutUrl' in result && result.checkoutUrl) {
          const transactionId = result?.paymentId
          const sessionId = result?.sessionId

          if (transactionId) {
            sessionStorage.setItem('checkout_transaction_id', transactionId)
          }
          if (sessionId) {
            sessionStorage.setItem('checkout_session_id', sessionId)
          }

          toast.info('Redirecting to secure payment...', { duration: 1500 })
          window.location.href = result.checkoutUrl
        } else if (result.paymentIntent?.clientSecret) {
          toast.error('Please update the backend to use Checkout Sessions')
        } else {
          toast.error('Checkout session not received')
        }
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to process payment')
    }
  }

  if (isCourseLoading || (!course && !error)) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Conjuring course details...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || courseError || !course) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Course Not Found</h1>
            <p className="text-muted-foreground">The spirits cannot locate this course.</p>
            <Button asChild>
              <Link href="/courses">Back to Courses</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Course Header Image/Banner */}
        <section className="relative h-[40vh] min-h-[400px] overflow-hidden">
          {course.coverImageUrl || course.image ? (
            <img
              src={course.coverImageUrl || course.image!}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-b from-primary/20 via-accent/20 to-background flex items-center justify-center">
              <MysticalSparkles />
              <BookOpen className="h-24 w-24 text-primary/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />

          <div className="absolute top-8 left-4 container mx-auto">
            <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20 hover:text-white">
              <Link href="/courses">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
              </Link>
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90">
                  Online Program
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
                  {course.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-lg">
                  {course.duration && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>{course.duration} hours</span>
                    </div>
                  )}
                  {course.lessonCount && (
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span>{course.lessonCount} lessons</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {/* Left Column: Description and Curriculum */}
              <div className="lg:col-span-2 space-y-8">
                {course.description && (
                  <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">
                    <p>{course.description}</p>
                  </div>
                )}

                {course.steps && course.steps.length > 0 && (
                  <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-foreground mb-4">Curriculum</h3>
                    <ul className="space-y-4">
                      {course.steps.map((step) => (
                        <li key={step.id || step._id} className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <Play className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-foreground font-medium">{step.title}</p>
                            <p className="text-xs text-muted-foreground">{step.contentType}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column: Purchase Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card className="border-primary/50 overflow-hidden shadow-2xl shadow-primary/10">
                    <div className="h-2 bg-linear-to-r from-primary via-accent to-secondary" />
                    <CardHeader>
                      <CardTitle>Enroll in This Course</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-end justify-between border-b border-border/50 pb-6">
                        <span className="text-sm text-muted-foreground">Full access</span>
                        <span className="text-3xl font-bold text-primary">£{course.price}</span>
                      </div>

                      <Button
                        size="lg"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={handleEnroll}
                        disabled={isCheckoutLoading}
                      >
                        {isCheckoutLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Enroll Now
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        Secure payment via Stripe. <br />
                        Access is granted immediately after purchase.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}