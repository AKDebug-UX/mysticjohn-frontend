'use client';

import { useEffect, useState, useMemo } from 'react';
import { useAdminMessages } from '@/lib/hooks/useAdminMessages';
import { QuickQuestion } from '@/lib/api/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Send, Search, MessageSquare, User as UserIcon, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';

export default function AdminMessagesPage() {
    const {
        questions,
        isLoading,
        fetchQuestions,
        replyToQuestion,
    } = useAdminMessages();

    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [globalReplyText, setGlobalReplyText] = useState('');
    const [sendingReply, setSendingReply] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [messagesEndRef, setMessagesEndRef] = useState<HTMLDivElement | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (messagesEndRef) {
            messagesEndRef.scrollIntoView({ behavior: "smooth" });
        }
    }, [questions, selectedUserId, messagesEndRef]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    // Group questions by user
    const conversations = useMemo(() => {
        const groups: Record<string, { user: any, questions: QuickQuestion[] }> = {};
        
        questions.forEach(q => {
            // Handle both populated and unpopulated userId
            const user = typeof q.userId === 'object' 
                ? q.userId 
                : { _id: q.userId, name: 'Unknown User', email: 'No Email' };
            
            const userId = user._id || (typeof q.userId === 'string' ? q.userId : 'unknown');
            
            if (!groups[userId]) {
                groups[userId] = { 
                    user: {
                        ...user,
                        name: user.name || 'Unknown User',
                        email: user.email || 'No Email'
                    }, 
                    questions: [] 
                };
            }
            groups[userId].questions.push(q);
        });

        // Sort questions within each group by date (oldest first for chat flow)
        Object.values(groups).forEach(g => {
            g.questions.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        });

        return groups;
    }, [questions]);

    // Filter and sort users
    const sortedUserIds = useMemo(() => {
        return Object.keys(conversations)
            .filter(userId => {
                const { user, questions } = conversations[userId];
                const searchLower = searchTerm.toLowerCase();
                const hasMatchingContent = questions.some(q => 
                    (q.question || q.message || '').toLowerCase().includes(searchLower)
                );
                return user.name.toLowerCase().includes(searchLower) || 
                       user.email.toLowerCase().includes(searchLower) ||
                       hasMatchingContent;
            })
            .sort((a, b) => {
                const lastA = conversations[a].questions[conversations[a].questions.length - 1];
                const lastB = conversations[b].questions[conversations[b].questions.length - 1];
                return new Date(lastB.createdAt).getTime() - new Date(lastA.createdAt).getTime();
            });
    }, [conversations, searchTerm]);

    // Auto-select first user if none selected and users exist
    useEffect(() => {
        if (!selectedUserId && sortedUserIds.length > 0) {
            setSelectedUserId(sortedUserIds[0]);
        }
    }, [sortedUserIds, selectedUserId]);

    const handleGlobalReplySubmit = async () => {
        if (!selectedUserId || !globalReplyText.trim()) return;
        
        // Find the oldest pending question to reply to
        // If no pending questions, we can't reply (backend limitation)
        // Or we could try replying to the last question even if replied? 
        // Let's stick to "Pending" first.
        const userQuestions = conversations[selectedUserId].questions;
        const pendingQuestions = userQuestions.filter(q => q.status === 'pending');
        
        // Target: Oldest pending question (FIFO)
        const targetQuestion = pendingQuestions.length > 0 
            ? pendingQuestions[0] 
            : null;

        if (!targetQuestion) {
            // Optional: Handle case where no pending question exists
            // For now, we disable the button, but if logic falls through:
            return;
        }

        setSendingReply(true);
        try {
            const success = await replyToQuestion(targetQuestion.id || targetQuestion._id!, { reply: globalReplyText });
            if (success) {
                setGlobalReplyText('');
            }
        } finally {
            setSendingReply(false);
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    if (isLoading && questions.length === 0) {
        return (
            <div className="flex h-[calc(100vh-200px)] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Messages</h1>
                    <p className="text-muted-foreground">
                        Chat with users and answer their questions
                    </p>
                </div>
                <div className="w-72">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search users or messages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                </div>
            </div>

            <Card className="flex flex-col md:flex-row overflow-auto h-screen border-muted">
                {/* Sidebar - User List */}
                <div 
                    className={`
                        border-r border-border bg-muted/10 flex flex-col transition-all duration-300 ease-in-out
                        ${isSidebarOpen ? 'w-70 translate-x-0' : 'w-0 -translate-x-full opacity-0 overflow-hidden'}
                    `}
                >
                    <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
                        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                            Conversations ({sortedUserIds.length})
                        </h2>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsSidebarOpen(false)}>
                            <PanelLeftClose className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {sortedUserIds.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground">
                                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                <p>No conversations found</p>
                            </div>
                        ) : (
                            sortedUserIds.map(userId => {
                                const { user, questions } = conversations[userId];
                                const lastQuestion = questions[questions.length - 1];
                                const pendingCount = questions.filter(q => q.status === 'pending').length;
                                const isSelected = selectedUserId === userId;

                                return (
                                    <button
                                        key={userId}
                                        onClick={() => setSelectedUserId(userId)}
                                        className={`w-full text-left p-4 border-b border-border/50 hover:bg-muted/50 transition-colors ${
                                            isSelected ? 'bg-primary/10 hover:bg-primary/15 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <Avatar>
                                                <AvatarFallback className={isSelected ? 'bg-primary text-primary-foreground' : ''}>
                                                    {getInitials(user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <span className={`font-medium truncate ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                                        {user.name}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground shrink-0 ml-2">
                                                        {format(new Date(lastQuestion.createdAt), 'MMM d')}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground truncate mb-1">
                                                    {lastQuestion.question || lastQuestion.message}
                                                </p>
                                                {pendingCount > 0 && (
                                                    <Badge variant="destructive" className="h-5 px-1.5 text-[10px]">
                                                        {pendingCount} Pending
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-background">
                    {selectedUserId && conversations[selectedUserId] ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-border flex items-center gap-3 shadow-sm bg-background/95 backdrop-blur z-10">
                                {!isSidebarOpen && (
                                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="mr-2">
                                        <PanelLeftOpen className="h-5 w-5" />
                                    </Button>
                                )}
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        {getInitials(conversations[selectedUserId].user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="font-semibold text-lg">
                                        {conversations[selectedUserId].user.name}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        {conversations[selectedUserId].user.email}
                                    </p>
                                </div>
                            </div>

                            {/* Messages Scroll Area */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {conversations[selectedUserId].questions.map((q) => (
                                    <div key={q.id || q._id} className="space-y-4">
                                        {/* User Question */}
                                        <div className="flex gap-3">
                                            <Avatar className="h-8 w-8 mt-1">
                                                <AvatarFallback>{getInitials(conversations[selectedUserId].user.name)}</AvatarFallback>
                                            </Avatar>
                                            <div className="max-w-[80%]">
                                                <div className="bg-muted/30 p-4 rounded-2xl rounded-tl-none border border-border/50">
                                                    <p className="text-sm text-foreground whitespace-pre-wrap">
                                                        {q.question || q.message}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1 ml-1">
                                                    <span className="text-xs text-muted-foreground">
                                                        {format(new Date(q.createdAt), 'MMM d, h:mm a')}
                                                    </span>
                                                    <Badge 
                                                        variant={q.status === 'replied' || q.status === 'completed' ? 'secondary' : 'outline'}
                                                        className="text-[10px] h-4 px-1"
                                                    >
                                                        {q.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Admin Reply (if exists) */}
                                        {(q.adminReply || q.reply || q.status === 'replied' || q.status === 'completed') && (
                                            <div className="flex gap-3 justify-end">
                                                <div className="max-w-[80%]">
                                                    <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-none shadow-md">
                                                        <p className="text-sm whitespace-pre-wrap">
                                                            {q.adminReply || q.reply?.replyText || "No reply text available"}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-end items-center gap-2 mt-1 mr-1">
                                                        <span className="text-xs text-muted-foreground">
                                                            {q.reply?.repliedAt 
                                                                ? format(new Date(q.reply.repliedAt), 'MMM d, h:mm a')
                                                                : (q.updatedAt ? format(new Date(q.updatedAt), 'MMM d, h:mm a') : 'Replied')
                                                            }
                                                        </span>
                                                        <Avatar className="h-6 w-6">
                                                            <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">ME</AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div ref={setMessagesEndRef} />
                            </div>

                            {/* Global Reply Input */}
                            <div className="p-4 border-t border-border bg-background">
                                <div className="flex gap-2 items-end">
                                    <Textarea
                                        placeholder={
                                            conversations[selectedUserId].questions.some(q => q.status === 'pending') 
                                            ? "Type your reply..." 
                                            : "No pending messages to reply to"
                                        }
                                        value={globalReplyText}
                                        onChange={(e) => setGlobalReplyText(e.target.value)}
                                        className="min-h-[80px] bg-background resize-none focus-visible:ring-1"
                                        disabled={!conversations[selectedUserId].questions.some(q => q.status === 'pending')}
                                    />
                                    <Button
                                        size="icon"
                                        onClick={handleGlobalReplySubmit}
                                        disabled={
                                            !globalReplyText.trim() || 
                                            sendingReply || 
                                            !conversations[selectedUserId].questions.some(q => q.status === 'pending')
                                        }
                                        className="h-10 w-10 shrink-0 mb-1"
                                    >
                                        {sendingReply ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Send className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
                            <div className="h-16 w-16 bg-muted/30 rounded-full flex items-center justify-center mb-4">
                                <MessageSquare className="h-8 w-8 opacity-50" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">Select a Conversation</h3>
                            <p className="max-w-xs text-center text-sm">
                                Choose a user from the sidebar to view their questions and send replies.
                            </p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
