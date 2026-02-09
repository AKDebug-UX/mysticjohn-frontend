'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Calendar, BookOpen, MessageSquare, Settings, Home, Coins, Zap, Gem, Bot, CalendarCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCredits } from '@/lib/hooks'
import { BuyCreditsDialog } from '@/components/BuyCreditsDialog'
import { useAuthContext } from '@/contexts'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Bookings', href: '/bookings', icon: Calendar },
  { name: 'My Bookings', href: '/bookings/my', icon: Calendar },
  { name: 'Horoscopes', href: '/horoscopes', icon: Sparkles },
  { name: 'Tarot', href: '/tarot', icon: Gem },
  { name: 'Events', href: '/events', icon: CalendarCheck },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface DashboardSidebarProps {
  className?: string
  onLinkClick?: () => void
}

export function DashboardSidebar({ className, onLinkClick }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { user, refresh } = useAuthContext();
  const [buyCreditsOpen, setBuyCreditsOpen] = useState(false)

  return (
    <>
      <aside className={cn("hidden lg:block fixed left-0 top-[73px] w-64 h-[calc(100vh-73px)] border-r border-border/50 bg-card/30 backdrop-blur-xl overflow-y-auto scrollbar-thin z-30 transition-all duration-300", className)}>
        <div className="p-6 space-y-6">
          {/* User Info (Mobile Only or nice addition) */}
          <div className="lg:hidden mb-6 flex items-center gap-3 px-2">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          {/* Credit Balance Section */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 space-y-3 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Credits</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {user?.credits ?? 0}
                </div>
                <div className="text-xs text-muted-foreground">Available</div>
              </div>
            </div>
            <Button
              onClick={() => setBuyCreditsOpen(true)}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20"
              size="sm"
            >
              <Zap className="h-4 w-4 mr-2" />
              Buy Credits
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onLinkClick}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden',
                    isActive
                      ? 'bg-primary/10 text-primary font-medium shadow-sm'
                      : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  )}
                >
                  <Icon className={cn("h-5 w-5 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </aside>

      <BuyCreditsDialog
        open={buyCreditsOpen}
        onOpenChange={(open) => {
          setBuyCreditsOpen(open)
          if (!open) {
            refresh()
          }
        }}
      />
    </>
  )
}
