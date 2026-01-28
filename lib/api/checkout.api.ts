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

    const response = await apiClient.post<any>(endpoint, data);
    
    // Handle wrapped response
    const result = response.data || response;
    
    // Map backend fields to frontend expectations
    // BuyCreditsDialog expects checkoutUrl at top level
    if (result.checkoutSession?.url && !result.checkoutUrl) {
      result.checkoutUrl = result.checkoutSession.url;
    }
    
    // Map session ID
    if (result.checkoutSession?.id && !result.sessionId) {
      result.sessionId = result.checkoutSession.id;
    }

    // Map transaction ID if needed (some components might look for paymentId)
    if (result.transactionId && !result.paymentId) {
      result.paymentId = result.transactionId;
    }

    return result as CheckoutResponse;
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