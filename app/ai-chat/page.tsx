'use client';

import { useEffect, useState, useRef } from 'react';
import { Navigation } from '@/components/navigation';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Sparkles, Send, Loader2, Trash2, Bot, User, Coins, Plus, MessageSquare, History } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { aiChatApi, type AIChatMessage, type Conversation } from '@/lib/api/ai-chat.api';
import { useAuthContext } from '@/contexts'
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function AIChatPage() {
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isStartingNew, setIsStartingNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, refresh } = useAuthContext();

  // AI Chat is free to use; no credits required
  const AI_CHAT_CREDITS_COST = 0;

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchInitialData = async () => {
    setIsLoading(true);
    await Promise.all([fetchHistory(), fetchConversations(), refresh()]);
    setIsLoading(false);
  };

  const fetchHistory = async () => {
    try {
      const response = await aiChatApi.getHistory();
      // Handle various response formats
      const data = response.data || response.messages || response;
      const history = Array.isArray(data) ? data : [];
      setMessages(history);
    } catch (error: any) {
      console.error('Chat history error:', error);
      // Don't toast on initial load to avoid annoyance if empty
    }
  };

  const fetchConversations = async () => {
    try {
      const response = await aiChatApi.getConversations();
      const data = response.data || response.conversations || response;
      setConversations(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error('Fetch conversations error:', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputMessage.trim() || isSending) return;

    // No credit gating; messages are free to send

    const messageText = inputMessage.trim();
    setInputMessage('');
    setIsSending(true);

    // Optimistically add user message
    const tempId = Date.now().toString();
    const tempMessage: AIChatMessage = {
      _id: tempId,
      role: 'user',
      content: messageText,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, tempMessage]);

    try {
      const response = await aiChatApi.sendMessage({ message: messageText });
      
      // Refresh history to get the AI response and correct IDs
      await fetchHistory();
      // No credit consumption; no need to refresh credits
    } catch (error: any) {
      // Remove temp message or show error
      setMessages(prev => prev.filter(m => m._id !== tempId));
      setInputMessage(messageText);
      toast.error('Failed to send message.');
    } finally {
      setIsSending(false);
    }
  };

  const handleNewConversation = async () => {
    setIsStartingNew(true);
    try {
      await aiChatApi.startNewConversation();
      setMessages([]);
      await fetchConversations();
      toast.success('Started a new conversation');
    } catch (error) {
      toast.error('Failed to start new conversation');
    } finally {
      setIsStartingNew(false);
    }
  };

  const handleDeleteConversation = async (id: string) => {
    try {
      await aiChatApi.deleteConversation(id);
      setConversations(prev => prev.filter(c => c._id !== id));
      toast.success('Conversation deleted');
      setDeleteId(null);
      // If we deleted the current one (how do we know?), we might want to clear messages
      // But we don't know which one is current from the list usually.
      // We'll just refresh history just in case.
      await fetchHistory();
    } catch (error) {
      toast.error('Failed to delete conversation');
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background flex flex-col">
          <Navigation />
          <div className="flex flex-1">
            <DashboardSidebar />
            <main className="flex-1 p-6 lg:p-8 lg:ml-64 pb-20 lg:pb-8 flex items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </main>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />

        <div className="flex flex-1">
          <DashboardSidebar />

          <main className="flex-1 p-4 lg:p-8 lg:ml-64 pb-20 lg:pb-8 flex flex-col h-[calc(100vh-73px)] max-h-[calc(100vh-73px)]">
            {/* Header */}
            <div className="mb-4 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    Spratt AI Chat
                  </h1>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Psychic guidance & insights
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                 <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="md:hidden">
                      <History className="h-4 w-4 mr-2" /> History
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Conversations</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-2">
                      {conversations.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No past conversations</p>
                      ) : (
                        conversations.map(c => (
                          <div key={c._id} className="flex items-center justify-between p-2 rounded-lg border bg-card">
                             <div className="flex flex-col overflow-hidden">
                               <span className="text-sm font-medium truncate">
                                 {c.lastMessage || 'Conversation'}
                               </span>
                               <span className="text-xs text-muted-foreground">
                                 {c.updatedAt ? format(new Date(c.updatedAt), 'MMM d, HH:mm') : ''}
                               </span>
                             </div>
                             <Button
                               variant="ghost"
                               size="icon"
                               className="h-8 w-8 text-destructive"
                               onClick={() => setDeleteId(c._id)}
                             >
                               <Trash2 className="h-4 w-4" />
                             </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </SheetContent>
                </Sheet>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNewConversation}
                  disabled={isStartingNew}
                >
                  {isStartingNew ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                  New Chat
                </Button>
              </div>
            </div>

            <div className="flex flex-1 gap-6 min-h-0">
               {/* Desktop Conversation List */}
               <Card className="hidden md:flex flex-col w-64 shrink-0 border-border/50">
                  <CardHeader className="p-4 border-b">
                    <CardTitle className="text-lg">History</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-thin">
                      {conversations.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">No past conversations</p>
                      ) : (
                        conversations.map(c => (
                          <div key={c._id} className="group flex items-center justify-between p-3 rounded-md hover:bg-muted/50 border border-transparent hover:border-border/50 transition-colors">
                             <div className="flex flex-col overflow-hidden mr-2">
                               <span className="text-sm font-medium truncate">
                                 {c.lastMessage || 'Conversation'}
                               </span>
                               <span className="text-xs text-muted-foreground">
                                 {c.updatedAt ? format(new Date(c.updatedAt), 'MMM d, HH:mm') : ''}
                               </span>
                             </div>
                             <Button
                               variant="ghost"
                               size="icon"
                               className="h-6 w-6 opacity-0 group-hover:opacity-100 text-destructive"
                               onClick={() => setDeleteId(c._id)}
                             >
                               <Trash2 className="h-3 w-3" />
                             </Button>
                          </div>
                        ))
                      )}
                  </CardContent>
               </Card>

               {/* Chat Area */}
               <div className="flex-1 flex flex-col min-h-0">
                  {/* Info Notice */}
               <Card className="border-primary/20 bg-primary/5 mb-4 shrink-0">
                 <CardContent className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <Bot className="h-4 w-4 text-primary" />
                       <span className="text-sm font-medium">AI Chat is free to use</span>
                    </div>
                 </CardContent>
               </Card>

                  {/* Messages */}
                  <Card className="flex-1 flex flex-col border-border/50 min-h-0">
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 scrollbar-thin">
                      {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <Bot className="h-12 w-12 text-primary/30 mb-3" />
                          <p className="text-muted-foreground">Start a conversation with the spirits...</p>
                        </div>
                      ) : (
                        messages.map((msg, idx) => (
                          <div key={msg._id || idx} className={cn(
                            "flex w-full",
                            msg.role === 'user' ? "justify-end" : "justify-start"
                          )}>
                            <div className={cn(
                              "max-w-[80%] rounded-lg p-3",
                              msg.role === 'user' 
                                ? "bg-primary text-primary-foreground ml-4" 
                                : "bg-muted mr-4"
                            )}>
                              <p className="text-sm whitespace-pre-wrap">{msg.content || msg.message || (msg as any).response}</p>
                              <span className="text-[10px] opacity-70 block mt-1 text-right">
                                {msg.createdAt ? format(new Date(msg.createdAt), 'HH:mm') : ''}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                      <div ref={messagesEndRef} />
                    </CardContent>

                    <CardHeader className="border-t p-3">
                      <form onSubmit={handleSendMessage} className="flex gap-2">
                        <Input
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          placeholder="Type your message..."
                          disabled={isSending}
                        />
                        <Button type="submit" size="icon" disabled={isSending || !inputMessage.trim()}>
                           {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                      </form>
                    </CardHeader>
                  </Card>
               </div>
            </div>
          </main>
        </div>

        <MobileBottomNav />

        <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Conversation</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this conversation? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
              <Button variant="destructive" onClick={() => deleteId && handleDeleteConversation(deleteId)}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}
