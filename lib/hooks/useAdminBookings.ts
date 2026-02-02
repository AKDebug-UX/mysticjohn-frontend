'use client';

import { useState, useCallback } from 'react';
import { bookingsApi } from '@/lib/api';
import type {
    Service,
    Booking,
    CreateServiceRequest,
    UpdateServiceRequest,
} from '@/lib/api/types';
import { ApiClientError } from '@/lib/api/client';
import { toast } from 'sonner';

interface UseAdminBookingsReturn {
    services: Service[];
    bookings: Booking[];
    isLoading: boolean;
    error: string | null;
    fetchAllBookings: () => Promise<void>;
    fetchServices: () => Promise<void>;
    createService: (data: CreateServiceRequest) => Promise<boolean>;
    updateService: (id: string, data: UpdateServiceRequest) => Promise<boolean>;
    deleteService: (id: string) => Promise<boolean>;
    createBooking: (data: CreateBookingRequest) => Promise<boolean>;
}

export function useAdminBookings(): UseAdminBookingsReturn {
    const [services, setServices] = useState<Service[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchServices = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await bookingsApi.getBookingTypes();
            const servicesData = Array.isArray(data) ? data : (data as any).data || [];
            setServices(Array.isArray(servicesData) ? servicesData : []);
        } catch (err) {
            const message =
                err instanceof ApiClientError ? err.message : 'Failed to fetch services';
            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchAllBookings = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await bookingsApi.getAllBookings();
            const bookingsData = Array.isArray(data) ? data : (data as any).data || [];
            setBookings(Array.isArray(bookingsData) ? bookingsData : []);
        } catch (err) {
            const message =
                err instanceof ApiClientError ? err.message : 'Failed to fetch bookings';
            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createService = useCallback(
        async (data: CreateServiceRequest): Promise<boolean> => {
            try {
                setIsLoading(true);
                setError(null);
                await bookingsApi.createService(data);
                await fetchServices();
                toast.success('Service created successfully');
                return true;
            } catch (err) {
                const message =
                    err instanceof ApiClientError
                        ? err.message
                        : 'Failed to create service';
                setError(message);
                toast.error(message);
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        [fetchServices]
    );

    const updateService = useCallback(
        async (id: string, data: UpdateServiceRequest): Promise<boolean> => {
            try {
                setIsLoading(true);
                setError(null);
                await bookingsApi.updateService(id, data);
                await fetchServices();
                toast.success('Service updated successfully');
                return true;
            } catch (err) {
                const message =
                    err instanceof ApiClientError
                        ? err.message
                        : 'Failed to update service';
                setError(message);
                toast.error(message);
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        [fetchServices]
    );

    const createBooking = useCallback(
        async (data: CreateBookingRequest): Promise<boolean> => {
            try {
                setIsLoading(true);
                setError(null);
                await bookingsApi.createBooking(data);
                await fetchAllBookings();
                toast.success('Booking created successfully');
                return true;
            } catch (err) {
                const message =
                    err instanceof ApiClientError
                        ? err.message
                        : 'Failed to create booking';
                setError(message);
                toast.error(message);
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        [fetchAllBookings]
    );

    const deleteService = useCallback(
        async (id: string): Promise<boolean> => {
            try {
                setIsLoading(true);
                setError(null);
                await bookingsApi.deleteService(id);
                setServices((prev) => prev.filter((s) => s.id !== id));
                toast.success('Service deleted successfully');
                return true;
            } catch (err) {
                const message =
                    err instanceof ApiClientError
                        ? err.message
                        : 'Failed to delete service';
                setError(message);
                toast.error(message);
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    return {
        services,
        bookings,
        isLoading,
        error,
        fetchAllBookings,
        fetchServices,
        createService,
        updateService,
        deleteService,
        createBooking,
    };
}
