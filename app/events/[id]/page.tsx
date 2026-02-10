'use client';

import { useEffect, useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { MysticalSparkles } from '@/components/mystical-sparkles';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Video, Clock, Ticket, Share2, ArrowLeft, Loader2, Check } from 'lucide-react';
import Link from 'next/link';
import { useEvents } from '@/lib/hooks/useEvents';
import { useCheckout } from '@/lib/hooks/useCheckout';
import { useAuthContext } from '@/contexts/AuthContext';
import { format, parseISO } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { buildGoogleCalendarUrl } from '@/lib/utils/calendar';

export default function EventDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { fetchEvent, isLoading: isEventLoading } = useEvents();
    const { checkout, isLoading: isCheckoutLoading } = useCheckout();
    const { isAuthenticated, user } = useAuthContext();
    const router = useRouter();

    const [event, setEvent] = useState<any>(null); // Using any temporarily to avoid strict type issues if mismatch
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadEvent = async () => {
            if (!id || id === 'undefined' || id === 'null') {
                setError('Invalid event ID');
                return;
            }
            const data = await fetchEvent(id);
            if (data) {
                setEvent(data);
            } else {
                setError('Event not found');
            }
        };
        loadEvent();
    }, [id, fetchEvent]);

    const handleBuyTicket = async () => {
        if (!isAuthenticated) {
            toast.error('Please sign in to purchase tickets');
            router.push(`/login?redirect=/events/${id}`);
            return;
        }

        try {
            const result = await checkout({
                itemType: 'event',
                eventId: id,
                quantity: 1,
                price: event?.price,
            });

            if (result) {
                if ('checkoutUrl' in result && result.checkoutUrl) {
                    const transactionId = result?.paymentId;
                    const sessionId = result?.sessionId;

                    if (transactionId) {
                        sessionStorage.setItem('checkout_transaction_id', transactionId);
                    }
                    if (sessionId) {
                        sessionStorage.setItem('checkout_session_id', sessionId);
                    }

                    toast.info('Redirecting to secure payment...', { duration: 1500 });
                    window.location.href = result.checkoutUrl;
                } else if (result.paymentIntent?.clientSecret) {
                    toast.error('Please update the backend to use Checkout Sessions');
                } else {
                    toast.error('Checkout session not received');
                }
            }
        } catch (error: any) {
            toast.error(error?.message || 'Failed to process payment');
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return format(parseISO(dateString), 'EEEE, MMMM d, yyyy');
        } catch {
            return dateString;
        }
    };

    const formatTime = (dateString: string) => {
        try {
            return format(parseISO(dateString), 'h:mm a');
        } catch {
            return '';
        }
    };

    if (isEventLoading || (!event && !error)) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navigation />
                <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground">Summoning event details...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navigation />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <h1 className="text-2xl font-bold">Event Not Found</h1>
                        <p className="text-muted-foreground">The spirits cannot locate this event.</p>
                        <Button asChild>
                            <Link href="/events">Back to Calendar</Link>
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navigation />

            <main className="flex-1">
                {/* Event Header Image/Banner */}
                <section className="relative h-[40vh] min-h-[400px] overflow-hidden">
                    {event.coverImageUrl ? (
                        <img
                            src={event.coverImageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-linear-to-b from-primary/20 via-accent/20 to-background flex items-center justify-center">
                            <MysticalSparkles />
                            <Calendar className="h-24 w-24 text-primary/30" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />

                    <div className="absolute top-8 left-4 container mx-auto">
                        <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20 hover:text-white">
                            <Link href="/events">
                                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Events
                            </Link>
                        </Button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 py-12">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl">
                                <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90">
                                    {event.isOnline ? 'Online Event' : 'Live In-Person'}
                                </Badge>
                                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
                                    {event.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-lg">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-primary" />
                                        <span>{formatDate(event.startDateTime)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-primary" />
                                        <span>{formatTime(event.startDateTime)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {event.isOnline ? <Video className="h-5 w-5 text-accent" /> : <MapPin className="h-5 w-5 text-accent" />}
                                        <span>{event.isOnline ? 'Google Meet' : event.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* content */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                            {/* Left Column: Description */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">
                                    <p>{event.description}</p>
                                    {/* If we had rich text, we'd render it here. For now just text. */}
                                </div>

                                <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
                                    <h3 className="text-xl font-bold text-foreground mb-4">What to Expect</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <div className="bg-primary/10 p-2 rounded-full mt-1">
                                                <Check className="h-4 w-4 text-primary" />
                                            </div>
                                            <p className="text-muted-foreground">Intimate atmosphere designed for connection</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="bg-primary/10 p-2 rounded-full mt-1">
                                                <Check className="h-4 w-4 text-primary" />
                                            </div>
                                            <p className="text-muted-foreground">Opportunities for audience readings (not guaranteed)</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="bg-primary/10 p-2 rounded-full mt-1">
                                                <Check className="h-4 w-4 text-primary" />
                                            </div>
                                            <p className="text-muted-foreground">A safe space for healing and laughter</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Right Column: Ticket Card */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <Card className="border-primary/50 overflow-hidden shadow-2xl shadow-primary/10">
                                        <div className="h-2 bg-linear-to-r from-primary via-accent to-secondary" />
                                        <CardHeader>
                                            <CardTitle>Reserve Your Spot</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="flex items-end justify-between border-b border-border/50 pb-6">
                                                <span className="text-sm text-muted-foreground">Price per person</span>
                                                <span className="text-3xl font-bold text-primary">£{event.price}</span>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">Availability</span>
                                                    <span className={event.availableTickets > 0 ? "text-green-500" : "text-destructive"}>
                                                        {event.availableTickets > 0 ? 'Tickets Available' : 'Sold Out'}
                                                    </span>
                                                </div>
                                            </div>

                                            <Button
                                                size="lg"
                                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                                onClick={handleBuyTicket}
                                                disabled={isCheckoutLoading || event.availableTickets <= 0}
                                            >
                                                {isCheckoutLoading ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                        Processing...
                                                    </>
                                                ) : event.availableTickets <= 0 ? (
                                                    'Sold Out'
                                                ) : (
                                                    <>
                                                        <Ticket className="h-4 w-4 mr-2" />
                                                        Buy Ticket
                                                    </>
                                                )}
                                            </Button>

                                            <p className="text-xs text-center text-muted-foreground">
                                                Secure payment via Stripe. <br />
                                                Tickets are sent to your email immediately.
                                            </p>

                                            {event.startDateTime && !isNaN(parseISO(event.startDateTime).getTime()) && (
                                                <div className="flex justify-center">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <a
                                                            href={buildGoogleCalendarUrl({
                                                                title: event.title,
                                                                start: parseISO(event.startDateTime),
                                                                end:
                                                                    event.endDateTime && !isNaN(parseISO(event.endDateTime).getTime())
                                                                        ? parseISO(event.endDateTime)
                                                                        : new Date(
                                                                              parseISO(event.startDateTime).getTime() + 2 * 60 * 60 * 1000
                                                                          ),
                                                                description: event.description || 'Live event',
                                                                location: event.isOnline ? 'Google Meet' : event.location || '',
                                                            })}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Add to Google Calendar
                                                        </a>
                                                    </Button>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>

                                    <div className="mt-6 flex justify-center">
                                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                            <Share2 className="h-4 w-4 mr-2" /> Share Event
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
