import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export function Navigation() {
  return (
    <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary animate-glow" />
            <span className="text-xl font-bold text-foreground">Mystic John</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/bookings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Bookings
            </Link>
            <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Events
            </Link>
            <Link href="/courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Join the Circle
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
