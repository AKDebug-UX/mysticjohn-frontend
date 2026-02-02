import { apiClient } from './client';
import type {
  Service,
  AvailabilitySlot,
  CreateBookingRequest,
  Booking,
  CreateServiceRequest,
  UpdateServiceRequest,
} from './types';

/**
 * Bookings API
 */
export const bookingsApi = {
  /**
   * Get all active services
   * Backend route: /api/booking-types
   * Transforms backend format (_id, durationMins, active) to frontend format (id, duration, isActive)
   */
  getServices: async (): Promise<Service[]> => {
    const response = await apiClient.get<any[]>('/api/booking-types');
    // Handle both direct array and nested data property
    const services = Array.isArray(response) ? response : (response as any).data || [];
    
    // Transform backend format to frontend format
    return services.map((service: any) => ({
      id: service._id || service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.durationMins || service.duration,
      active: service.active !== undefined ? service.active : service.isActive,
    }));
  },

  /**
   * Get service by ID
   * Backend route: /api/services/:id
   * Transforms backend format to frontend format
   */
  getService: async (id: string): Promise<Service> => {
    const service = await apiClient.get<any>(`/api/bookings/${id}`);
    return {
      id: service._id || service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.durationMins || service.duration,
      active: service.active !== undefined ? service.active : service.isActive,
    };
  },

  /**
   * Get available time slots
   */
  getAvailability: async (
    serviceId: string,
    date: string,
    duration: number
  ): Promise<AvailabilitySlot> => {
    return apiClient.get<AvailabilitySlot>('/api/bookings/available-slots', {
      serviceId,
      date,
      duration,
    });
  },

  /**
   * Create a new booking
   */
  createBooking: async (data: CreateBookingRequest): Promise<Booking> => {
    const response = await apiClient.post<any>('/api/bookings', data);
    return response.data || response;
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
      startDateTime: booking.startDateTime || booking.startTime,
      endDateTime: booking.endDateTime || booking.endTime,
      service: booking.service || booking.bookingType,
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
    return apiClient.delete<void>(`/api/bookings/${id}`);
  },

  /**
   * Admin: Get all bookings
   */
  getAllBookings: async (): Promise<Booking[]> => {
    const response = await apiClient.get<any>('/api/bookings');
    // Handle both direct array and nested data property
    const bookings = Array.isArray(response) ? response : response.data || [];
    
    // Transform backend format to frontend format
    return bookings.map((booking: any) => ({
      ...booking,
      id: booking._id || booking.id,
      startDateTime: booking.startDateTime || booking.startTime,
      endDateTime: booking.endDateTime || booking.endTime,
      service: booking.service || booking.bookingType,
    }));
  },

  /**
   * Admin: Get all booking types (services)
   * Backend route: /api/admin/booking-types
   */
  getBookingTypes: async (): Promise<Service[]> => {
    const response = await apiClient.get<any>('/api/admin/booking-types');
    // Handle both direct array and nested data property ({ status: "success", data: [...] })
    const services = Array.isArray(response) ? response : response.data || [];
    
    return services.map((service: any) => ({
      id: service._id || service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.durationMins || service.duration,
      active: service.active !== undefined ? service.active : service.isActive,
      capacity: service.capacity,
      eventType: service.eventType,
      location: service.location,
      date: service.date,
    }));
  },

  /**
   * Admin: Create Service
   */
  createService: async (data: CreateServiceRequest): Promise<Service> => {
    return apiClient.post<Service>('/api/admin/booking-types', data);
  },

  /**
   * Admin: Update Service
   */
  updateService: async (id: string, data: UpdateServiceRequest): Promise<Service> => {
    return apiClient.put<Service>(`/api/admin/booking-types/${id}`, data);
  },

  /**
   * Admin: Delete Service
   */
  deleteService: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/api/admin/booking-types/${id}`);
  },
};