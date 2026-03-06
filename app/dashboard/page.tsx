'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useAuthContext } from '@/contexts/AuthContext'
import { useBookings, useCourses, useCredits, useEvents } from '@/lib/hooks'
import { Calendar, BookOpen, Bell, Coins, Plus, Clock, MapPin, Play, Link as LinkIcon, Sparkles, Ticket as TicketIcon } from 'lucide-react'
import Link from 'next/link'
import { format, parseISO, isFuture } from 'date-fns'
import { BuyCreditsDialog } from '@/components/BuyCreditsDialog'
import type { Event } from '@/lib/api/types'

export default function DashboardPage() {
  const { user } = useAuthContext();
  const { bookings, fetchBookings, isLoading: bookingsLoading } = useBookings();
  const { enrollments, fetchEnrollments, isLoading: coursesLoading } = useCourses();
  const { events, fetchEvents, isLoading: eventsLoading } = useEvents();
  const { balance, fetchBalance, isLoading: creditsLoading } = useCredits();
  const [buyCreditsOpen, setBuyCreditsOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
    fetchEnrollments();
    fetchEvents(true);
  }, [fetchBookings, fetchEnrollments, fetchEvents]);

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

  // Get upcoming events (excluding booking types)
  const upcomingEvents = events
    .filter((event: Event) => {
      try {
        return isFuture(parseISO(event.startDateTime));
      } catch {
        return false;
      }
    })
    .sort((a: Event, b: Event) => {
      try {
        return parseISO(a.startDateTime).getTime() - parseISO(b.startDateTime).getTime();
      } catch {
        return 0;
      }
    });

  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'TBA';
    try {
      return format(parseISO(dateString), 'EEEE, MMM d, yyyy');
    } catch {
      return 'TBA';
    }
  };

  // Format time helper
  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return format(parseISO(dateString), 'h:mm a');
    } catch {
      return '';
    }
  };

  // Additional safe helpers for event badges
  const formatMonth = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return format(parseISO(dateString), 'MMM');
    } catch {
      return '';
    }
  };

  const formatDay = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return format(parseISO(dateString), 'd');
    } catch {
      return '';
    }
  };
  // Calculate course progress
  const calculateProgress = (enrollment: any) => {
    if (!enrollment.course?.steps || enrollment.course.steps.length === 0) return 0;
    // For now use a simplified calculation or actual progress if available
    const totalSteps = enrollment.course.steps.length;
    // If we have progress object, we can count completed steps
    // Assuming enrollment.progress might be an array or object
    const completedSteps = Array.isArray(enrollment.progress)
      ? enrollment.progress.length
      : (enrollment.progress ? 1 : 0);

    return Math.min(100, Math.round((completedSteps / totalSteps) * 100));
  };

  const isLoading = bookingsLoading || coursesLoading || creditsLoading || eventsLoading;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-primary/10 via-purple-500/5 to-transparent p-8 md:p-12 border border-primary/10">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/20 blur-3xl rounded-full" />

        <div className="relative z-10 max-w-2xl">
          <Badge variant="outline" className="mb-4 bg-background/50 backdrop-blur-sm border-primary/30 text-primary">
            <Sparkles className="w-3 h-3 mr-1" />
            Dashboard
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">{user?.name || 'Lovely Soul'}</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Here's what's happening in yer wee universe today. Everything is aligned for your growth.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground animate-pulse">Consulting the spirits...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Credit Balance Card */}
            <Card className="py-3 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credit Balance</CardTitle>
                <Coins className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  {user?.credits ?? 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1 mb-4">
                  Available for quick replies & insights
                </p>
                <Button
                  onClick={() => setBuyCreditsOpen(true)}
                  className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border-0 shadow-none hover:shadow-lg transition-all"
                >
                  <Plus className="h-4 w-4 mr-1" /> Top Up Credits
                </Button>
              </CardContent>
            </Card>

            {/* Next Appointment Card */}
            <Card className="py-3 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 md:col-span-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Calendar className="w-24 h-24 text-primary" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Next Appointment
                </CardTitle>
                <CardDescription>Your upcoming session details</CardDescription>
              </CardHeader>
              <CardContent>
                {nextBooking ? (
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-muted/30 p-4 rounded-xl border border-border/50">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{nextBooking.service?.name}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Clock className="w-4 h-4" />
                        {formatDate(nextBooking.startDateTime)} at {formatTime(nextBooking.startDateTime)}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        {nextBooking.type === 'ONLINE' ? <LinkIcon className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                        {nextBooking.type === 'ONLINE' ? 'Online Meeting' : 'In Person'}
                      </div>
                    </div>
                    <Button variant="default" asChild className="shrink-0">
                      <Link href={`/bookings/${nextBooking.id}`}>Join Session</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6 flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">No upcoming appointments</p>
                      <p className="text-sm text-muted-foreground">Ready to explore your path?</p>
                    </div>
                    <Button variant="outline" asChild className="mt-2 text-primary border-primary/20 hover:bg-primary/5">
                      <Link href="/bookings/new">Book a Reading</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* My Courses Section */}
            <Card className="py-3 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    My Courses
                  </CardTitle>
                  <CardDescription>Your learning journey</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/courses">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {enrollments && enrollments.length > 0 ? (
                  <div className="space-y-4">
                    {enrollments.slice(0, 3).map((enrollment) => (
                      <div key={enrollment.id} className="p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm line-clamp-1">{enrollment.course?.title}</h4>
                          <span className="text-xs font-bold text-primary">{calculateProgress(enrollment)}%</span>
                        </div>
                        <Progress value={calculateProgress(enrollment)} className="h-1.5 mb-3" />
                        <Button variant="outline" size="sm" className="w-full h-8 text-xs" asChild>
                          <Link href={`/dashboard/courses/${enrollment.courseId}`}>Continue Learning</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-8 w-8 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-sm text-muted-foreground mb-4">No active courses yet</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/courses">Explore Courses</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events Section */}
            <Card className="py-3 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    Upcoming Events
                  </CardTitle>
                  <CardDescription>Don't miss out on the magic</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/events">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex gap-4 p-3 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors group">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center shrink-0">
                          <span className="text-[10px] uppercase font-bold text-primary opacity-70">
                            {formatMonth(event.startDateTime)}
                          </span>
                          <span className="text-lg font-bold text-primary leading-none">
                            {formatDay(event.startDateTime)}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm truncate">{event.title}</h4>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {formatTime(event.startDateTime)}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                          <Link href={`/events/${event.id}`}>
                            <Play className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-8 w-8 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-sm text-muted-foreground mb-4">No events scheduled yet</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/events">Check Calendar</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Notifications / Updates */}
            <Card className="py-3 col-span-1 lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-accent" />
                  Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 animate-pulse" />
                  <div>
                    <p className="font-medium text-sm">Welcome to the new dashboard!</p>
                    <p className="text-muted-foreground text-xs mt-1">We've updated the look and feel to help you navigate better.</p>
                    <p className="text-xs text-muted-foreground mt-2 opacity-70">Just now</p>
                  </div>
                </div>
                {enrollments && enrollments.length > 0 && (
                  <div className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Keep Learning</p>
                      <p className="text-muted-foreground text-xs mt-1">You have {enrollments.length} active courses. Continue where you left off!</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="py-3 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Link href="/dashboard/courses" className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all group text-center space-y-2">
                  <BookOpen className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-xs font-medium">My Courses</span>
                </Link>
                <Link href="/dashboard/ai-chat" className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all group text-center space-y-2">
                  <Sparkles className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-xs font-medium">Ask AI</span>
                </Link>
                <Link href="/dashboard/events" className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all group text-center space-y-2">
                  <TicketIcon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-xs font-medium">My Tickets</span>
                </Link>
                <div onClick={() => setBuyCreditsOpen(true)} className="cursor-pointer flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all group text-center space-y-2">
                  <Coins className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-xs font-medium">Buy Credits</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
      <BuyCreditsDialog open={buyCreditsOpen} onOpenChange={setBuyCreditsOpen} />
    </div>
  )
}
