'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, registerGSAP } from '@/lib/gsap/setup';

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    registerGSAP();

    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on('scroll', () => ScrollTrigger.update());

    // Y al revés: un refresh de ScrollTrigger puede cambiar la altura del documento
    // (el spacer que inserta un pin, por ejemplo). Lenis cachea esa altura, así que
    // sin esto el scroll se corta antes de llegar al final de la página.
    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', onRefresh);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return null;
}
