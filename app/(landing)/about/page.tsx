import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, Heart, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <Sparkles className="h-20 w-20 text-primary animate-float relative z-10" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
            Meet John Spratt
          </h1>
          <p className="text-2xl text-primary font-medium italic">
            "Connecting Hearts Across the Veil"
          </p>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
        </div>

        {/* Main Content */}
        <div className="grid gap-12">
          <Card className="py-3 border-border/50 bg-card/30 backdrop-blur-md overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16" />
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">My Gift, My Journey</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Aye, welcome. I'm John Spratt, and I've been walkin' between worlds as a psychic medium for over twenty years now.
                My story began back in Scotland when I was just a wee lad. I'd hear whispers in the wind and see shadows that dancit' when others saw naught but empty rooms.
              </p>
              <p>
                At first, it was a heavy burden for a young soul, but over time, I realized these gifts werenae just for me. They were a bridge—a way tae bring comfort, clarity, and heal'n tae those left behind or lost in the dark.
              </p>
              <p>
                Whether it's the gentle touch of a Tarot spread or the deep resonance of a mediumship session, I approach every connection with the same honesty and compassion. My goal isn't just tae tell ye what's comin', but tae empower ye tae walk yer ain path with yer head held high.
              </p>
            </CardContent>
          </Card>

          {/* Experience Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4 text-center p-6 rounded-2xl border border-border/50 bg-card/20 hover:bg-card/40 transition-all duration-300">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-2">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Intuitive Readings</h3>
              <p className="text-muted-foreground">Detailed guidance using Tarot and clairvoyance tailored tae yer life's questions.</p>
            </div>

            <div className="space-y-4 text-center p-6 rounded-2xl border border-border/50 bg-card/20 hover:bg-card/40 transition-all duration-300">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 mb-2">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold">Mediumship</h3>
              <p className="text-muted-foreground">Sacred space tae communicate with loved ones who've passed beyond the veil.</p>
            </div>

            <div className="space-y-4 text-center p-6 rounded-2xl border border-border/50 bg-card/20 hover:bg-card/40 transition-all duration-300">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20 mb-2">
                <Users className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Spiritual Growth</h3>
              <p className="text-muted-foreground">Workshops and events designed tae help ye tap intae yer ain inner wisdom.</p>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="relative p-10 rounded-3xl bg-linear-to-br from-primary/10 via-card to-accent/5 border border-primary/20 text-center space-y-6">
            <h2 className="text-3xl font-bold">The Way I Work</h2>
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-xl italic text-primary leading-relaxed">
                "The universe disnae shout, it whispers. My job is tae translate those whispers intae words ye can use tae change yer life."
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I dinnae believe in fear-mongerin' or false promises. My readings are grounded, honest, and filled with the warmth of the Scottish spirit. Ye'll find no judgment here—only an open heart and a desire tae see ye thrive.
              </p>
            </div>
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="/services">Explore My Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
