import { apiClient } from './client';
import type {
  CreditPack,
  CreditBalance,
  CreditTransaction,
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
   * Get credit transaction history
   */
  getCreditTransactions: async (): Promise<CreditTransaction[]> => {
    return apiClient.get<CreditTransaction[]>('/api/credits/transactions');
  },
};

