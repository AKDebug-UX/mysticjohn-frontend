/**
 * API Client - Central export for all API services
 *
 * Usage:
 * import { authApi, bookingsApi, coursesApi } from '@/lib/api';
 *
 * const user = await authApi.login({ email, password });
 * const services = await bookingsApi.getServices();
 */

export * from './types';
export * from './client';
export * from './config';
export { authApi } from './auth.api';
export { bookingsApi } from './bookings.api';
export { coursesApi } from './courses.api';
export { eventsApi } from './events.api';
export { groupsApi } from './groups.api';
export { creditsApi } from './credits.api';
export { checkoutApi } from './checkout.api';
export { adminApi } from './admin.api';

