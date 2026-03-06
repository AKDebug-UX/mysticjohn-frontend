import { LandingNavigation } from '@/components/landing/navigation';
import { LandingHeroSection } from '@/components/landing/hero-section';
import { NavigationBlocks } from '@/components/navigation-blocks';
import { LandingDailyMessage } from '@/components/landing/daily-message';
import { LandingFeaturedServices } from '@/components/landing/featured-services';
import { LandingUpcomingEvents } from '@/components/landing/upcoming-events';
import { LandingTestimonials } from '@/components/landing/testimonials';
import { LandingFooter } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingNavigation />
      <main className="flex-1">
        <LandingHeroSection />
        <NavigationBlocks />
        <LandingDailyMessage />
        <LandingFeaturedServices />
        <LandingUpcomingEvents />
        <LandingTestimonials />
      </main>
      <LandingFooter />
    </div>
  );
}
