'use client';

import { useEffect, useState } from 'react';
import { useBookings } from '@/lib/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Navigation } from '@/components/navigation';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Calendar, Clock, Video, MapPin, X, Loader2, AlertCircle } from 'lucide-react';
import { format, parseISO, isPast, isToday } from 'date-fns';
import { toast } from 'sonner';
import Link from 'next/link';

export default function MyBookingsPage() {
  const { bookings, isLoading, error, fetchBookings, cancelBooking } = useBookings();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCancelClick = (bookingId: string) => {
    console.log('Cancel button clicked for booking:', bookingId);
    setBookingToCancel(bookingId);
    setCancelDialogOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!bookingToCancel) {
      console.error('No booking ID to cancel');
      return;
    }

    setCancelDialogOpen(false);
    setCancellingId(bookingToCancel);
    try {
      console.log('Cancelling booking:', bookingToCancel);
      await cancelBooking(bookingToCancel);
      toast.success('Booking cancelled successfully');
      await fetchBookings(); // Refresh list
    } catch (err: any) {
      console.error('Error cancelling booking:', err);
      const errorMessage = err?.message || 'Failed to cancel booking';
      toast.error(errorMessage);
    } finally {
      setCancellingId(null);
      setBookingToCancel(null);
    }
  };

  const handleCancelDialogClose = () => {
    setCancelDialogOpen(false);
    setBookingToCancel(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/50';
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/50';
      case 'COMPLETED':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/50';
      case 'CANCELLED':
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/50';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const upcomingBookings = bookings.filter((booking) => {
    const bookingDate = parseISO(booking.startDateTime);
    return !isPast(bookingDate) && booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED';
  });

  const pastBookings = bookings.filter((booking) => {
    const bookingDate = parseISO(booking.startDateTime);
    return isPast(bookingDate) || booking.status === 'COMPLETED' || booking.status === 'CANCELLED';
  });

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navigation />
          <div className="flex">
            <DashboardSidebar />
            <main className="flex-1 p-6 lg:p-8 lg:ml-64 pb-20 lg:pb-8">
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            </main>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="flex">
          <DashboardSidebar />

          <main className="flex-1 p-6 lg:p-8 lg:ml-64 pb-20 lg:pb-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    My Bookings
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Manage yer appointments and sessions
                  </p>
                </div>
                <Link href="/bookings">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Book New Session
                  </Button>
                </Link>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                {error}
              </div>
            )}

            {/* Upcoming Bookings */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Upcoming</h2>
              {upcomingBookings.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                    <p className="text-muted-foreground">No upcoming bookings</p>
                    <Link href="/bookings">
                      <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                        Book a Session
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {upcomingBookings.map((booking, index) => {
                    const startDate = parseISO(booking.startDateTime);
                    const endDate = parseISO(booking.endDateTime);
                    const isUpcomingToday = isToday(startDate);

                    return (
                      <Card
                        key={booking.id || `upcoming-booking-${index}-${booking.startDateTime}`}
                        className={`border-border/50 hover:border-primary/40 transition-all ${
                          isUpcomingToday ? 'ring-2 ring-primary/50' : ''
                        }`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-xl mb-2">
                                {booking.service?.name || 'Service'}
                              </CardTitle>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={getStatusColor(booking.status)}>
                                  {booking.status}
                                </Badge>
                                {isUpcomingToday && (
                                  <Badge variant="outline" className="border-primary/50 text-primary">
                                    Today
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {booking.status !== 'CANCELLED' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  handleCancelClick(booking.id);
                                }}
                                disabled={cancellingId === booking.id || cancelDialogOpen}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                {cancellingId === booking.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <X className="h-4 w-4" />
                                )}
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{format(startDate, 'EEEE, MMM d, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>
                              {format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {booking.type === 'ONLINE' ? (
                              <Video className="h-4 w-4" />
                            ) : (
                              <MapPin className="h-4 w-4" />
                            )}
                            <span>{booking.type === 'ONLINE' ? 'Online' : 'In-Person'}</span>
                            {booking.type === 'ONLINE' && booking.meetingLink && (
                              <a
                                href={booking.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline ml-2"
                              >
                                Join Meeting
                              </a>
                            )}
                          </div>
                          {booking.service && (
                            <div className="pt-2 border-t border-border/50">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Price:</span>
                                <span className="font-semibold text-foreground">
                                  £{booking.service.price}
                                </span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Past Bookings</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {pastBookings.map((booking, index) => {
                    const startDate = parseISO(booking.startDateTime);
                    const endDate = parseISO(booking.endDateTime);

                    return (
                      <Card
                        key={booking.id || `past-booking-${index}-${booking.startDateTime}`}
                        className="border-border/50 opacity-75 hover:opacity-100 transition-opacity"
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-xl mb-2">
                                {booking.service?.name || 'Service'}
                              </CardTitle>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{format(startDate, 'EEEE, MMM d, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>
                              {format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {booking.type === 'ONLINE' ? (
                              <Video className="h-4 w-4" />
                            ) : (
                              <MapPin className="h-4 w-4" />
                            )}
                            <span>{booking.type === 'ONLINE' ? 'Online' : 'In-Person'}</span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </main>
        </div>
        <MobileBottomNav />

        {/* Cancel Booking Confirmation Dialog */}
        <Dialog open={cancelDialogOpen} onOpenChange={handleCancelDialogClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Booking</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this booking? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={handleCancelDialogClose}
                disabled={cancellingId !== null}
              >
                Keep Booking
              </Button>
              <Button
                variant="destructive"
                onClick={handleCancelConfirm}
                disabled={cancellingId !== null}
              >
                {cancellingId ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  'Cancel Booking'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}

