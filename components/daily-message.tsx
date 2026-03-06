import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MysticalSparkles } from '@/components/mystical-sparkles'
import { MessageSquare } from 'lucide-react'

export function DailyMessage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="pb-3 border-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-accent/5 to-transparent" />
            <MysticalSparkles />
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl text-center text-foreground flex items-center justify-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                Daily Message From John
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="bg-card/50 rounded-lg p-6 border border-border/50">
                <p className="text-muted-foreground text-center text-lg italic leading-relaxed">
                  "The universe whispers tae those who listen. Today, trust yer intuition—it's sharper than ye think.
                  The spirits are alignin' in yer favor, so dinnae doubt yerself, lovely soul."
                </p>
                <p className="text-right text-sm text-muted-foreground mt-4">— John</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

