'use client';

import { useEffect } from 'react';
import { useEvents } from '@/lib/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Ticket as TicketIcon, Loader2, ExternalLink } from 'lucide-react';
import { format, parseISO, isPast } from 'date-fns';
import Link from 'next/link';

export default function MyTicketsPage() {
  const { tickets, isLoading, error, fetchTickets } = useEvents();

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const getStatusColor = (status: string) => {
    const s = status?.toUpperCase();
    switch (s) {
      case 'VALID':
      case 'ACTIVE':
        return 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/50';
      case 'USED':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/50';
      case 'CANCELLED':
        return 'bg-destructive/20 text-destructive border-destructive/50';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const upcomingTickets = (tickets || []).filter((ticket) => {
    const eventDate = ticket.event?.startDateTime ? parseISO(ticket.event.startDateTime) : null;
    const status = ticket.status?.toUpperCase();
    return eventDate && !isPast(eventDate) && status !== 'CANCELLED';
  });

  const pastTickets = (tickets || []).filter((ticket) => {
    const eventDate = ticket.event?.startDateTime ? parseISO(ticket.event.startDateTime) : null;
    const status = ticket.status?.toUpperCase();
    return (eventDate && isPast(eventDate)) || status === 'USED' || status === 'CANCELLED';
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <main className="p-6 lg:p-8 pb-20 lg:pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                My Tickets
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage yer event registrations and tickets
              </p>
            </div>
          </div>
        </div>

        {error && (
          <Card className="mb-8 border-destructive/50 bg-destructive/10">
            <CardContent className="py-6 text-center text-destructive">
              {error}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => fetchTickets()} 
                className="ml-4 border-destructive/50 hover:bg-destructive/20"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Tickets */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <TicketIcon className="h-6 w-6 text-primary" /> Upcoming Events
          </h2>
          {upcomingTickets.length === 0 ? (
            <Card className="border-border/50 pb-3 bg-card/50">
              <CardContent className="py-12 text-center">
                <TicketIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground text-lg">No upcoming event tickets found.</p>
                <Link href="/events" className="mt-4 inline-block">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Browse Events
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingTickets.map((ticket) => (
                <Card key={ticket.id} className="border-border/50 pb-3 hover:border-primary/40 transition-all overflow-hidden group">
                  <div className="h-2 bg-linear-to-r from-primary via-accent to-secondary" />
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                          {ticket.event?.title || 'Event'}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(ticket.status || 'active')}>
                            {ticket.status || 'active'}
                          </Badge>
                          <Badge variant="outline" className="border-primary/50 text-primary">
                            Ticket #{ticket.id.slice(-6).toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>
                          {ticket.event?.startDateTime 
                            ? format(parseISO(ticket.event.startDateTime), 'EEEE, MMM d, yyyy')
                            : 'Date TBD'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>
                          {ticket.event?.startDateTime 
                            ? format(parseISO(ticket.event.startDateTime), 'h:mm a')
                            : 'Time TBD'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{ticket.event?.isOnline ? 'Online Event' : (ticket.event?.location || 'Location TBD')}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border/50 flex items-center justify-between gap-4">
                      {ticket.event?.isOnline && ticket.event?.meetingLink ? (
                        <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                          <a href={ticket.event.meetingLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" /> Join Event
                          </a>
                        </Button>
                      ) : (
                        <Button variant="outline" className="flex-1" asChild>
                          <Link href={`/events/${ticket.event?.id || ticket.event?._id}`}>
                            View Details
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Past Tickets */}
        {pastTickets.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6 opacity-80">Past Events</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pastTickets.map((ticket) => (
                <Card key={ticket.id} className="border-border/50 pb-3 opacity-70 hover:opacity-100 transition-all">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg truncate">
                      {ticket.event?.title || 'Event'}
                    </CardTitle>
                    <Badge variant="outline" className={getStatusColor(ticket.status || 'active')}>
                      {ticket.status || 'active'}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-xs text-muted-foreground">
                      {ticket.event?.startDateTime 
                        ? format(parseISO(ticket.event.startDateTime), 'MMM d, yyyy')
                        : 'Date TBD'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
