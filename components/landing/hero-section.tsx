import { Button } from '@/components/ui/button';
import { MysticalSparkles } from '@/components/mystical-sparkles';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

interface LandingHeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function LandingHeroSection({
  title = 'Welcome, Lovely Soul',
  subtitle = "Aye, come in. The kettle's on, and the spirits are ready tae talk. Let's see what the universe has in store for ye today.",
  ctaText = 'Book a Reading',
  ctaHref = '/bookings',
}: LandingHeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-linear-to-b from-primary/5 to-transparent">
      <MysticalSparkles />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {/* Mystical Aura Effect */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full animate-pulse" />
            <div className="relative">
              <Sparkles className="h-24 w-24 mx-auto text-primary animate-float" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground text-balance leading-tight tracking-tight">
            {title}
            <span className="block bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mt-2">
              Your Spiritual Journey Starts Here
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 h-14 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105"
              asChild
            >
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-foreground hover:bg-primary/10 text-lg px-10 h-14 rounded-full transition-all"
              asChild
            >
              <Link href="/about">Meet John</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
