'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Calendar, Gem, LucideIcon } from 'lucide-react';
import { ComponentType } from 'react';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
}

interface LandingFeaturedServicesProps {
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    id: '1',
    name: 'Private Reading',
    description: 'Personal guidance and insight tailored to you.',
    icon: Sparkles,
    href: '/bookings',
  },
  {
    id: '2',
    name: 'Tarot Insight',
    description: 'Symbolic guidance through the Tarot.',
    icon: Gem,
    href: '/bookings',
  },
  {
    id: '3',
    name: 'Mediumship Session',
    description: 'Meaningful, compassionate connection and messages.',
    icon: Calendar,
    href: '/bookings',
  },
];

export function LandingFeaturedServices({ services = defaultServices }: LandingFeaturedServicesProps) {
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
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.id}
                className="border-border/50 pb-3 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary" />
                    <CardTitle>{service.name}</CardTitle>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="default">
                    <Link href={service.href}>Book Now</Link>
                  </Button>
                  <Button asChild variant="ghost">
                    <Link href="/services">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
