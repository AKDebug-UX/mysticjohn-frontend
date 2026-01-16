import { apiClient } from './client';
import type {
  Service,
  AvailabilitySlot,
  CreateBookingRequest,
  Booking,
} from './types';

/**
 * Bookings API
 */
export const bookingsApi = {
  /**
   * Get all active services
   * Backend route: /api/services or /api/ (for backward compatibility)
   * Transforms backend format (_id, durationMins, active) to frontend format (id, duration, isActive)
   */
  getServices: async (): Promise<Service[]> => {
    const response = await apiClient.get<any[]>('/api/services');
    // Transform backend format to frontend format
    return response.map((service: any) => ({
      id: service._id || service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.durationMins || service.duration,
      isActive: service.active !== undefined ? service.active : service.isActive,
    }));
  },

  /**
   * Get service by ID
   * Backend route: /api/:id (now correctly ordered after specific routes)
   * Transforms backend format to frontend format
   */
  getService: async (id: string): Promise<Service> => {
    const service = await apiClient.get<any>(`/api/${id}`);
    return {
      id: service._id || service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.durationMins || service.duration,
      isActive: service.active !== undefined ? service.active : service.isActive,
    };
  },

  /**
   * Get available time slots
   */
  getAvailability: async (
    serviceId: string,
    date: string
  ): Promise<AvailabilitySlot> => {
    return apiClient.get<AvailabilitySlot>('/api/availability', {
      serviceId,
      date,
    });
  },

  /**
   * Create a new booking
   */
  createBooking: async (data: CreateBookingRequest): Promise<Booking> => {
    return apiClient.post<Booking>('/api/bookings', data);
  },

  /**
   * Get user's bookings
   * Transforms backend format (_id) to frontend format (id)
   */
  getMyBookings: async (): Promise<Booking[]> => {
    const response = await apiClient.get<any[]>('/api/bookings/my');
    // Transform backend format to frontend format
    return response.map((booking: any) => ({
      ...booking,
      id: booking._id || booking.id,
    }));
  },

  /**
   * Get booking by ID
   */
  getBooking: async (id: string): Promise<Booking> => {
    return apiClient.get<Booking>(`/api/bookings/${id}`);
  },

  /**
   * Update booking
   */
  updateBooking: async (id: string, data: Partial<Booking>): Promise<Booking> => {
    return apiClient.patch<Booking>(`/api/bookings/${id}`, data);
  },

  /**
   * Cancel booking
   */
  cancelBooking: async (id: string): Promise<void> => {
    return apiClient.post<void>(`/api/bookings/${id}/cancel`);
  },
};