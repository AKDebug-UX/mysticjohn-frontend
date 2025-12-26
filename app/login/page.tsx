'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { MysticalSparkles } from '@/components/mystical-sparkles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/contexts/AuthContext';
import { Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error, clearError, isAuthenticated, user } = useAuthContext();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'ADMIN') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();
    setIsSubmitting(true);

    try {
      await login({ email, password });
      // Redirect based on role after login
      // The useEffect will handle the redirect once user state is updated
    } catch (err) {
      // Error is handled by the auth context
      console.error('Login failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading or redirect if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Sparkles */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <MysticalSparkles />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <Card className="border-primary/30 relative overflow-hidden shadow-lg shadow-primary/10">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-accent/5 to-transparent" />
              <MysticalSparkles />

              <CardHeader className="relative z-10 text-center">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full" />
                  <div className="relative">
                    <Sparkles className="h-12 w-12 mx-auto text-primary animate-glow" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-foreground">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base">
                  Sign in tae continue yer spiritual journey
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="yer.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="bg-background border-border/50 focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter yer password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="bg-background border-border/50 focus:border-primary/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <div className="space-y-3">
                    <div className="text-center text-sm text-muted-foreground">
                      <span>Dinnae have an account? </span>
                      <Link
                        href="/register"
                        className="text-primary hover:text-primary/80 underline-offset-4 hover:underline font-medium"
                      >
                        Sign up here
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border/50" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or</span>
                      </div>
                    </div>
                    <Link href="/admin/login">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-primary/50 hover:bg-primary/10"
                      >
                        Admin Login
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

