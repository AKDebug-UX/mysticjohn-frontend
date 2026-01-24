'use client';

import { useState, useEffect, useCallback } from 'react';
import { bookingsApi } from '@/lib/api';
import type {
  Service,
  Booking,
  AvailabilitySlot,
  CreateBookingRequest,
} from '@/lib/api/types';
import { ApiClientError } from '@/lib/api/client';

interface UseBookingsReturn {
  services: Service[];
  bookings: Booking[];
  availability: AvailabilitySlot | null;
  isLoading: boolean;
  error: string | null;
  fetchServices: () => Promise<void>;
  fetchService: (id: string) => Promise<Service | null>;
  fetchAvailability: (serviceId: string, date: string, duration: number) => Promise<void>;
  fetchBookings: () => Promise<void>;
  createBooking: (data: CreateBookingRequest) => Promise<Booking | null>;
  updateBooking: (id: string, data: Partial<Booking>) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
  clearError: () => void;
  clearAvailability: () => void;
}

/**
 * Bookings hook
 * Manages booking-related operations and state
 */
export function useBookings(): UseBookingsReturn {
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availability, setAvailability] = useState<AvailabilitySlot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await bookingsApi.getServices();
      setServices(data);
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to fetch services.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchService = useCallback(async (id: string): Promise<Service | null> => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await bookingsApi.getService(id);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to fetch service.';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAvailability = useCallback(
    async (serviceId: string, date: string, duration: number) => {
      try {
        setError(null);
        setIsLoading(true);
        const data = await bookingsApi.getAvailability(serviceId, date, duration);
        setAvailability(data);
      } catch (err) {
        const errorMessage =
          err instanceof ApiClientError
            ? err.message
            : 'Failed to fetch availability.';
        setError(errorMessage);
        setAvailability(null);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const fetchBookings = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await bookingsApi.getMyBookings();
      setBookings(data);
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to fetch bookings.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBooking = useCallback(
    async (data: CreateBookingRequest): Promise<Booking | null> => {
      try {
        setError(null);
        setIsLoading(true);
        const booking = await bookingsApi.createBooking(data);
        setBookings((prev) => [booking, ...prev]);
        return booking;
      } catch (err) {
        const errorMessage =
          err instanceof ApiClientError
            ? err.message
            : 'Failed to create booking.';
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateBooking = useCallback(
    async (id: string, data: Partial<Booking>) => {
      try {
        setError(null);
        setIsLoading(true);
        await bookingsApi.updateBooking(id, data);
        // Refresh bookings list
        await fetchBookings();
      } catch (err) {
        const errorMessage =
          err instanceof ApiClientError
            ? err.message
            : 'Failed to update booking.';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchBookings]
  );

  const cancelBooking = useCallback(
    async (id: string) => {
      try {
        setError(null);
        setIsLoading(true);
        await bookingsApi.cancelBooking(id);
        setBookings((prev) => prev.filter((b) => b.id !== id));
      } catch (err) {
        const errorMessage =
          err instanceof ApiClientError
            ? err.message
            : 'Failed to cancel booking.';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearAvailability = useCallback(() => {
    setAvailability(null);
  }, []);

  return {
    services,
    bookings,
    availability,
    isLoading,
    error,
    fetchServices,
    fetchService,
    fetchAvailability,
    fetchBookings,
    createBooking,
    updateBooking,
    cancelBooking,
    clearError,
    clearAvailability,
  };
}

