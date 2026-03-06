'use client';

import { MysticalSparkles } from '@/components/mystical-sparkles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Video, MapPin, Users, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <main className="flex-1 pb-20">
      <section className="relative py-28 overflow-hidden bg-linear-to-b from-primary/10 to-transparent">
        <MysticalSparkles />
        <div className="container mx-auto px-4 relative z-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary px-4 py-1 rounded-full">
            Our Offerings
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
            Sacred Services
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From deep-dive private readings tae live gatherin's, explore the ways we can connect with the spirits together.
          </p>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-2 w-10 rounded-full bg-primary" />
                <span className="text-primary font-bold uppercase tracking-widest text-sm">One-on-One</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground">Private Readings</h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              Sit doon with me for a focused session dedicated entirely tae yer journey and questions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="py-3 group border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 flex flex-col">
              <CardHeader className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">Online Reading</CardTitle>
                <CardDescription className="text-lg">Via Google Meet • 30 or 45 mins</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 flex-1">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Connect from anywhere in the world. A deep dive intae yer current path, future possibilities, and spiritual guidance with the comfort of yer ain hame.
                </p>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Button className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20" asChild>
                  <Link href="/dashboard/bookings">Book Online Session</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="py-3 group border-border/50 bg-card/30 backdrop-blur-sm hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 flex flex-col">
              <CardHeader className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <MapPin className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl font-bold group-hover:text-accent transition-colors">In-Person Reading</CardTitle>
                <CardDescription className="text-lg">Glasgow Studio • 45 mins</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 flex-1">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Sit doon with me face-tae-face in my private studio space in Glasgow. Experience the energy of a traditional reading in a sacred, quiet environment.
                </p>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Button className="w-full h-12 rounded-xl text-lg font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20" asChild>
                  <Link href="/dashboard/bookings">Book In-Person</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="py-3 group border-border/50 bg-card/30 backdrop-blur-sm hover:border-secondary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/10 flex flex-col border-dashed">
              <CardHeader className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Users className="h-8 w-8 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold group-hover:text-secondary-foreground transition-colors">Group Reading</CardTitle>
                <CardDescription className="text-lg">In-Person or Online • 90 mins</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 flex-1">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Gather yer friends or family for a shared spiritual experience. Perfect for small intimate groups seekin' collective guidance or mediumship.
                </p>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Button variant="outline" className="w-full h-12 rounded-xl text-lg font-bold border-secondary/50 hover:bg-secondary/10" asChild>
                  <Link href="/contact">Enquire Direct</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
