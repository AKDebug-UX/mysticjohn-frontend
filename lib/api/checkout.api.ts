import { apiClient } from './client';
import type { CheckoutRequest, CheckoutResponse } from './types';

/**
 * Checkout API
 */
export const checkoutApi = {
  /**
   * Unified checkout for tickets, courses, or credit packs
   */
  checkout: async (data: CheckoutRequest): Promise<CheckoutResponse> => {
    return apiClient.post<CheckoutResponse>('/api/checkout', data);
  },
};

