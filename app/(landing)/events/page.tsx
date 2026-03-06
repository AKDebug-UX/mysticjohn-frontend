'use client';

import { useEffect, useState } from 'react';
import { MysticalSparkles } from '@/components/mystical-sparkles';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Sparkles, Clock, Ticket } from 'lucide-react';
import Link from 'next/link';
import { useEvents } from '@/lib/hooks/useEvents';
import { format, parseISO, isAfter, isBefore, isWithinInterval, subHours } from 'date-fns';
import { cn } from '@/lib/utils';

export default function EventsPage() {
    const { events, isLoading, error, fetchEvents } = useEvents();

    useEffect(() => {
        fetchEvents(false); // Fetch all events
    }, [fetchEvents]);

    const formatDate = (dateString?: string) => {
        try {
            if (!dateString) return 'TBA';
            return format(parseISO(dateString), 'EEEE, MMMM d, yyyy');
        } catch {
            return 'TBA';
        }
    };

    const formatShortDate = (dateString?: string) => {
        try {
            if (!dateString) return 'TBA';
            return format(parseISO(dateString), 'MMM d');
        } catch {
            return 'TBA';
        }
    };

    const formatTime = (dateString?: string) => {
        try {
            if (!dateString) return '';
            return format(parseISO(dateString), 'h:mm a');
        } catch {
            return '';
        }
    };

    // Event categorization
    const [activeTab, setActiveTab] = useState<'upcoming' | 'ongoing' | 'past'>('upcoming');
    const now = new Date();

    const upcomingEvents = events
        .filter((e) => {
            try {
                return e.startDateTime && isAfter(parseISO(e.startDateTime), now);
            } catch {
                return false;
            }
        })
        .sort((a, b) => parseISO(a.startDateTime).getTime() - parseISO(b.startDateTime).getTime());

    const ongoingEvents = events
        .filter((e) => {
            try {
                if (!e.startDateTime) return false;
                const start = parseISO(e.startDateTime);
                if (e.endDateTime) {
                    const end = parseISO(e.endDateTime);
                    return isWithinInterval(now, { start, end });
                }
                // If no end time, consider ongoing if started within last 3 hours
                return isBefore(start, now) && isAfter(start, subHours(now, 3));
            } catch {
                return false;
            }
        })
        .sort((a, b) => parseISO(a.startDateTime).getTime() - parseISO(b.startDateTime).getTime());

    const pastEvents = events
        .filter((e) => {
            try {
                if (!e.startDateTime) return false;
                const start = parseISO(e.startDateTime);
                const isOngoing = (() => {
                    if (e.endDateTime) {
                        const end = parseISO(e.endDateTime);
                        return isWithinInterval(now, { start, end });
                    }
                    return isBefore(start, now) && isAfter(start, subHours(now, 3));
                })();
                return isBefore(start, now) && !isOngoing;
            } catch {
                return false;
            }
        })
        .sort((a, b) => parseISO(b.startDateTime).getTime() - parseISO(a.startDateTime).getTime());

    const displayedEvents = activeTab === 'upcoming' ? upcomingEvents : activeTab === 'ongoing' ? ongoingEvents : pastEvents;
    return (
        <main className="flex-1">
            {/* Hero */}
            <section className="relative py-28 overflow-hidden bg-linear-to-b from-primary/10 to-transparent">
                <MysticalSparkles />
                <div className="container mx-auto px-4 relative z-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <Badge variant="outline" className="mb-4 border-primary/50 text-primary px-4 py-1 rounded-full">
                        Community Gatherin's
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
                        Live Events
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Join John Spratt for an evening of spirit communication, heal'n, and genuine connection.
                    </p>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    {isLoading ? (
                        <div className="flex justify-center py-32">
                            <div className="relative h-16 w-16">
                                <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
                                <Sparkles className="h-8 w-8 text-primary absolute inset-0 m-auto animate-pulse" />
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 max-w-md mx-auto p-12 rounded-3xl border border-destructive/20 bg-destructive/5 backdrop-blur-sm">
                            <p className="text-destructive font-medium mb-6">{error}</p>
                            <Button variant="outline" className="border-destructive/50 hover:bg-destructive/10" onClick={() => fetchEvents(false)}>Try Again</Button>
                        </div>
                    ) : (upcomingEvents.length === 0 && ongoingEvents.length === 0 && pastEvents.length === 0) ? (
                        <div className="text-center py-32 bg-card/30 rounded-3xl border border-border/50 backdrop-blur-sm shadow-xl shadow-primary/5">
                            <Calendar className="h-20 w-20 mx-auto text-muted-foreground/30 mb-6" />
                            <h3 className="text-2xl font-bold text-foreground mb-3">No Events Scheduled</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto">
                                Check back soon for new dates, or sign up for our newsletter tae be notified, lovely soul.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="max-w-7xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-1">
                                <div className="inline-flex rounded-2xl border border-border/50 bg-card/30 p-1.5 backdrop-blur-sm shadow-lg">
                                    <Button
                                        variant={activeTab === 'upcoming' ? 'default' : 'ghost'}
                                        size="sm"
                                        className={cn("rounded-xl px-6 font-bold transition-all", activeTab === 'upcoming' && "shadow-lg shadow-primary/20")}
                                        onClick={() => setActiveTab('upcoming')}
                                    >
                                        Upcoming
                                    </Button>
                                    <Button
                                        variant={activeTab === 'ongoing' ? 'default' : 'ghost'}
                                        size="sm"
                                        className={cn("rounded-xl px-6 font-bold transition-all", activeTab === 'ongoing' && "shadow-lg shadow-primary/20")}
                                        onClick={() => setActiveTab('ongoing')}
                                    >
                                        Ongoing
                                    </Button>
                                    <Button
                                        variant={activeTab === 'past' ? 'default' : 'ghost'}
                                        size="sm"
                                        className={cn("rounded-xl px-6 font-bold transition-all", activeTab === 'past' && "shadow-lg shadow-primary/20")}
                                        onClick={() => setActiveTab('past')}
                                    >
                                        Past
                                    </Button>
                                </div>
                                <div className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-xs font-bold uppercase tracking-widest text-primary">
                                    {activeTab === 'upcoming' && `${upcomingEvents.length} events found`}
                                    {activeTab === 'ongoing' && `${ongoingEvents.length} events running`}
                                    {activeTab === 'past' && `${pastEvents.length} past events`}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                                {displayedEvents.map((event) => (
                                    <Card key={event.id} className="group border-border/50 bg-card/20 backdrop-blur-md hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden flex flex-col rounded-3xl">
                                        <div className="aspect-video bg-muted/50 relative overflow-hidden">
                                            {event.coverImageUrl ? (
                                                <img
                                                    src={event.coverImageUrl}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-accent/20">
                                                    <Sparkles className="h-16 w-16 text-primary/40 animate-pulse" />
                                                </div>
                                            )}

                                            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-background/80 via-transparent to-transparent opacity-60" />

                                            {/* Date Badge */}
                                            <div className="absolute top-6 left-6 bg-primary/90 text-primary-foreground backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-extrabold shadow-xl ring-4 ring-white/10">
                                                {formatShortDate(event.startDateTime)}
                                            </div>

                                            {event.isOnline && (
                                                <Badge className="absolute top-6 right-6 bg-accent text-accent-foreground font-bold border-none">
                                                    Online Session
                                                </Badge>
                                            )}
                                        </div>

                                        <CardHeader className="px-3">
                                            <div className="flex justify-between items-start gap-4">
                                                <CardTitle className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                                                    {event.title}
                                                </CardTitle>
                                            </div>
                                            <div className="flex items-center gap-2 mt-4 text-primary font-medium">
                                                <Clock className="h-4 w-4" />
                                                <span>{formatTime(event.startDateTime)}</span>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="px-3 grow">
                                            {!event.isOnline && (
                                                <div className="flex items-center gap-2 text-sm text-foreground/80 mb-4 bg-primary/5 p-3 rounded-xl border border-primary/10">
                                                    <MapPin className="h-4 w-4 text-primary" />
                                                    <span className="truncate">{event.location || 'Location TBA'}</span>
                                                </div>
                                            )}
                                            <p className="text-muted-foreground text-base line-clamp-2 leading-relaxed">
                                                {event.description}
                                            </p>
                                        </CardContent>

                                        <CardFooter className="p-8 pt-6 mt-2 border-t border-border/50 flex justify-between items-center bg-primary/5">
                                            <div className="text-2xl font-extrabold text-foreground tracking-tight">
                                                £{event.price}
                                            </div>
                                            <Button className="rounded-xl px-8 h-12 font-bold shadow-lg shadow-primary/20" asChild>
                                                <Link href={`/events/${event.id || event._id}`}>
                                                    View Details
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
