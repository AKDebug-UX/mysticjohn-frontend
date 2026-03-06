import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MysticalSparkles } from '@/components/mystical-sparkles';
import { MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface LandingDailyMessageProps {
  message?: string;
  date?: Date;
}

export function LandingDailyMessage({ 
  message = "The universe whispers tae those who listen. Today, trust yer intuition—it's sharper than ye think. The spirits are alignin' in yer favor, so dinnae doubt yerself, lovely soul.",
  date = new Date()
}: LandingDailyMessageProps) {
  return (
    <section className="py-16 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="py-3 border-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-accent/5 to-transparent" />
            <MysticalSparkles />
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl text-center text-foreground flex items-center justify-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                Daily Message From John
              </CardTitle>
              {date && (
                <p className="text-center text-sm text-muted-foreground mt-2">
                  {format(date, 'EEEE, MMMM d, yyyy')}
                </p>
              )}
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="bg-card/50 rounded-lg p-6 border border-border/50">
                <p className="text-muted-foreground text-center text-lg italic leading-relaxed">
                  "{message}"
                </p>
                <p className="text-right text-sm text-muted-foreground mt-4">— John</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
