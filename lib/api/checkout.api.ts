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
    return apiClient.post<CheckoutResponse>('/api/checkout', data);
  },

  /**
   * Confirm a checkout session after redirect back from Stripe
   */
  confirm: async (params: {
    transactionId: string;
    sessionId?: string | null;
  }): Promise<CheckoutConfirmResponse> => {
    const queryParams: Record<string, any> = {
      transactionId: params.transactionId,
    };
    
    // Only include sessionId if it's provided and not null
    if (params.sessionId) {
      queryParams.sessionId = params.sessionId;
    }
    
    return apiClient.get<CheckoutConfirmResponse>('/api/checkout/confirm', queryParams);
  },
};

