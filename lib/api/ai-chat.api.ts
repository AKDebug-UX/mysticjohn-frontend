import { apiClient } from './client';

export interface AIChatMessage {
  _id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt?: string;
  timestamp?: string; // specific to frontend use
}

export interface Conversation {
  _id: string;
  createdAt: string;
  updatedAt: string;
  lastMessage?: string;
}

export interface SendAIChatMessageRequest {
  message: string;
}

export interface SendAIChatMessageResponse {
  status: string;
  data: any; // Allow flexible response for now
  message?: string;
}

/**
 * AI Chat API
 */
export const aiChatApi = {
  /**
   * Send a message to the psychic AI (uses 1 credit)
   * POST /chat/send
   */
  sendMessage: async (data: SendAIChatMessageRequest) => {
    return apiClient.post<any>('/api/chat/send', data);
  },

  /**
   * Get current conversation history
   * GET /chat/history
   */
  getHistory: async () => {
    return apiClient.get<any>('/api/chat/history');
  },

  /**
   * Get all conversations
   * GET /chat/conversations
   */
  getConversations: async () => {
    return apiClient.get<any>('/api/chat/conversations');
  },

  /**
   * Start new conversation
   * POST /chat/new
   */
  startNewConversation: async () => {
    return apiClient.post<any>('/api/chat/new', {});
  },

  /**
   * Delete a conversation
   * DELETE /chat/conversations/{conversationId}
   */
  deleteConversation: async (conversationId: string) => {
    return apiClient.delete<any>(`/api/chat/conversations/${conversationId}`);
  },
};
