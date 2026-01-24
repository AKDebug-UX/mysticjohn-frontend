import { apiClient } from './client';
import type { CheckoutRequest, CheckoutResponse, CheckoutConfirmResponse } from './types';

/**
 * Checkout API
 */
export const checkoutApi = {
  /**
   * Unified checkout for tickets, courses, or credit packs
   */
  checkout: async (data: CheckoutRequest): Promise<CheckoutResponse> => {
    let endpoint = '/api/payments/booking-checkout';
    
    if (data.itemType === 'credits') {
      endpoint = '/api/payments/credits-checkout';
    } else if (data.itemType === 'course') {
      // Assuming courses use the booking checkout or a dedicated one not listed
      // Using booking-checkout as fallback/closest match based on available endpoints
      endpoint = '/api/payments/booking-checkout';
    }

    return apiClient.post<CheckoutResponse>(endpoint, data);
  },

  /**
   * Confirm a checkout session after redirect back from Stripe
   */
  confirm: async (params: {
    transactionId: string;
    sessionId?: string | null;
  }): Promise<CheckoutConfirmResponse> => {
    return apiClient.post<CheckoutConfirmResponse>('/api/payments/confirm', params);
  },
};


// ('/api/checkout/confirm', queryParams)