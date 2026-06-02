'use client';

import { useEffect, useRef } from 'react';

interface ParallaxBackgroundProps {
  speed?: number;
  className?: string;
}

export default function ParallaxBackground({ speed = 0.35, className = '' }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion.current) return;

    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (el) {
            el.style.transform = `translateY(${window.scrollY * speed}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 -top-[20%] will-change-transform ${className}`}
      style={{ height: '140%' }}
    >
      {/* Deep obsidian gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,#1e2d4a_0%,#0f172a_60%,#070d1a_100%)]" />

      {/* Noise texture overlay via SVG filter */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Ambient glow spots */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/[0.06] rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/[0.05] rounded-full blur-[100px]" />
    </div>
  );
}
