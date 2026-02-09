'use client';

import { useEffect, useState } from 'react';
import { Navigation } from '@/components/navigation';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCommunity } from '@/lib/hooks/useCommunity';
import { useAuthContext } from '@/contexts/AuthContext';
import { Heart, MessageCircle, Share2, Send, Image as ImageIcon, Video, Loader2, Sparkles, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

export default function CommunityPage() {
    const { posts, isLoading, error, fetchFeed, createPost, likePost, addComment } = useCommunity();
    const { user } = useAuthContext();
    const [newPostContent, setNewPostContent] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        fetchFeed();
    }, [fetchFeed]);

    const handleCreatePost = async () => {
        if (!newPostContent.trim()) return;

        setIsPosting(true);
        const success = await createPost({ content: newPostContent });
        if (success) {
            setNewPostContent('');
            toast.success('Posted to the Inner Circle!');
        } else {
            toast.error('Failed to post');
        }
        setIsPosting(false);
    };

    const handleLike = async (postId: string) => {
        await likePost(postId);
    };

    const toggleComments = (postId: string) => {
        if (activeCommentId === postId) {
            setActiveCommentId(null);
            setCommentText('');
        } else {
            setActiveCommentId(postId);
            setCommentText('');
        }
    };

    const handleSubmitComment = async (postId: string) => {
        if (!commentText.trim()) return;

        const success = await addComment(postId, { content: commentText });
        if (success) {
            setCommentText('');
            toast.success('Comment added');
        } else {
            toast.error('Failed to add comment');
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background">
                <Navigation />

                <div className="flex">
                    <DashboardSidebar />

                    <main className="flex-1 p-4 lg:p-8 lg:ml-64 pb-20 lg:pb-8">
                        <div className="max-w-3xl mx-auto space-y-6">
                            {/* Header */}
                            <div className="relative mb-8">
                                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 blur-2xl rounded-full" />
                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                                            The Inner Circle <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                                        </h1>
                                        <p className="text-muted-foreground">A safe space for our spiritual community.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Create Post */}
                            <Card className="border-primary/20 shadow-lg">
                                <CardContent className="pt-6">
                                    <div className="flex gap-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src="" /> {/* TODO: Add user image */}
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                {user?.name?.[0] || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grow space-y-4">
                                            <Textarea
                                                placeholder="Share your thoughts, experiences, or a daily gratitude..."
                                                className="bg-muted/30 border-none focus-visible:ring-1 min-h-[100px] resize-none"
                                                value={newPostContent}
                                                onChange={(e) => setNewPostContent(e.target.value)}
                                            />
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                                                        <ImageIcon className="h-4 w-4 mr-2" /> Photo
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                                                        <Video className="h-4 w-4 mr-2" /> Video
                                                    </Button>
                                                </div>
                                                <Button
                                                    onClick={handleCreatePost}
                                                    disabled={!newPostContent.trim() || isPosting}
                                                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                                                >
                                                    {isPosting ? 'Posting...' : 'Post'}
                                                    <Send className="h-4 w-4 ml-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Feed */}
                            {isLoading && posts.length === 0 ? (
                                <div className="flex justify-center py-10">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                </div>
                            ) : error ? (
                                <div className="text-center py-10 text-destructive">{error}</div>
                            ) : (
                                <div className="space-y-6">
                                    {posts.map((post) => (
                                        <Card key={post.id} className="border-border/50 overflow-hidden">
                                            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                                                <Avatar className="h-10 w-10 border border-primary/20">
                                                    <AvatarImage src="" />
                                                    <AvatarFallback className="bg-accent/10 text-accent">
                                                        {post.user?.name?.[0] || <User className="h-4 w-4" />}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold text-foreground text-sm">
                                                        {post.user?.name || 'Community Member'}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                                    </p>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                                                    {post.content}
                                                </p>
                                                {post.mediaUrl && (
                                                    <div className="rounded-lg overflow-hidden bg-muted/50 border border-white/5">
                                                        <img src={post.mediaUrl} alt="Post content" className="w-full h-auto max-h-[400px] object-cover" />
                                                    </div>
                                                )}
                                                {/* Tags if any */}
                                                {post.tags && post.tags.length > 0 && (
                                                    <div className="flex gap-2">
                                                        {post.tags.map(tag => (
                                                            <span key={tag} className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">#{tag}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </CardContent>
                                            <CardFooter className="flex flex-col border-t border-border/50 py-3 bg-muted/20">
                                                <div className="flex w-full justify-between items-center text-sm text-muted-foreground">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleLike(post.id)}
                                                        className={post.isLiked ? "text-red-500 hover:text-red-600 hover:bg-red-500/10" : "hover:text-foreground"}
                                                    >
                                                        <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                                                        {post.likesCount || 0}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className={`hover:text-foreground ${activeCommentId === post.id ? 'text-primary bg-primary/10' : ''}`}
                                                        onClick={() => toggleComments(post.id)}
                                                    >
                                                        <MessageCircle className="h-4 w-4 mr-2" />
                                                        {post.commentsCount}
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="hover:text-foreground">
                                                        <Share2 className="h-4 w-4 mr-2" />
                                                        Share
                                                    </Button>
                                                </div>

                                                {/* Comment Section */}
                                                {activeCommentId === post.id && (
                                                    <div className="w-full mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                                                        {/* Existing Comments */}
                                                        {post.comments && post.comments.length > 0 ? (
                                                            <div className="space-y-3 pl-4 border-l-2 border-primary/20">
                                                                {post.comments.map((comment) => (
                                                                    <div key={comment.id} className="space-y-1">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="font-semibold text-sm">{comment.user?.name || 'User'}</span>
                                                                            <span className="text-xs text-muted-foreground">
                                                                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-sm text-foreground/90">{comment.content}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="text-center text-sm text-muted-foreground py-2">
                                                                No comments yet. Be the first to share your thoughts!
                                                            </div>
                                                        )}

                                                        {/* Add Comment Input */}
                                                        <div className="flex gap-2">
                                                            <Textarea
                                                                placeholder="Write a comment..."
                                                                value={commentText}
                                                                onChange={(e) => setCommentText(e.target.value)}
                                                                className="min-h-[60px] resize-none bg-background focus-visible:ring-1"
                                                            />
                                                            <Button
                                                                size="icon"
                                                                className="h-[60px] w-[60px]"
                                                                disabled={!commentText.trim()}
                                                                onClick={() => handleSubmitComment(post.id)}
                                                            >
                                                                <Send className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            )}

                            {!isLoading && posts.length === 0 && (
                                <div className="text-center py-20 bg-card/50 rounded-2xl border border-border/50">
                                    <Sparkles className="h-12 w-12 mx-auto text-primary/30 mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">The circle is quiet...</h3>
                                    <p className="text-muted-foreground">Be the first to share your energy with the community!</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
                <MobileBottomNav />
            </div>
        </ProtectedRoute>
    );
}
