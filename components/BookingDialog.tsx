'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useBookings } from '@/lib/hooks';
import { useCredits } from '@/lib/hooks';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import type { Service } from '@/lib/api/types';
import { Calendar, Clock, Video, MapPin, Loader2, Check, Coins, CreditCard } from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks, isSameDay, parseISO } from 'date-fns';
import { toast } from 'sonner';

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
}

export function BookingDialog({ open, onOpenChange, service }: BookingDialogProps) {
  const { fetchAvailability, createBooking, isLoading, error, clearError, availability } = useBookings();
  const { isAuthenticated, user, refresh } = useAuthContext();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingType, setBookingType] = useState<'ONLINE' | 'IN_PERSON'>('ONLINE');
  const [paymentMethod, setPaymentMethod] = useState<'CREDITS' | 'STRIPE'>('STRIPE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Reset when dialog opens/closes
  useEffect(() => {
    if (open && service) {
      setSelectedDate(null);
      setSelectedTime(null);
      setBookingType('ONLINE');
      setPaymentMethod('STRIPE');
      setAvailableSlots([]);
      clearError();
      // Fetch credit balance when dialog opens
      if (isAuthenticated) {
        refresh();
      }
    }
  }, [open, service, clearError, isAuthenticated, refresh]);

  // Fetch availability when date is selected
  useEffect(() => {
    if (selectedDate && service) {
      setIsLoadingSlots(true);
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      fetchAvailability(service.id, dateStr, service.duration);
    } else {
      setAvailableSlots([]);
      setIsLoadingSlots(false);
    }
  }, [selectedDate, service, fetchAvailability]);

  // Watch for availability changes from the hook
  useEffect(() => {
    if (availability && selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      if (availability.date === dateStr) {
        setAvailableSlots(availability.slots || []);
        setIsLoadingSlots(false);
      }
    }
  }, [availability, selectedDate]);

  const handleBooking = async () => {
    if (!service || !selectedDate || !selectedTime) return;

    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error('Please sign in to book a session');
      onOpenChange(false);
      router.push('/login?redirect=/bookings');
      return;
    }

    setIsSubmitting(true);
    try {
      // Combine date and time
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const bookingDateTime = new Date(selectedDate);
      bookingDateTime.setHours(hours, minutes, 0, 0);

      const booking = await createBooking({
        serviceId: service.id,
        startDateTime: bookingDateTime.toISOString(),
        type: bookingType,
        paymentMethod,
      });

      if (booking) {
        toast.success('Booking created successfully!');
        // Refresh credit balance if paid with credits
        if (paymentMethod === 'CREDITS') {
          await fetchBalance();
        }
        onOpenChange(false);
      }
    } catch (err) {
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate next 4 weeks of dates
  const generateDateOptions = () => {
    const dates: Date[] = [];
    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 1 }); // Monday

    for (let week = 0; week < 4; week++) {
      for (let day = 0; day < 7; day++) {
        const date = addDays(addWeeks(start, week), day);
        if (date >= today) {
          dates.push(date);
        }
      }
    }

    return dates.slice(0, 28); // Limit to 28 days
  };

  const dateOptions = generateDateOptions();

  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Book {service.name}</DialogTitle>
          <DialogDescription>
            Select a date and time for your appointment
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Service Info */}
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{service.name}</p>
                  {service.description && (
                    <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">£{service.price}</p>
                  <p className="text-xs text-muted-foreground">{service.duration} minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Type Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3">
              Appointment Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={bookingType === 'ONLINE' ? 'default' : 'outline'}
                onClick={() => {
                  setBookingType('ONLINE');
                  setSelectedTime(null); // Reset time when changing type
                }}
                className="h-auto py-4 flex flex-col items-center gap-2"
              >
                <Video className="h-5 w-5" />
                <span>Online</span>
              </Button>
              <Button
                type="button"
                variant={bookingType === 'IN_PERSON' ? 'default' : 'outline'}
                onClick={() => {
                  setBookingType('IN_PERSON');
                  setSelectedTime(null); // Reset time when changing type
                }}
                className="h-auto py-4 flex flex-col items-center gap-2"
              >
                <MapPin className="h-5 w-5" />
                <span>In-Person</span>
              </Button>
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Select Date
            </label>
            <div className="grid grid-cols-7 gap-2 max-h-[200px] overflow-y-auto">
              {dateOptions.map((date) => {
                const isSelected = selectedDate && isSameDay(date, selectedDate);
                const isToday = isSameDay(date, new Date());
                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTime(null); // Reset time when changing date
                    }}
                    className={`
                      p-2 rounded-lg text-sm transition-all
                      ${isSelected
                        ? 'bg-primary text-primary-foreground font-semibold'
                        : 'bg-muted hover:bg-muted/80 text-foreground'
                      }
                      ${isToday && !isSelected ? 'ring-2 ring-primary/50' : ''}
                    `}
                  >
                    <div className="text-xs opacity-70">{format(date, 'EEE')}</div>
                    <div className="font-medium">{format(date, 'd')}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Selection */}
          {selectedDate && (
            <div>
              <label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Select Time ({format(selectedDate, 'MMM d, yyyy')})
              </label>
              {isLoadingSlots ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No available slots for this date.</p>
                  <p className="text-sm mt-1">Please select another date.</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`
                          p-3 rounded-lg text-sm font-medium transition-all
                          ${isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80 text-foreground'
                          }
                        `}
                      >
                        {isSelected && <Check className="h-4 w-4 inline-block mr-1" />}
                        {slot}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Payment Method Selection */}
          {selectedDate && selectedTime && (
            <div>
              <label className="text-sm font-medium text-foreground mb-3">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={paymentMethod === 'STRIPE' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('STRIPE')}
                  className="h-auto py-4 flex flex-col items-center gap-2"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Card Payment</span>
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === 'CREDITS' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('CREDITS')}
                  className="h-auto py-4 flex flex-col items-center gap-2"
                  disabled={!balance || balance.balance < service.price}
                >
                  <Coins className="h-5 w-5" />
                  <div className="flex flex-col items-center">
                    <span>Credits</span>
                    {balance && (
                      <span className="text-xs opacity-70">
                        {balance.balance} available
                      </span>
                    )}
                  </div>
                </Button>
              </div>
              {paymentMethod === 'CREDITS' && balance && balance.balance < service.price && (
                <p className="text-sm text-destructive mt-2">
                  Insufficient credits. You need {service.price} credits but have {balance.balance}.
                </p>
              )}
            </div>
          )}

          {/* Booking Summary */}
          {selectedDate && selectedTime && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-foreground mb-3">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="font-medium text-foreground">{service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium text-foreground">
                      {format(selectedDate, 'EEEE, MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium text-foreground">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium text-foreground">
                      {bookingType === 'ONLINE' ? 'Online' : 'In-Person'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment:</span>
                    <span className="font-medium text-foreground">
                      {paymentMethod === 'CREDITS' ? 'Credits' : 'Card'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border/50">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-bold text-primary text-lg">
                      {paymentMethod === 'CREDITS' ? (
                        <span>{service.price} Credits</span>
                      ) : (
                        <span>£{service.price}</span>
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBooking}
              disabled={
                !selectedDate ||
                !selectedTime ||
                isSubmitting ||
                (paymentMethod === 'CREDITS' && (!balance || balance.balance < service.price))
              }
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Booking...
                </>
              ) : (
                paymentMethod === 'CREDITS' ? 'Book with Credits' : 'Confirm Booking'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

