import { apiClient } from './client';

export interface AIChatMessage {
  id: string;
  userId: string;
  message: string;
  response: string;
  creditsUsed: number;
  timestamp: string;
  createdAt: string;
}

export interface SendAIChatMessageRequest {
  message: string;
}

export interface SendAIChatMessageResponse {
  message: string;
  chatMessage: AIChatMessage;
}

/**
 * AI Chat API
 */
export const aiChatApi = {
  /**
   * Send a message to the Spratt AI Chat Bot
   */
  sendMessage: async (data: SendAIChatMessageRequest): Promise<SendAIChatMessageResponse> => {
    return apiClient.post<SendAIChatMessageResponse>('/api/chat/send', data);
  },

  /**
   * Get user's AI chat history
   */
  getHistory: async (limit?: number): Promise<AIChatMessage[]> => {
    return apiClient.get<AIChatMessage[]>('/api/chat/history', limit ? { limit } : undefined);
  },

  /**
   * Clear user's AI chat history
   */
  clearHistory: async (): Promise<{ message: string }> => {
    return apiClient.delete<{ message: string }>('/api/chat/history');
  },
};
