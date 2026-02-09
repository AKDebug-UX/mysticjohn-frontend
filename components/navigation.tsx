'use client';

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sparkles, Menu, X } from 'lucide-react'
import { useAuthContext } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

export function Navigation() {
  const { isAuthenticated, user, logout } = useAuthContext();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start gap-0" onClick={closeMobileMenu}>
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary animate-glow" />
              <span className="text-xl font-bold text-foreground">John Spratt</span>
            </div>
            <span className="text-xs text-muted-foreground ml-8">Psychic Medium</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Services
            </Link>
            <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Events
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </>
            )}
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLogout}
                  className="border-primary/50 hover:bg-primary/10"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10"
                  asChild
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  asChild
                >
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMobileMenuOpen ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          )}
        >
          <div className="flex flex-col gap-4 pb-4 border-t border-border/50 pt-4">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Services
            </Link>
            <Link
              href="/events"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Events
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
            {isAuthenticated && (
              <>
                >
                <Link
                  href="/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              </>
            )}
            {isAuthenticated ? (
              <div className="flex flex-col gap-4 pt-2 border-t border-border/50">
                <span className="text-sm text-muted-foreground py-2">
                  {user?.name || user?.email}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLogout}
                  className="border-primary/50 hover:bg-primary/10 w-full"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-2 border-t border-border/50">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10 w-full"
                  asChild
                >
                  <Link href="/login" onClick={closeMobileMenu}>Sign In</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                  asChild
                >
                  <Link href="/register" onClick={closeMobileMenu}>Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
