'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TESTIMONIALS = [
  {
    name: 'Emily R.',
    text: 'John provided clarity and comfort I didn’t know I needed. Truly remarkable.',
  },
  {
    name: 'Michael T.',
    text: 'The guidance was specific and validating. I left feeling lighter and focused.',
  },
  {
    name: 'Sophia L.',
    text: 'Compassionate, grounded, and insightful. The session was transformative for me.',
  },
];

export function LandingTestimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-muted-foreground mt-2">Kind words from recent sessions.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">{t.name}</CardTitle>
                <CardDescription>Verified Client</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}