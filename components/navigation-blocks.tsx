import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, BookOpen, Users, Star } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavigationBlock {
  href: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  iconClassName: string
  iconColor: string
}

export function NavigationBlocks() {
  const blocks: NavigationBlock[] = [
    {
      href: '/bookings',
      icon: Calendar,
      title: 'Bookings',
      description: 'Schedule yer session, pal',
      iconClassName: 'bg-primary/10 group-hover:bg-primary/20',
      iconColor: 'text-primary',
    },
    {
      href: '/events',
      icon: Star,
      title: 'Events',
      description: 'Mystical workshops & gatherings',
      iconClassName: 'bg-accent/10 group-hover:bg-accent/20',
      iconColor: 'text-accent',
    },
    {
      href: '/courses',
      icon: BookOpen,
      title: 'Courses',
      description: 'Learn at yer ain pace',
      iconClassName: 'bg-secondary/20 group-hover:bg-secondary/30',
      iconColor: 'text-secondary-foreground',
    },
    {
      href: '/groups',
      icon: Users,
      title: 'John Circle',
      description: 'Join the spiritual circle',
      iconClassName: 'bg-primary/10 group-hover:bg-primary/20',
      iconColor: 'text-primary',
    },
  ]

  return (
    <section className="py-16 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blocks.map((block) => {
            const Icon = block.icon
            return (
              <Link key={block.href} href={block.href} className="group">
                <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <CardHeader>
                    <div className={cn('h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-colors', block.iconClassName)}>
                      <Icon className={cn('h-6 w-6', block.iconColor)} />
                    </div>
                    <CardTitle className="text-foreground">{block.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {block.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

