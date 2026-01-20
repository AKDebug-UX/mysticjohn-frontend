'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';

// Ensure this route is always rendered dynamically at request time
// to avoid static prerender errors during build/export.
export const dynamic = 'force-dynamic';

function CheckoutCancelContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="flex-1 lg:ml-64">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto">
              <Card className="border-yellow-500/20">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center">
                    <XCircle className="h-10 w-10 text-yellow-500" />
                  </div>
                  <CardTitle className="text-3xl font-bold">Payment Cancelled</CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Your payment was cancelled and no charges were made
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {orderId && (
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Order ID:</span>
                        <span className="text-sm font-mono text-foreground">{orderId}</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <p className="text-center text-muted-foreground">
                      No worries! You can try again anytime. Your order was not processed and you
                      were not charged.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button asChild className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                    <Button variant="outline" asChild className="flex-1">
                      <Link href="/bookings">Try Again</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default function CheckoutCancelPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutCancelContent />
    </Suspense>
  );
}
