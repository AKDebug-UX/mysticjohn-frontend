'use client';

import { useState, useCallback } from 'react';
import { checkoutApi } from '@/lib/api';
import type { CheckoutRequest, CheckoutResponse, CheckoutConfirmResponse } from '@/lib/api/types';
import { ApiClientError } from '@/lib/api/client';

interface UseCheckoutReturn {
  isLoading: boolean;
  error: string | null;
  checkout: (data: CheckoutRequest) => Promise<CheckoutResponse | null>;
  confirm: (
    params: { transactionId: string; sessionId?: string | null }
  ) => Promise<CheckoutConfirmResponse | null>;
  clearError: () => void;
}

/**
 * Checkout hook
 * Manages checkout operations
 */
export function useCheckout(): UseCheckoutReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = useCallback(
    async (data: CheckoutRequest): Promise<CheckoutResponse | null> => {
      try {
        setError(null);
        setIsLoading(true);
        const response = await checkoutApi.checkout(data);
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof ApiClientError
            ? err.message
            : 'Failed to complete checkout.';
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const confirm = useCallback(
    async (params: { transactionId: string; sessionId?: string | null }): Promise<CheckoutConfirmResponse | null> => {
      try {
        setError(null);
        setIsLoading(true);
        const response = await checkoutApi.confirm(params);
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof ApiClientError
            ? err.message
            : 'Failed to confirm checkout.';
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    checkout,
    confirm,
    clearError,
  };
}

