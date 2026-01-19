'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Calendar, Star, BookOpen, MessageSquare, Settings, Home, Coins, Zap, Gem, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCredits } from '@/lib/hooks'
import { BuyCreditsDialog } from '@/components/BuyCreditsDialog'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Bookings', href: '/bookings', icon: Calendar },
  { name: 'My Bookings', href: '/bookings/my', icon: Calendar },
  { name: 'Horoscopes', href: '/horoscopes', icon: Sparkles },
  { name: 'Tarot', href: '/tarot', icon: Gem },
  { name: 'AI Chat', href: '/ai-chat', icon: Bot },
  { name: 'Events', href: '/events', icon: Star },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { balance, fetchBalance } = useCredits()
  const [buyCreditsOpen, setBuyCreditsOpen] = useState(false)

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  return (
    <>
      <aside className="hidden lg:block fixed left-0 top-[73px] w-64 h-[calc(100vh-73px)] border-r border-border/50 bg-card/30 overflow-y-auto scrollbar-thin">
        <div className="p-6 space-y-4">
          {/* Credit Balance Section */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Credits</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {balance?.balance ?? 0}
                </div>
                <div className="text-xs text-muted-foreground">Available</div>
              </div>
            </div>
            <Button
              onClick={() => setBuyCreditsOpen(true)}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="sm"
            >
              <Zap className="h-4 w-4 mr-2" />
              Buy Credits
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
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
          // Refresh balance when dialog closes (in case credits were purchased)
          if (!open) {
            fetchBalance()
          }
        }}
      />
    </>
  )
}
