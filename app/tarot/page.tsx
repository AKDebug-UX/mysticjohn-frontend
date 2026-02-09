'use client';

import { useEffect, useState } from 'react';
import { Navigation } from '@/components/navigation';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, RotateCcw, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { MAJOR_ARCANA, getRandomCard, isReversed, type TarotCard } from '@/lib/data/tarot-cards';
import { tarotApi, type TarotPick } from '@/lib/api/tarot.api';

export default function TarotPage() {
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [cardReversed, setCardReversed] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPicking, setIsPicking] = useState(false);
  const [hasPickedToday, setHasPickedToday] = useState(false);
  const [todayPick, setTodayPick] = useState<TarotPick | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user has already picked today
  useEffect(() => {
    const checkDailyPick = async () => {
      try {
        const status = await tarotApi.checkDailyPick();
        setHasPickedToday(status.hasPickedToday);
        setTodayPick(status.todayPick);
        if (status.todayPick) {
          // Load today's card
          const card = MAJOR_ARCANA.find((c) => c.id === status.todayPick!.cardId);
          if (card) {
            setSelectedCard(card);
            setCardReversed(status.todayPick.isReversed);
            setIsRevealed(true);
          }
        }
      } catch (error: any) {
        console.error('Failed to check daily pick:', error);
        toast.error('Failed to load daily pick status');
      } finally {
        setIsLoading(false);
      }
    };

    checkDailyPick();
  }, []);

  const handlePickCard = async () => {
    if (hasPickedToday) {
      toast.info('Ye have already picked a card today. Come back tomorrow!');
      return;
    }

    setIsPicking(true);

    // Pick a random card
    const card = getRandomCard();
    const reversed = isReversed();

    setSelectedCard(card);
    setCardReversed(reversed);
    setIsRevealed(false);

    // Animate card reveal after a moment
    setTimeout(() => {
      setIsRevealed(true);

      // Save the pick to backend
      const interpretation = reversed ? card.reversed.meaning : card.upright.meaning;
      tarotApi
        .savePick({
          cardId: card.id,
          cardName: card.name,
          isReversed: reversed,
          interpretation,
        })
        .then(() => {
          setHasPickedToday(true);
          toast.success('Card saved! The universe has spoken.');
        })
        .catch((error: any) => {
          console.warn('Failed to save pick (likely insufficient permissions):', error);
          // If it's a permission error, we just don't show the error toast
          // but we still mark it as picked today locally so they don't keep trying
          setHasPickedToday(true);
          // Only show error if it's NOT a permission error (status 403 or 401)
          if (error.status !== 403 && error.status !== 401) {
            toast.error(error.message || 'Failed to save card pick');
          }
        })
        .finally(() => {
          setIsPicking(false);
        });
    }, 1500);
  };

  const handleReset = () => {
    if (hasPickedToday) {
      toast.info('Ye can only pick one card per day. Come back tomorrow!');
      return;
    }
    setSelectedCard(null);
    setIsRevealed(false);
    setCardReversed(false);
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navigation />
          <div className="flex">
            <DashboardSidebar />
            <main className="flex-1 p-6 lg:p-8 lg:ml-64 pb-20 lg:pb-8">
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            </main>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="flex">
          <DashboardSidebar />

          <main className="flex-1 p-6 lg:p-8 lg:ml-64 pb-20 lg:pb-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Daily Tarot Card
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Pick a card and discover what the universe has to say
                  </p>
                </div>
              </div>
            </div>

            {/* Daily Limit Notice */}
            {hasPickedToday && todayPick && (
              <Card className="mb-6 border-primary/20 bg-primary/5">
                <CardContent className="py-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Ye have already picked yer card today ({format(new Date(todayPick.pickedDate), 'MMMM d, yyyy')}).
                    Come back tomorrow for a new reading!
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Card Selection Area */}
            {!selectedCard ? (
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Ready to Pick Yer Card?</CardTitle>
                  <CardDescription className="text-center">
                    Click the button below to draw a card from the Major Arcana deck
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-12">
                  <div className="flex flex-col items-center justify-center gap-6">
                    <div className="relative">
                      {/* Card Back */}
                      <div className="w-64 h-96 bg-linear-to-br from-primary/20 to-primary/40 rounded-lg border-2 border-primary/50 shadow-lg flex items-center justify-center">
                        <Sparkles className="h-24 w-24 text-primary/50" />
                      </div>
                    </div>
                    <Button
                      size="lg"
                      onClick={handlePickCard}
                      disabled={isPicking || hasPickedToday}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8"
                    >
                      {isPicking ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Drawing Card...
                        </>
                      ) : (
                        <>
                          <Eye className="h-5 w-5 mr-2" />
                          Pick a Card
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Card Display */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center">
                      {selectedCard.name}
                      {cardReversed && <span className="text-primary ml-2">(Reversed)</span>}
                    </CardTitle>
                    <CardDescription className="text-center">
                      Card #{selectedCard.number} - Major Arcana
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center gap-6">
                      {/* Card Visual */}
                      <div
                        className={`w-64 h-96 bg-linear-to-br ${cardReversed
                            ? 'from-destructive/20 to-destructive/40 border-destructive/50'
                            : 'from-primary/20 to-primary/40 border-primary/50'
                          } rounded-lg border-2 shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-500 ${isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                          }`}
                      >
                        <Sparkles
                          className={`h-24 w-24 ${cardReversed ? 'text-destructive/50' : 'text-primary/50'
                            }`}
                        />
                        <p className="text-center text-lg font-bold text-foreground mt-4">
                          {selectedCard.name}
                        </p>
                        {cardReversed && (
                          <p className="text-sm text-destructive mt-2">Reversed</p>
                        )}
                      </div>

                      {/* Interpretation */}
                      {isRevealed && (
                        <div className="w-full max-w-2xl space-y-4">
                          <div
                            className={`bg-${cardReversed ? 'destructive' : 'primary'
                              }/5 border border-${cardReversed ? 'destructive' : 'primary'
                              }/20 rounded-lg p-6`}
                          >
                            <h3 className="text-xl font-semibold mb-3 text-foreground">
                              {cardReversed ? 'Reversed Meaning' : 'Upright Meaning'}
                            </h3>
                            <p className="text-lg leading-relaxed text-foreground whitespace-pre-line">
                              {cardReversed ? selectedCard.reversed.meaning : selectedCard.upright.meaning}
                            </p>
                          </div>

                          {/* Keywords */}
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {(cardReversed ? selectedCard.reversed.keywords : selectedCard.upright.keywords).map(
                              (keyword, index) => (
                                <div
                                  key={index}
                                  className="bg-card border border-border/50 rounded-lg p-3 text-center"
                                >
                                  <p className="text-sm font-medium text-foreground">{keyword}</p>
                                </div>
                              )
                            )}
                          </div>

                          {/* Description */}
                          <div className="bg-card border border-border/50 rounded-lg p-4">
                            <p className="text-sm text-muted-foreground italic">
                              {selectedCard.description}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      {isRevealed && !hasPickedToday && (
                        <div className="flex gap-4">
                          <Button
                            variant="outline"
                            onClick={handleReset}
                            disabled={isPicking}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Pick Another Card
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
        <MobileBottomNav />
      </div>
    </ProtectedRoute>
  );
}
