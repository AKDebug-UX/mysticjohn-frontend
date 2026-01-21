'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2, AlertCircle, Clock, XCircle } from 'lucide-react';
import { useCredits, useCheckout } from '@/lib/hooks';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';
import { toast } from 'sonner';

// Force dynamic rendering to prevent static prerender errors for this route.
export const dynamic = 'force-dynamic';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const { fetchBalance } = useCredits();
  const { confirm } = useCheckout();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'processing' | 'success' | 'pending' | 'failed'>(
    'processing'
  );
  const [orderId, setOrderId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const confirmPayment = useCallback(
    async (transactionId: string, session: string | null, attempt = 0) => {
      setIsLoading(true);
      try {
        const result = await confirm({ transactionId, sessionId: session });

        if (!result) {
          setError('Unable to confirm payment. Please try again.');
          setStatus('failed');
          return;
        }

        const newStatus = result.status || (result.success ? 'COMPLETED' : 'FAILED');
        const normalizedStatus =
          newStatus === 'COMPLETED'
            ? 'success'
            : newStatus === 'PENDING'
            ? 'pending'
            : newStatus === 'CANCELLED' || newStatus === 'FAILED'
            ? 'failed'
            : 'processing';

        setOrderId(result.transactionId || result.order?._id || transactionId);
        setSessionId(result.sessionId || session);
        setStatus(normalizedStatus);

        if (normalizedStatus === 'success') {
          toast.success('Payment successful! Credits added to your account.');
          await fetchBalance();
          // Clear stored ids on success
          sessionStorage.removeItem('checkout_transaction_id');
          sessionStorage.removeItem('checkout_session_id');
        } else if (normalizedStatus === 'pending' && attempt < 2) {
          toast.info('Payment processing, checking again...');
          setTimeout(() => {
            confirmPayment(transactionId, session, attempt + 1);
          }, 2500);
        } else if (normalizedStatus === 'failed') {
          toast.error('Payment failed or was cancelled. If you were charged, contact support.');
        }
      } catch (err: any) {
        console.error('Error confirming payment:', err);
        setError('Failed to confirm payment. Please try again.');
        setStatus('failed');
      } finally {
        setIsLoading(false);
      }
    },
    [confirm, fetchBalance]
  );

  useEffect(() => {
    // Grab transaction/session IDs from URL first, fall back to sessionStorage
    const paramOrderId = searchParams.get('orderId');
    const paramSessionId = searchParams.get('session_id');
    const storedTransactionId =
      typeof window !== 'undefined' ? sessionStorage.getItem('checkout_transaction_id') : null;
    const storedSessionId =
      typeof window !== 'undefined' ? sessionStorage.getItem('checkout_session_id') : null;

    const transactionId = paramOrderId || storedTransactionId;
    const session = paramSessionId || storedSessionId;

    if (!transactionId) {
      setError('Missing transaction information. Please try again.');
      setIsLoading(false);
      setStatus('failed');
      return;
    }

    setOrderId(transactionId);
    setSessionId(session || null);
    confirmPayment(transactionId, session || null);
  }, [confirmPayment, searchParams]);

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
              ) : status === 'pending' ? (
                <Card className="border-yellow-500/20">
                  <CardContent className="p-12 text-center space-y-3">
                    <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                    <CardTitle className="text-2xl">Payment Processing</CardTitle>
                    <CardDescription className="max-w-xl mx-auto">
                      We’re waiting for Stripe to confirm your payment. This usually takes a few
                      seconds. We’ll update automatically.
                    </CardDescription>
                    <div className="text-sm text-muted-foreground">
                      Transaction ID: <span className="font-mono">{orderId || 'N/A'}</span>
                    </div>
                  </CardContent>
                </Card>
              ) : error || status === 'failed' ? (
                <Card className="border-yellow-500/20">
                  <CardContent className="p-12 text-center">
                    <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <CardTitle className="text-2xl mb-2">Payment Issue</CardTitle>
                    <CardDescription className="mb-4">
                      {error || 'We could not verify your payment. If you were charged, contact support.'}
                    </CardDescription>
                    <div className="flex gap-4 justify-center">
                      <Button asChild>
                        <Link href="/dashboard">Go to Dashboard</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/bookings">Try Again</Link>
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
