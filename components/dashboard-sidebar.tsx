'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Calendar, Star, BookOpen, Users, MessageSquare, Settings, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Bookings', href: '/bookings', icon: Calendar },
  { name: 'Events', href: '/events', icon: Star },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Groups', href: '/groups', icon: Users },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:block w-64 border-r border-border/50 bg-card/30 min-h-[calc(100vh-73px)]">
      <div className="p-6 space-y-2">
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
    </aside>
  )
}
