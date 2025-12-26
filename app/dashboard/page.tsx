'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Navigation } from '@/components/navigation'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { MysticalSparkles } from '@/components/mystical-sparkles'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuthContext } from '@/contexts/AuthContext'
import { useBookings } from '@/lib/hooks'
import { useCourses } from '@/lib/hooks'
import { useEvents } from '@/lib/hooks'
import { useCredits } from '@/lib/hooks'
import { Calendar, Star, BookOpen, Bell, Coins, Plus, Clock, MapPin, Play, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { format, parseISO, isFuture } from 'date-fns'

export default function DashboardPage() {
  const { user } = useAuthContext();
  const { bookings, fetchBookings, isLoading: bookingsLoading } = useBookings();
  const { enrollments, fetchEnrollments, isLoading: coursesLoading } = useCourses();
  const { tickets, fetchTickets, isLoading: ticketsLoading } = useEvents();
  const { balance, fetchBalance, isLoading: creditsLoading } = useCredits();

  useEffect(() => {
    fetchBookings();
    fetchEnrollments();
    fetchTickets();
    fetchBalance();
  }, [fetchBookings, fetchEnrollments, fetchTickets, fetchBalance]);

  // Get next upcoming booking
  const upcomingBookings = bookings
    .filter(booking => {
      try {
        return isFuture(parseISO(booking.startDateTime));
      } catch {
        return false;
      }
    })
    .sort((a, b) => {
      try {
        return parseISO(a.startDateTime).getTime() - parseISO(b.startDateTime).getTime();
      } catch {
        return 0;
      }
    });

  const nextBooking = upcomingBookings[0];

  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'EEEE, MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  // Format time helper
  const formatTime = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'h:mm a');
    } catch {
      return '';
    }
  };

  // Calculate course progress
  const calculateProgress = (enrollment: any) => {
    if (!enrollment.course?.steps || enrollment.course.steps.length === 0) return 0;
    const totalSteps = enrollment.course.steps.length;
    const completedSteps = enrollment.progress ? 1 : 0; // Simplified - you may need to adjust based on your data structure
    return Math.round((completedSteps / totalSteps) * 100);
  };

  const isLoading = bookingsLoading || coursesLoading || ticketsLoading || creditsLoading;

  return (
    <ProtectedRoute>
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
                  Welcome Back, {user?.name || 'Lovely Soul'}
                </h1>
                <p className="text-muted-foreground text-lg">
                  Here's what's happening in yer wee universe today.
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-muted-foreground">Loading yer dashboard...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Dashboard Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {/* Credit Balance Card */}
                  <Card className="border-primary/50 relative overflow-hidden shadow-lg shadow-primary/10">
                    <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent" />
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
                          <div className="text-4xl font-bold text-primary mb-2">
                            {balance?.balance ?? 0}
                          </div>
                          <p className="text-sm text-muted-foreground">Credits remaining</p>
                        </div>
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                          <Link href="/dashboard">
                            <Plus className="h-4 w-4 mr-1" />
                            Buy More
                          </Link>
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
                      <CardDescription className="text-muted-foreground">
                        {nextBooking?.service?.name || 'No upcoming appointments'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {nextBooking ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{formatDate(nextBooking.startDateTime)} at {formatTime(nextBooking.startDateTime)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {nextBooking.type === 'ONLINE' ? (
                              <>
                                <LinkIcon className="h-4 w-4" />
                                <span>Online</span>
                              </>
                            ) : (
                              <>
                                <MapPin className="h-4 w-4" />
                                <span>In Person</span>
                              </>
                            )}
                          </div>
                          <Button size="sm" variant="outline" className="w-full mt-2 border-accent/50 hover:bg-accent/10" asChild>
                            <Link href="/bookings">View Details</Link>
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">No upcoming appointments</p>
                          <Button size="sm" variant="outline" className="w-full mt-2 border-accent/50 hover:bg-accent/10" asChild>
                            <Link href="/bookings">Book a Reading</Link>
                          </Button>
                        </div>
                      )}
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
                      {tickets && tickets.length > 0 ? (
                        <div className="space-y-3">
                          {tickets.slice(0, 2).map((ticket) => (
                            <div key={ticket.id} className="flex items-center justify-between p-2 rounded-lg bg-accent/5">
                              <span className="text-sm font-medium text-foreground">
                                {ticket.event?.title || 'Event'}
                              </span>
                              <Badge variant="outline" className="border-accent/50 text-accent">
                                {ticket.event?.startDateTime ? format(parseISO(ticket.event.startDateTime), 'MMM d') : ''}
                              </Badge>
                            </div>
                          ))}
                          {tickets.length > 2 && (
                            <Link href="/events" className="text-sm text-primary hover:underline">
                              View all ({tickets.length})
                            </Link>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">No tickets yet</p>
                          <Button size="sm" variant="outline" className="w-full mt-2 border-accent/50 hover:bg-accent/10" asChild>
                            <Link href="/events">Browse Events</Link>
                          </Button>
                        </div>
                      )}
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
                      {enrollments && enrollments.length > 0 ? (
                        enrollments.slice(0, 2).map((enrollment) => {
                          const progress = calculateProgress(enrollment);
                          const totalSteps = enrollment.course?.steps?.length || 0;
                          const completedSteps = Math.round((progress / 100) * totalSteps);

                          return (
                            <div key={enrollment.id} className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium text-foreground">
                                    {enrollment.course?.title || 'Course'}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {completedSteps} of {totalSteps} lessons completed
                                  </p>
                                </div>
                                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                                  <Link href={`/courses/${enrollment.courseId}`}>
                                    <Play className="h-4 w-4 mr-1" />
                                    Continue
                                  </Link>
                                </Button>
                              </div>
                              <Progress value={progress} className="h-2" />
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground mb-4">No courses enrolled yet</p>
                          <Button variant="outline" className="border-primary/50 hover:bg-primary/10" asChild>
                            <Link href="/courses">Browse Courses</Link>
                          </Button>
                        </div>
                      )}
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
                      {/* Placeholder notifications - you can integrate with your notification system later */}
                      <div className="flex gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                        <div>
                          <p className="text-sm text-foreground">Welcome to Mystic John!</p>
                          <p className="text-xs text-muted-foreground">Just now</p>
                        </div>
                      </div>
                      {nextBooking && (
                        <div className="flex gap-3">
                          <div className="h-2 w-2 rounded-full bg-accent mt-2 shrink-0" />
                          <div>
                            <p className="text-sm text-foreground">Upcoming: {nextBooking.service?.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {nextBooking.startDateTime ? formatDate(nextBooking.startDateTime) : ''}
                            </p>
                          </div>
                        </div>
                      )}
                      {enrollments && enrollments.length > 0 && (
                        <div className="flex gap-3">
                          <div className="h-2 w-2 rounded-full bg-muted mt-2 shrink-0" />
                          <div>
                            <p className="text-sm text-foreground">Continue yer courses</p>
                            <p className="text-xs text-muted-foreground">You have {enrollments.length} course{enrollments.length !== 1 ? 's' : ''} in progress</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions Row */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-primary/50 hover:bg-primary/10" asChild>
                      <Link href="/bookings">
                        <Calendar className="h-6 w-6 text-primary" />
                        <span className="text-sm font-medium">Book a Reading</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-accent/50 hover:bg-accent/10" asChild>
                      <Link href="/dashboard">
                        <Star className="h-6 w-6 text-accent" />
                        <span className="text-sm font-medium">Join a Group</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-primary/50 hover:bg-primary/10" asChild>
                      <Link href="/courses">
                        <BookOpen className="h-6 w-6 text-primary" />
                        <span className="text-sm font-medium">Continue Course</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-accent/50 hover:bg-accent/10" asChild>
                      <Link href="/dashboard">
                        <Coins className="h-6 w-6 text-accent" />
                        <span className="text-sm font-medium">Spend a Credit</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
