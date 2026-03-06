import { Sparkles } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="border-t border-border/50 py-8 bg-card/30 relative overflow-hidden">
      {/* Mystical decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-1/4 animate-float">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div className="absolute bottom-4 right-1/3 animate-float" style={{ animationDelay: '1s' }}>
          <Sparkles className="h-3 w-3 text-primary" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-muted-foreground text-sm">
          <p>© 2026 John Spratt | Psychic Medium. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center gap-2">
            Connecting souls with the universe, one reading at a time
            <Sparkles className="h-4 w-4 text-primary inline-block" />
          </p>
        </div>
      </div>
    </footer>
  );
}
