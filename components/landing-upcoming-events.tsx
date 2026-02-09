'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Video } from 'lucide-react';
import { useEvents } from '@/lib/hooks/useEvents';
import { format, parseISO } from 'date-fns';

export function LandingUpcomingEvents() {
  const { events, isLoading, error, fetchEvents } = useEvents();

  useEffect(() => {
    fetchEvents(true);
  }, [fetchEvents]);

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'EEEE, MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  const headline = (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Upcoming Events</h2>
        <p className="text-muted-foreground mt-2">See what’s on the calendar next.</p>
      </div>
      <Button asChild variant="outline" className="border-primary/50">
        <Link href="/events">View All Events</Link>
      </Button>
    </div>
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {headline}

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse h-64 rounded-xl bg-muted/40" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-card/50 rounded-2xl border border-border/50">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Unable to load events</h3>
            <p className="text-muted-foreground mb-4">Please try again in a moment.</p>
            <Button onClick={() => fetchEvents(true)}>Try Again</Button>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-card/50 rounded-2xl border border-border/50">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No upcoming events</h3>
            <p className="text-muted-foreground">Check back soon for new dates.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {events.slice(0, 3).map((event) => (
              <Card key={event.id} className="group border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 overflow-hidden">
                <div className="aspect-video bg-muted/50 relative overflow-hidden">
                  {event.coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={event.coverImageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Calendar className="h-10 w-10" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                    <Badge variant="secondary" className="ml-3 whitespace-nowrap">
                      {event.price && event.price > 0 ? `$${event.price}` : 'Free'}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  )}
                  {event.googleMeetLink && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                      <Video className="h-4 w-4" />
                      <span>Online</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild>
                    <Link href={`/events/${event.id}`}>Details</Link>
                  </Button>
                  <Button asChild variant="ghost">
                    <Link href="/events">All Events</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}