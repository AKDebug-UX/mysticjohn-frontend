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
   */
  getServices: async (): Promise<Service[]> => {
    const response = await apiClient.get<Service[]>('/api');
    return response;
  },

  /**
   * Get service by ID
   */
  getService: async (id: string): Promise<Service> => {
    return apiClient.get<Service>(`/api/${id}`);
  },

  /**
   * Get available time slots
   */
  getAvailability: async (
    serviceId: string,
    date: string
  ): Promise<AvailabilitySlot[]> => {
    return apiClient.get<AvailabilitySlot[]>('/api/availability', {
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
   */
  getMyBookings: async (): Promise<Booking[]> => {
    return apiClient.get<Booking[]>('/api/bookings/my');
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

