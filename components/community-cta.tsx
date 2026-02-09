import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MysticalSparkles } from '@/components/mystical-sparkles'

export function CommunityCTA() {
  return (
    <section id="community" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-accent/10 to-secondary/10" />
      <MysticalSparkles />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
            Join the Circle
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Connect with fellow souls, get exclusive readings, and unlock yer spiritual potential
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8" asChild>
            <Link href="/community">Join the Inner Circle</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

