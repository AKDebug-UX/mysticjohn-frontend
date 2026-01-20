import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { NavigationBlocks } from '@/components/navigation-blocks'
import { DailyMessage } from '@/components/daily-message'
import { CommunityCTA } from '@/components/community-cta'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <NavigationBlocks />
      <DailyMessage />
      <CommunityCTA />
      <Footer />
    </div>
  )
}
