'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useCredits } from '@/lib/hooks';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';

// Force dynamic rendering to prevent static prerender errors for this route.
export const dynamic = 'force-dynamic';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { fetchBalance } = useCredits();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const orderId = searchParams.get('orderId');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Refresh credit balance after successful payment
    const refreshData = async () => {
      try {
        await fetchBalance();
        setIsLoading(false);
      } catch (err: any) {
        console.error('Error refreshing balance:', err);
        setError('Failed to refresh balance, but your payment was successful');
        setIsLoading(false);
      }
    };

    // Small delay to ensure webhook has processed
    const timer = setTimeout(() => {
      refreshData();
    }, 2000);

    return () => clearTimeout(timer);
  }, [fetchBalance]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="flex-1 lg:ml-64">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto">
              {isLoading ? (
                <Card className="border-primary/20">
                  <CardContent className="p-12 text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Processing your payment...</p>
                  </CardContent>
                </Card>
              ) : error ? (
                <Card className="border-yellow-500/20">
                  <CardContent className="p-12 text-center">
                    <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <CardTitle className="text-2xl mb-2">Payment Successful</CardTitle>
                    <CardDescription className="mb-4">{error}</CardDescription>
                    <div className="flex gap-4 justify-center">
                      <Button asChild>
                        <Link href="/dashboard">Go to Dashboard</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/bookings">View Bookings</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-primary/20">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                      Payment Successful!
                    </CardTitle>
                    <CardDescription className="text-lg mt-2">
                      Your credit pack purchase was completed successfully
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Order ID:</span>
                        <span className="text-sm font-mono text-foreground">
                          {orderId || 'N/A'}
                        </span>
                      </div>
                      {sessionId && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Session ID:</span>
                          <span className="text-sm font-mono text-foreground truncate max-w-[200px]">
                            {sessionId}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <p className="text-center text-muted-foreground">
                        Your credits have been added to your account. You can now use them to book
                        sessions or ask quick questions.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button asChild className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link href="/dashboard">Go to Dashboard</Link>
                      </Button>
                      <Button variant="outline" asChild className="flex-1">
                        <Link href="/bookings">Book a Session</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
