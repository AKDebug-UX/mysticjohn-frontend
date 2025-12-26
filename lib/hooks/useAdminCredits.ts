'use client';

import { useState, useCallback } from 'react';
import { adminApi } from '@/lib/api';
import type { CreditPack } from '@/lib/api/types';
import { ApiClientError } from '@/lib/api/client';

interface UseAdminCreditsReturn {
  creditPacks: CreditPack[];
  isLoading: boolean;
  error: string | null;
  fetchAllCreditPacks: () => Promise<void>;
  createCreditPack: (data: {
    name: string;
    credits: number;
    price: number;
    currency?: string;
    isActive?: boolean;
  }) => Promise<CreditPack | null>;
  updateCreditPack: (
    id: string,
    data: {
      name?: string;
      credits?: number;
      price?: number;
      currency?: string;
      isActive?: boolean;
    }
  ) => Promise<CreditPack | null>;
  deleteCreditPack: (id: string) => Promise<boolean>;
  clearError: () => void;
}

/**
 * Admin Credits hook
 * Manages admin credit pack operations
 */
export function useAdminCredits(): UseAdminCreditsReturn {
  const [creditPacks, setCreditPacks] = useState<CreditPack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllCreditPacks = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await adminApi.getAllCreditPacks();
      setCreditPacks(data);
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to fetch credit packs.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCreditPack = useCallback(
    async (data: {
      name: string;
      credits: number;
      price: number;
      currency?: string;
      isActive?: boolean;
    }): Promise<CreditPack | null> => {
      try {
        setError(null);
        setIsLoading(true);
        const newPack = await adminApi.createCreditPack(data);
        setCreditPacks((prev) => [newPack, ...prev]);
        return newPack;
      } catch (err) {
        const errorMessage =
          err instanceof ApiClientError
            ? err.message
            : 'Failed to create credit pack.';
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateCreditPack = useCallback(
    async (
      id: string,
      data: {
        name?: string;
        credits?: number;
        price?: number;
        currency?: string;
        isActive?: boolean;
      }
    ): Promise<CreditPack | null> => {
      try {
        setError(null);
        setIsLoading(true);
        const updatedPack = await adminApi.updateCreditPack(id, data);
        setCreditPacks((prev) =>
          prev.map((pack) => (pack.id === id ? updatedPack : pack))
        );
        return updatedPack;
      } catch (err) {
        const errorMessage =
          err instanceof ApiClientError
            ? err.message
            : 'Failed to update credit pack.';
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteCreditPack = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      setIsLoading(true);
      await adminApi.deleteCreditPack(id);
      setCreditPacks((prev) => prev.filter((pack) => pack.id !== id));
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to delete credit pack.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    creditPacks,
    isLoading,
    error,
    fetchAllCreditPacks,
    createCreditPack,
    updateCreditPack,
    deleteCreditPack,
    clearError,
  };
}

