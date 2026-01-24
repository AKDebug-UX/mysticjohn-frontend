import { apiClient } from './client';
import type {
  QuickQuestion,
  SubmitQuestionsRequest,
} from './types';

/**
 * Messages API
 */
export const messagesApi = {
  /**
   * Submit multiple questions (1 credit per question)
   */
  submitQuestions: async (data: SubmitQuestionsRequest): Promise<QuickQuestion[]> => {
    return apiClient.post<QuickQuestion[]>('/api/messages', data);
  },

  /**
   * Get user's questions and replies
   */
  getMyQuestions: async (): Promise<QuickQuestion[]> => {
    return apiClient.get<QuickQuestion[]>('/api/messages/my');
  },
};
