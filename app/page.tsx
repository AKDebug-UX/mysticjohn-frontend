import { LandingNavigation } from '@/components/landing-navigation'
import { HeroSection } from '@/components/hero-section'
import { NavigationBlocks } from '@/components/navigation-blocks'
import { DailyMessage } from '@/components/daily-message'
import { LandingFeaturedServices } from '@/components/landing-featured-services'
import { LandingUpcomingEvents } from '@/components/landing-upcoming-events'
import { LandingTestimonials } from '@/components/landing-testimonials'

import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavigation />
      <HeroSection />
      <NavigationBlocks />
      <DailyMessage />
      <LandingFeaturedServices />
      <LandingUpcomingEvents />
      <LandingTestimonials />

      <Footer />
    </div>
  )
}
