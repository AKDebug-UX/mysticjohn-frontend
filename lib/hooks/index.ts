/**
 * React Hooks for API Integration
 *
 * These hooks provide a clean interface for using the API client in React components.
 * Each hook manages its own loading states, error handling, and data.
 *
 * Usage:
 * import { useAuth, useBookings, useCourses } from '@/lib/hooks';
 *
 * const { user, login, logout, isLoading } = useAuth();
 * const { bookings, fetchBookings, createBooking } = useBookings();
 */

export { useAuth } from './useAuth';
export { useBookings } from './useBookings';
export { useCourses } from './useCourses';
export { useGroups } from './useGroups';
export { useCredits } from './useCredits';
export { useCheckout } from './useCheckout';
export { useAdminCredits } from './useAdminCredits';
export { useChat } from './useChat';

