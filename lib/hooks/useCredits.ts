'use client';

import { useState, useCallback } from 'react';
import { authApi, creditsApi, messagesApi } from '@/lib/api';
import type {
  CreditPack,
  CreditBalance,
  CreditTransaction,
  QuickQuestion,
  SubmitQuestionsRequest,
} from '@/lib/api/types';
import { ApiClientError } from '@/lib/api/client';

interface UseCreditsReturn {
  creditPacks: CreditPack[];
  balance: CreditBalance | null;
  transactions: CreditTransaction[];
  questions: QuickQuestion[];
  isLoading: boolean;
  error: string | null;
  fetchCreditPacks: () => Promise<void>;
  fetchBalance: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  submitQuestions: (data: SubmitQuestionsRequest) => Promise<QuickQuestion[] | null>;
  fetchQuestions: () => Promise<void>;
  clearError: () => void;
}

/**
 * Credits hook
 * Manages credit-related operations and state
 */
export function useCredits(): UseCreditsReturn {
  const [creditPacks, setCreditPacks] = useState<CreditPack[]>([]);
  const [balance, setBalance] = useState<CreditBalance | null>(null);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [questions, setQuestions] = useState<QuickQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCreditPacks = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
            const data = await creditsApi.getAllCreditPacks();
            setCreditPacks(data);
    } catch (err) {
      console.error('Error setting local credit packs:', err);
      setError('Failed to load credit packs.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchBalance = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await authApi.getMe();
      setBalance(data);
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to fetch credit balance.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await creditsApi.getCreditTransactions();
      setTransactions(data);
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to fetch transactions.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitQuestions = useCallback(
    async (data: SubmitQuestionsRequest): Promise<QuickQuestion[] | null> => {
      try {
        setError(null);
        setIsLoading(true);
        const submitted = await messagesApi.submitQuestions(data);
        let rawQuestions: any[] = [];
        
        if (Array.isArray(submitted)) {
            rawQuestions = submitted;
        } else if ((submitted as any).data) {
             rawQuestions = Array.isArray((submitted as any).data) 
                ? (submitted as any).data 
                : [(submitted as any).data];
        } else {
             rawQuestions = [submitted];
        }

        const newQuestions = rawQuestions.map((q: any) => ({ 
             ...q, 
             id: q.id || q._id,
             question: q.question || q.message // Map message to question
         }));
         setQuestions((prev) => [...newQuestions, ...prev]);
        // Refresh balance after spending credits
        await fetchBalance();
        return newQuestions;
      } catch (err) {
        const errorMessage =
          err instanceof ApiClientError
            ? err.message
            : 'Failed to submit questions.';
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchBalance]
  );

  const fetchQuestions = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await messagesApi.getMyQuestions();
      const rawQuestions = Array.isArray(data) 
         ? data 
         : (data as any).data || (data as any).questions || [];
       const mappedQuestions = rawQuestions.map((q: any) => ({ 
           ...q, 
           id: q.id || q._id,
           question: q.question || q.message // Map message to question
       }));
       setQuestions(mappedQuestions);
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to fetch questions.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    creditPacks,
    balance,
    transactions,
    questions,
    isLoading,
    error,
    fetchCreditPacks,
    fetchBalance,
    fetchTransactions,
    submitQuestions,
    fetchQuestions,
    clearError,
  };
}

