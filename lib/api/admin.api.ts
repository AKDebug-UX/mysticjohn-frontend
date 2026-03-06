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
    const response = await apiClient.get<any>('/api/credit-packs');
    if (Array.isArray(response)) {
      return response;
    }
    const data = response.data || response.creditPacks;
    return Array.isArray(data) ? data : [];
  },

  /**
   * Get credit pack by ID
   */
  getCreditPackById: async (id: string): Promise<CreditPack> => {
    const response = await apiClient.get<any>(`/api/credit-packs/${id}`);
    return response.data || response;
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
    const response = await apiClient.post<any>('/api/credit-packs', data);
    return response.data || response;
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
    const response = await apiClient.patch<any>(`/api/admin/credit-packs/${id}`, data);
    return response.data || response;
  },

  /**
   * Delete credit pack
   */
  deleteCreditPack: async (id: string): Promise<void> => {
    return apiClient.delete(`/api/admin/credit-packs/${id}`);
  },

  /**
   * Get all users
   */
  getUsers: async (): Promise<any[]> => {
    const response = await apiClient.get<any>('/api/users');
    const data = response.data || response;
    return Array.isArray(data) ? data : (data.users || []);
  },
};

