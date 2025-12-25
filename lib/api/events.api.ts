import { apiClient } from './client';
import type { Event, Ticket } from './types';

/**
 * Events API
 */
export const eventsApi = {
  /**
   * Get all published events
   */
  getEvents: async (): Promise<Event[]> => {
    return apiClient.get<Event[]>('/api/events');
  },

  /**
   * Get event by ID with ticket types
   */
  getEvent: async (id: string): Promise<Event> => {
    return apiClient.get<Event>(`/api/events/${id}`);
  },

  /**
   * Get user's tickets
   */
  getMyTickets: async (): Promise<Ticket[]> => {
    return apiClient.get<Ticket[]>('/api/tickets/my');
  },

  /**
   * Cancel ticket
   */
  cancelTicket: async (id: string): Promise<void> => {
    return apiClient.post<void>(`/api/tickets/${id}/cancel`);
  },
};

