'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Testimonial {
  id: string;
  clientName: string;
  text: string;
  rating?: number;
  date?: string;
  service?: string;
}

interface LandingTestimonialsProps {
  testimonials?: Testimonial[];
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    clientName: 'Emily R.',
    text: 'John provided clarity and comfort I didn`t know I needed. Truly remarkable.',
  },
  {
    id: '2',
    clientName: 'Michael T.',
    text: 'The guidance was specific and validating. I left feeling lighter and focused.',
  },
  {
    id: '3',
    clientName: 'Sophia L.',
    text: 'Compassionate, grounded, and insightful. The session was transformative for me.',
  },
];

export function LandingTestimonials({ testimonials = DEFAULT_TESTIMONIALS }: LandingTestimonialsProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-muted-foreground mt-2">Kind words from recent sessions.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-border/50 pb-3">
              <CardHeader>
                <CardTitle className="text-lg">{testimonial.clientName}</CardTitle>
                <CardDescription>Verified Client</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{testimonial.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
