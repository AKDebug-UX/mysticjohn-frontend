'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCredits, useCheckout } from '@/lib/hooks';
import { CreditPack } from '@/lib/api/types';
import { Loader2, Sparkles, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface BuyCreditsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BuyCreditsDialog({ open, onOpenChange }: BuyCreditsDialogProps) {
  const { creditPacks, fetchCreditPacks, fetchBalance, isLoading: creditsLoading } = useCredits();
  const { checkout, isLoading: checkoutLoading, error: checkoutError, clearError } = useCheckout();
  const [selectedPack, setSelectedPack] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchCreditPacks();
      clearError(); // Clear any previous errors when dialog opens
    }
  }, [open, fetchCreditPacks, clearError]);

  // Watch for checkout errors
  useEffect(() => {
    if (checkoutError && selectedPack) {
      toast.error(checkoutError);
      setSelectedPack(null);
    }
  }, [checkoutError, selectedPack]);

  const handlePurchase = async (pack: CreditPack) => {
    setSelectedPack(pack.id);
    try {
      const result = await checkout({
        itemType: 'credits',
        creditPackId: pack.id,
        credits: pack.credits,
        price: pack.price
      });

      if (result) {

        // For paid packs, redirect to Stripe Checkout
        if ('checkoutUrl' in result && result.checkoutUrl) {
          // Persist transaction + session ids so success page can confirm
          const transactionId = result?.paymentId;
          const sessionId = result?.sessionId;

          if (transactionId) {
            sessionStorage.setItem('checkout_transaction_id', transactionId);
          }
          if (sessionId) {
            sessionStorage.setItem('checkout_session_id', sessionId);
          }

          toast.info('Redirecting to secure payment...', { duration: 1500 });

          // Redirect to Stripe Checkout Session
          window.location.href = result.checkoutUrl;
        } else if (result.paymentIntent?.clientSecret) {
          // Fallback to PaymentIntent (legacy support)
          toast.error('Please update the backend to use Checkout Sessions');
          setSelectedPack(null);
        } else {
          toast.error('Checkout session not received');
          setSelectedPack(null);
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to process payment');
      setSelectedPack(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const calculateValue = (pack: CreditPack) => {
    if (pack.price === 0) return null;
    const pricePerCredit = pack.price / pack.credits;
    return pricePerCredit.toFixed(3);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            Buy Credits
          </DialogTitle>
          <DialogDescription>
            Choose a credit pack to unlock more mystical experiences and answers
          </DialogDescription>
        </DialogHeader>

        {creditsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : creditPacks.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No credit packs available at the moment.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
            {creditPacks
              .filter((pack) => pack.isActive)
              .map((pack) => {
                const pricePerCredit = calculateValue(pack);
                const isPurchasing = selectedPack === pack.id && checkoutLoading;

                return (
                  <Card
                    key={pack.id}
                    className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-bl-full" />
                    <CardHeader className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-5 w-5 text-primary" />
                        <CardTitle className="text-xl">{pack.name}</CardTitle>
                      </div>
                      {pack.description && (
                        <CardDescription>{pack.description}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="relative z-10 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-foreground">
                            {formatPrice(pack.price)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Sparkles className="h-4 w-4" />
                          <span className="text-sm">
                            {pack.credits} Credits
                            {pricePerCredit && (
                              <span className="ml-1 text-xs">
                                ({formatPrice(parseFloat(pricePerCredit))}/credit)
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => handlePurchase(pack)}
                        disabled={isPurchasing || checkoutLoading}
                      >
                        {isPurchasing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          'Purchase'
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

