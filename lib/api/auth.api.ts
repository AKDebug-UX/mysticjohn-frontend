import { apiClient } from './client';
import { setAuthToken, removeAuthToken } from './client';
import type {
  RegisterRequest,
  LoginRequest,
  RefreshTokenRequest,
  AuthResponse,
  User,
} from './types';

// Helper to map backend user (_id) to frontend user (id)
const mapUser = (user: any): User => {
  if (!user) return user;
  return {
    ...user,
    id: user._id || user.id,
  };
};

/**
 * Authentication API
 */
export const authApi = {
  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/register', data);
    console.log('Register response:', response);
    const accessToken = response.accessToken || (response as any).data?.accessToken || (response as any).token;
    if (accessToken) {
      setAuthToken(accessToken);
    }
    const user = response.user || (response as any).data?.user;
    if (user) {
      response.user = mapUser(user);
    }
    return response;
  },

  /**
   * Login user
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/login', data);
    console.log('Login response:', response);
    const accessToken = response.accessToken || (response as any).data?.accessToken || (response as any).token;
    if (accessToken) {
      setAuthToken(accessToken);
    }
    const user = response.user || (response as any).data?.user;
    if (user) {
      response.user = mapUser(user);
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
    console.log('Refresh response:', response);
    const accessToken = response.accessToken || (response as any).data?.accessToken || (response as any).token;
    if (accessToken) {
      setAuthToken(accessToken);
    }
    const user = response.user || (response as any).data?.user;
    if (user) {
      response.user = mapUser(user);
    }
    return response;
  },

  /**
   * Get current user
   */
  getMe: async (): Promise<User> => {
    const user = await apiClient.get<User>('/api/auth/profile');
    return mapUser(user);
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: { name?: string; phone?: string; zodiacSign?: string }): Promise<{ user: User; message: string }> => {
    const response = await apiClient.put<{ user: User; message: string }>('/api/auth/profile', data);
    if (response.user) {
      response.user = mapUser(response.user);
    }
    return response;
  },
};
