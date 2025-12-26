'use client';

import { useState, FormEvent } from 'react';
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

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, error, clearError, isAuthenticated } = useAuthContext();
  const router = useRouter();

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push('/dashboard');
    return null;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();
    setIsSubmitting(true);

    try {
      await register({
        email,
        password,
        name: name || undefined,
        phone: phone || undefined,
      });
      router.push('/dashboard');
    } catch (err) {
      // Error is handled by the auth context
      console.error('Registration failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  Join the Circle
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base">
                  Start yer spiritual journey with us today
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Name <span className="text-muted-foreground">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Yer name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSubmitting}
                      className="bg-background border-border/50 focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email <span className="text-muted-foreground">*</span>
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
                      Password <span className="text-muted-foreground">*</span>
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                      minLength={6}
                      className="bg-background border-border/50 focus:border-primary/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating account...' : 'Create Account'}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    <span>Already have an account? </span>
                    <Link
                      href="/login"
                      className="text-primary hover:text-primary/80 underline-offset-4 hover:underline font-medium"
                    >
                      Sign in here
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

