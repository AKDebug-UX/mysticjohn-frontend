'use client';

import { useEffect, useState, useRef } from 'react';
import { Navigation } from '@/components/navigation';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Sparkles, Send, Loader2, Trash2, Bot, User, Coins } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { aiChatApi, type AIChatMessage } from '@/lib/api/ai-chat.api';
import { useAuthContext } from '@/contexts'
import { cn } from '@/lib/utils';

export default function AIChatPage() {
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, refresh } = useAuthContext();

  const AI_CHAT_CREDITS_COST = 1;

  useEffect(() => {
    fetchHistory();
    refresh();
  }, [refresh]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const history = await aiChatApi.getHistory(50);
      // Reverse to show oldest first, newest last
      setMessages(history.reverse());
    } catch (error: any) {
      toast.error('Failed to load chat history');
      console.error('Chat history error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputMessage.trim() || isSending) return;

    // Check credits
    if ((user?.credits ?? 0) < AI_CHAT_CREDITS_COST) {
      toast.error(`Insufficient credits. You need ${AI_CHAT_CREDITS_COST} credit(s) to send a message.`);
      return;
    }

    const messageText = inputMessage.trim();
    setInputMessage('');
    setIsSending(true);

    try {
      const result = await aiChatApi.sendMessage({ message: messageText });

      // Add the new message to the list
      setMessages((prev) => [...prev, result.chatMessage]);

      // Refresh credit balance
      await refresh();

      toast.success('Message sent successfully!');
    } catch (error: any) {
      setInputMessage(messageText); // Restore message on error
      if (error.message?.includes('Insufficient credits')) {
        toast.error(error.message);
      } else {
        toast.error('Failed to send message. Please try again.');
      }
      console.error('Send message error:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleClearHistoryClick = () => {
    setClearDialogOpen(true);
  };

  const handleClearHistoryConfirm = async () => {
    setClearDialogOpen(false);
    setIsClearing(true);
    try {
      await aiChatApi.clearHistory();
      setMessages([]);
      toast.success('Chat history cleared successfully');
    } catch (error: any) {
      toast.error('Failed to clear chat history');
      console.error('Clear history error:', error);
    } finally {
      setIsClearing(false);
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

          <main className="flex-1 p-6 lg:p-8 lg:ml-64 pb-20 lg:pb-8 flex flex-col h-[calc(100vh-73px)] max-h-[calc(100vh-73px)]">
            {/* Header */}
            <div className="mb-6 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-8 w-8 text-primary" />
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                      Spratt AI Chat Bot
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      Chat with John Spratt's AI for psychic guidance and spiritual insights
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearHistoryClick}
                  disabled={isClearing || messages.length === 0}
                  className="flex items-center gap-2"
                >
                  {isClearing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Clearing...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" /> Clear History
                    </>
                  )}
                </Button>
              </div>

              {/* Credit Cost Notice */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Coins className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">{AI_CHAT_CREDITS_COST} credit</span> per message
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Your balance: <span className="font-semibold">{user?.credits ?? 0} credits</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Messages */}
            <Card className="flex-1 flex flex-col border-border/50 mb-6 min-h-0">
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0 scrollbar-thin">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <Bot className="h-16 w-16 text-primary/30 mb-4" />
                    <p className="text-muted-foreground text-lg mb-2">
                      Welcome to Spratt AI Chat!
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Ask me anything about your spiritual path, life guidance, or mystical insights.
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className="space-y-3">
                      {/* User Message */}
                      <div className="flex items-start gap-3 justify-end">
                        <div className="flex-1 max-w-[80%] lg:max-w-[70%]">
                          <div className="flex items-center gap-2 justify-end mb-1">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">You</span>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(msg.timestamp), 'HH:mm')}
                            </span>
                          </div>
                          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-foreground">
                            {msg.message}
                          </div>
                        </div>
                      </div>

                      {/* AI Response */}
                      <div className="flex items-start gap-3">
                        <div className="flex-1 max-w-[80%] lg:max-w-[70%]">
                          <div className="flex items-center gap-2 mb-1">
                            <Bot className="h-4 w-4 text-primary" />
                            <span className="text-xs text-primary font-medium">Spratt AI</span>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(msg.timestamp), 'HH:mm')}
                            </span>
                          </div>
                          <div className="bg-muted/50 border border-border/50 rounded-lg p-4 text-foreground">
                            {msg.response}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 ml-4">
                            {msg.creditsUsed} credit{msg.creditsUsed !== 1 ? 's' : ''} used
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Chat Input */}
              <CardHeader className="border-t border-border/50 pt-4 pb-4 shrink-0">
                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything about your spiritual path..."
                    className="flex-1"
                    disabled={isSending || !user || user?.credits < AI_CHAT_CREDITS_COST}
                    maxLength={1000}
                  />
                  <Button
                    type="submit"
                    disabled={
                      !inputMessage.trim() ||
                      isSending ||
                      !user ||
                      user?.credits < AI_CHAT_CREDITS_COST
                    }
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" /> Send
                      </>
                    )}
                  </Button>
                </form>
                {user && user?.credits < AI_CHAT_CREDITS_COST && (
                  <p className="text-sm text-destructive mt-2">
                    Insufficient credits. You need {AI_CHAT_CREDITS_COST} credit(s) to send a message.
                  </p>
                )}
              </CardHeader>
            </Card>
          </main>
        </div>

        <MobileBottomNav />

        {/* Clear History Confirmation Dialog */}
        <Dialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Clear Chat History</DialogTitle>
              <DialogDescription>
                Are you sure you want to clear all chat history? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setClearDialogOpen(false)}
                disabled={isClearing}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleClearHistoryConfirm}
                disabled={isClearing}
              >
                {isClearing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Clearing...
                  </>
                ) : (
                  'Clear History'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}
