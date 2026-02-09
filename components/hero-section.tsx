import { Button } from '@/components/ui/button'
import { MysticalSparkles } from '@/components/mystical-sparkles'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <MysticalSparkles />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Mystical Aura Effect */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full animate-glow" />
            <div className="relative">
              <Sparkles className="h-24 w-24 mx-auto text-primary animate-float" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance leading-tight">
            Welcome, Lovely Soul
            <span className="block text-primary mt-2">Your Journey Starts Here</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-pretty">
            Aye, come in. Let's see what the universe has tae say today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8" asChild>
              <Link href="/bookings">Book a Reading</Link>
            </Button>

          </div>
        </div>
      </div>
    </section>
  )
}

