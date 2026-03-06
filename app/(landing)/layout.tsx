import { ReactNode } from 'react';
import { LandingNavigation } from '@/components/landing/navigation';
import { LandingFooter } from '@/components/landing/footer';

export default function LandingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingNavigation />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}
