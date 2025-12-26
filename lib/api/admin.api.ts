import { apiClient } from './client';
import type { CreditPack } from './types';

/**
 * Admin API
 * All endpoints require admin authentication
 */
export const adminApi = {
  /**
   * Get all credit packs (including inactive)
   */
  getAllCreditPacks: async (): Promise<CreditPack[]> => {
    return apiClient.get<CreditPack[]>('/api/admin/credit-packs');
  },

  /**
   * Get credit pack by ID
   */
  getCreditPackById: async (id: string): Promise<CreditPack> => {
    return apiClient.get<CreditPack>(`/api/admin/credit-packs/${id}`);
  },

  /**
   * Create new credit pack
   */
  createCreditPack: async (data: {
    name: string;
    credits: number;
    price: number;
    currency?: string;
    isActive?: boolean;
  }): Promise<CreditPack> => {
    return apiClient.post<CreditPack>('/api/admin/credit-packs', data);
  },

  /**
   * Update credit pack
   */
  updateCreditPack: async (
    id: string,
    data: {
      name?: string;
      credits?: number;
      price?: number;
      currency?: string;
      isActive?: boolean;
    }
  ): Promise<CreditPack> => {
    return apiClient.patch<CreditPack>(`/api/admin/credit-packs/${id}`, data);
  },

  /**
   * Delete credit pack
   */
  deleteCreditPack: async (id: string): Promise<void> => {
    return apiClient.delete(`/api/admin/credit-packs/${id}`);
  },
};

