import { apiClient, ApiClientError } from './client';
import { ApiResponse, Event, Ticket, CreateEventRequest, UpdateEventRequest } from './types';

class EventsApi {
    /**
     * Get all events
     */
    async getEvents(upcoming: boolean = true): Promise<ApiResponse<Event[]>> {
        return apiClient.get('/api/events', { upcoming });
    }

    /**
     * Get single event by ID
     */
    async getEvent(id: string): Promise<ApiResponse<Event>> {
        if (!id || id === 'undefined') {
            throw new ApiClientError('Invalid event ID', 400);
        }
        return apiClient.get(`/api/events/${id}`);
    }

    /**
     * Create new event
     */
    async createEvent(data: CreateEventRequest): Promise<ApiResponse<Event>> {
        return apiClient.post('/api/events', data);
    }

    /**
     * Update event
     */
    async updateEvent(id: string, data: UpdateEventRequest): Promise<ApiResponse<Event>> {
        return apiClient.put(`/api/events/${id}`, data);
    }

    /**
     * Delete event
     */
    async deleteEvent(id: string): Promise<ApiResponse<void>> {
        return apiClient.delete(`/api/events/${id}`);
    }

    /**
     * Get user tickets
     */
    async getMyTickets(): Promise<ApiResponse<Ticket[]>> {
        return apiClient.get('/api/events/my-tickets');
    }
}

export const eventsApi = new EventsApi();
