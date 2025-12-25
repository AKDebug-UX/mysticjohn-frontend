import { apiClient } from './client';
import type {
  CreditPack,
  CreditBalance,
  CreditTransaction,
  QuickQuestion,
  SubmitQuestionsRequest,
} from './types';

/**
 * Credits API
 */
export const creditsApi = {
  /**
   * Get all active credit packs
   */
  getCreditPacks: async (): Promise<CreditPack[]> => {
    return apiClient.get<CreditPack[]>('/api/credit-packs');
  },

  /**
   * Get user's credit balance
   */
  getCreditBalance: async (): Promise<CreditBalance> => {
    return apiClient.get<CreditBalance>('/api/credits/balance');
  },

  /**
   * Get credit transaction history
   */
  getCreditTransactions: async (): Promise<CreditTransaction[]> => {
    return apiClient.get<CreditTransaction[]>('/api/credits/transactions');
  },

  /**
   * Submit multiple questions (1 credit per question)
   */
  submitQuestions: async (data: SubmitQuestionsRequest): Promise<QuickQuestion[]> => {
    return apiClient.post<QuickQuestion[]>('/api/quick-questions/batch', data);
  },

  /**
   * Get user's questions and replies
   */
  getMyQuestions: async (): Promise<QuickQuestion[]> => {
    return apiClient.get<QuickQuestion[]>('/api/quick-questions/my');
  },
};

