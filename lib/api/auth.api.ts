import { apiClient } from './client';
import { setAuthToken, removeAuthToken } from './client';
import type {
  RegisterRequest,
  LoginRequest,
  RefreshTokenRequest,
  AuthResponse,
  User,
} from './types';

/**
 * Authentication API
 */
export const authApi = {
  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/register', data);
    if (response.accessToken) {
      setAuthToken(response.accessToken);
    }
    return response;
  },

  /**
   * Login user
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/login', data);
    if (response.accessToken) {
      setAuthToken(response.accessToken);
    }
    return response;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/api/auth/logout');
    } finally {
      removeAuthToken();
    }
  },

  /**
   * Refresh access token
   */
  refresh: async (data: RefreshTokenRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/refresh', data);
    if (response.accessToken) {
      setAuthToken(response.accessToken);
    }
    return response;
  },

  /**
   * Get current user
   */
  getMe: async (): Promise<User> => {
    return apiClient.get<User>('/api/auth/me');
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: { name?: string; phone?: string }): Promise<{ user: User; message: string }> => {
    return apiClient.patch<{ user: User; message: string }>('/api/auth/profile', data);
  },
};

