'use client';

import { useState, useCallback } from 'react';
import { eventsApi } from '@/lib/api';
import type { Event, Ticket } from '@/lib/api/types';
import { ApiClientError } from '@/lib/api/client';

interface UseEventsReturn {
    events: Event[];
    tickets: Ticket[];
    isLoading: boolean;
    error: string | null;
    fetchEvents: (upcoming?: boolean) => Promise<void>;
    fetchEvent: (id: string) => Promise<Event | null>;
    fetchTickets: () => Promise<void>;
    clearError: () => void;
}

/**
 * Events hook
 * Manages event-related operations and state
 */
export function useEvents(): UseEventsReturn {
    const [events, setEvents] = useState<Event[]>([]);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = useCallback(async () => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await eventsApi.getEvents();
            const eventsData = Array.isArray(data) ? data : (data as any).data || [];
            const mappedEvents = Array.isArray(eventsData) 
                ? eventsData.map((e: any) => ({ ...e, id: e._id || e.id })) 
                : [];
            setEvents(mappedEvents);
        } catch (err) {
            const errorMessage =
                err instanceof ApiClientError
                    ? err.message
                    : 'Failed to fetch events.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchEvent = useCallback(async (id: string): Promise<Event | null> => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await eventsApi.getEvent(id);
            const eventData = (data as any).data || data;
            return { ...eventData, id: eventData._id || eventData.id } as Event;
        } catch (err) {
            const errorMessage =
                err instanceof ApiClientError
                    ? err.message
                    : 'Failed to fetch event.';
            setError(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchTickets = useCallback(async () => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await eventsApi.getMyTickets();
            const ticketsData = Array.isArray(data) ? data : (data as any).data || [];
            const mappedTickets = Array.isArray(ticketsData) 
                ? ticketsData.map((t: any) => ({ ...t, id: t._id || t.id })) 
                : [];
            setTickets(mappedTickets);
        } catch (err) {
            const errorMessage =
                err instanceof ApiClientError
                    ? err.message
                    : 'Failed to fetch tickets.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        events,
        tickets,
        isLoading,
        error,
        fetchEvents,
        fetchEvent,
        fetchTickets,
        clearError,
    };
}
