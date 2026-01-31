'use client';

import { useState, useCallback } from 'react';
import { communityApi } from '@/lib/api';
import type { Post, CreatePostRequest, CreateCommentRequest } from '@/lib/api/types';
import { ApiClientError } from '@/lib/api/client';

interface UseCommunityReturn {
    posts: Post[];
    isLoading: boolean;
    error: string | null;
    fetchFeed: (page?: number) => Promise<void>;
    createPost: (data: CreatePostRequest) => Promise<boolean>;
    deletePost: (id: string) => Promise<boolean>;
    likePost: (id: string) => Promise<boolean>;
    addComment: (postId: string, data: CreateCommentRequest) => Promise<boolean>;
    clearError: () => void;
}

export function useCommunity(): UseCommunityReturn {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFeed = useCallback(async (page: number = 1) => {
        try {
            setError(null);
            setIsLoading(true);
            const response = await communityApi.getFeed(page);
            // Handle both paginated and array responses
            const rawPosts = Array.isArray(response)
                ? response
                : (response as any).data?.posts || (response as any).posts || []; // Adjust based on actual API response structure

            const newPosts = Array.isArray(rawPosts) 
                ? rawPosts.map((p: any) => ({ ...p, id: p.id || p._id })) 
                : [];

            if (page === 1) {
                setPosts(newPosts);
            } else {
                setPosts((prev) => [...prev, ...newPosts]);
            }
        } catch (err) {
            const errorMessage =
                err instanceof ApiClientError ? err.message : 'Failed to fetch feed.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createPost = useCallback(async (data: CreatePostRequest): Promise<boolean> => {
        try {
            setError(null);
            setIsLoading(true);
            await communityApi.createPost(data);
            await fetchFeed(1); // Refresh feed
            return true;
        } catch (err) {
            const errorMessage =
                err instanceof ApiClientError ? err.message : 'Failed to create post.';
            setError(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [fetchFeed]);

    const deletePost = useCallback(async (id: string): Promise<boolean> => {
        try {
            setError(null);
            await communityApi.deletePost(id);
            setPosts((prev) => prev.filter((post) => post.id !== id));
            return true;
        } catch (err) {
            const errorMessage =
                err instanceof ApiClientError ? err.message : 'Failed to delete post.';
            setError(errorMessage);
            return false;
        }
    }, []);

    const likePost = useCallback(async (id: string): Promise<boolean> => {
        try {
            // Optimistic update
            setPosts((prev) =>
                prev.map((post) => {
                    if (post.id === id) {
                        return {
                            ...post,
                            likesCount: (post.isLiked ? post.likesCount - 1 : post.likesCount + 1),
                            isLiked: !post.isLiked,
                        };
                    }
                    return post;
                })
            );

            await communityApi.likePost(id);
            return true;
        } catch (err) {
            // Revert on failure
            // Ideally we'd fetch the post again or revert state
            console.error('Failed to like post', err);
            return false;
        }
    }, []);

    const addComment = useCallback(async (postId: string, data: CreateCommentRequest): Promise<boolean> => {
        try {
            const response = await communityApi.addComment(postId, data);
            const newComment = response.data;

            if (newComment) {
                setPosts((prev) =>
                    prev.map((post) => {
                        if (post.id === postId) {
                            return {
                                ...post,
                                commentsCount: post.commentsCount + 1,
                                comments: [...(post.comments || []), newComment],
                            };
                        }
                        return post;
                    })
                );
                return true;
            }
            return false;
        } catch (err) {
            console.error('Failed to add comment', err);
            return false;
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        posts,
        isLoading,
        error,
        fetchFeed,
        createPost,
        deletePost,
        likePost,
        addComment,
        clearError,
    };
}
