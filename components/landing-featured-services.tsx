'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Calendar, Gem } from 'lucide-react';

export function LandingFeaturedServices() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Featured Services</h2>
          <p className="text-muted-foreground mt-2">
            Explore popular sessions and book your time with John.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-primary" />
                <CardTitle>Private Reading</CardTitle>
              </div>
              <CardDescription>Personal guidance and insight tailored to you.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A one-on-one session offering clarity, direction, and validation.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="default">
                <Link href="/bookings">Book Now</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/services">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Gem className="h-6 w-6 text-primary" />
                <CardTitle>Tarot Insight</CardTitle>
              </div>
              <CardDescription>Symbolic guidance through the Tarot.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Discover themes and possibilities with a focused Tarot session.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="default">
                <Link href="/bookings">Book Now</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/services">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-primary" />
                <CardTitle>Mediumship Session</CardTitle>
              </div>
              <CardDescription>Meaningful, compassionate connection and messages.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A session focused on connection and healing messages.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="default">
                <Link href="/bookings">Book Now</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/services">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}