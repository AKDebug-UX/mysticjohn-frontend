import { apiClient } from './client';
import type {
  Group,
  Post,
  Comment,
  CreatePostRequest,
  CreateCommentRequest,
} from './types';

/**
 * Groups API
 */
export const groupsApi = {
  /**
   * Get all active groups
   */
  getGroups: async (): Promise<Group[]> => {
    return apiClient.get<Group[]>('/api/groups');
  },

  /**
   * Get group by ID
   */
  getGroup: async (id: string): Promise<Group> => {
    return apiClient.get<Group>(`/api/groups/${id}`);
  },

  /**
   * Join a group
   */
  joinGroup: async (id: string): Promise<void> => {
    return apiClient.post<void>(`/api/groups/${id}/join`);
  },

  /**
   * Leave a group
   */
  leaveGroup: async (id: string): Promise<void> => {
    return apiClient.post<void>(`/api/groups/${id}/leave`);
  },

  /**
   * Get posts in a group
   */
  getGroupPosts: async (groupId: string): Promise<Post[]> => {
    return apiClient.get<Post[]>(`/api/groups/${groupId}/posts`);
  },

  /**
   * Create a post in a group
   */
  createPost: async (groupId: string, data: CreatePostRequest): Promise<Post> => {
    return apiClient.post<Post>(`/api/groups/${groupId}/posts`, data);
  },

  /**
   * Get post by ID with comments
   */
  getPost: async (postId: string): Promise<Post> => {
    return apiClient.get<Post>(`/api/posts/${postId}`);
  },

  /**
   * Delete a post
   */
  deletePost: async (postId: string): Promise<void> => {
    return apiClient.delete<void>(`/api/posts/${postId}`);
  },

  /**
   * Add a comment to a post
   */
  createComment: async (postId: string, data: CreateCommentRequest): Promise<Comment> => {
    return apiClient.post<Comment>(`/api/posts/${postId}/comments`, data);
  },

  /**
   * Delete a comment
   */
  deleteComment: async (commentId: string): Promise<void> => {
    return apiClient.delete<void>(`/api/comments/${commentId}`);
  },

  /**
   * Add a reaction to a post or comment
   */
  addReaction: async (
    targetType: 'POST' | 'COMMENT',
    targetId: string,
    type?: string
  ): Promise<void> => {
    return apiClient.post<void>(`/api/reactions/${targetType}/${targetId}`, {
      type: type || 'like',
    });
  },

  /**
   * Remove a reaction
   */
  removeReaction: async (targetType: 'POST' | 'COMMENT', targetId: string): Promise<void> => {
    return apiClient.delete<void>(`/api/reactions/${targetType}/${targetId}`);
  },
};

