'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Calendar, Star, BookOpen, Settings, CalendarCheck, Sparkles, Gem, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Bookings', href: '/bookings', icon: Calendar },
  { name: 'Horoscopes', href: '/horoscopes', icon: Sparkles },
  { name: 'Tarot', href: '/tarot', icon: Gem },
  { name: 'AI Chat', href: '/ai-chat', icon: Bot },
  { name: 'Settings', href: '/settings', icon: Settings },
];

// Routes that should show the bottom nav
const showOnRoutes = [
  '/dashboard',
  '/bookings',
  '/bookings/my',
  '/horoscopes',
  '/tarot',
  '/ai-chat',
  '/events',
  '/courses',
  '/settings',
  '/messages',
];

export function MobileBottomNav() {
  const pathname = usePathname();

  // Only show on specific routes
  const shouldShow = showOnRoutes.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  );

  if (!shouldShow) {
    return null;
  }

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border/50 shadow-lg">
      <div className="grid grid-cols-6 h-16">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 transition-all duration-200',
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <Icon className={cn(
                'h-5 w-5 transition-all',
                isActive && 'scale-110'
              )} />
              <span className={cn(
                'text-[10px] font-medium leading-tight',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
