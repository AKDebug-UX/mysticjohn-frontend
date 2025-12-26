'use client'

import { useState, useEffect } from 'react';

export function MysticalSparkles() {
  const [positions, setPositions] = useState<Array<{
    left: number;
    top: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // Generate positions only on client side to avoid hydration mismatch
    setPositions(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-accent animate-sparkle"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${pos.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
