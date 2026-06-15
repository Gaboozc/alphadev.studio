'use client';

import { useEffect } from 'react';
import { gsap, registerGSAP } from '@/lib/gsap/setup';

/**
 * Magnetic CTAs — los botones primarios se atraen sutilmente hacia el cursor
 * y vuelven a su lugar al salir. Micro-interacción premium (estilo Huge/Fantasy).
 *
 * Solo desktop + sin prefers-reduced-motion. Usa gsap.quickTo (GPU, sin layout
 * thrash). Re-escanea con MutationObserver para cubrir navegación cliente y
 * botones que aparecen tras hidratación.
 */
const SELECTOR = '.btn-glow, .btn-primary';
const STRENGTH = 0.35; // proporción del desplazamiento del cursor

export default function MagneticButtons() {
  useEffect(() => {
    registerGSAP();

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const bound = new WeakSet<HTMLElement>();
      const cleanups: Array<() => void> = [];

      const bind = (el: HTMLElement) => {
        if (bound.has(el)) return;
        bound.add(el);

        const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          xTo((e.clientX - cx) * STRENGTH);
          yTo((e.clientY - cy) * STRENGTH);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        // padding de detección: escuchamos pointermove sobre un area ampliada
        const onEnter = () => el.addEventListener('pointermove', onMove);
        const onExit = () => {
          el.removeEventListener('pointermove', onMove);
          onLeave();
        };

        el.style.willChange = 'transform';
        el.addEventListener('pointerenter', onEnter);
        el.addEventListener('pointerleave', onExit);

        cleanups.push(() => {
          el.removeEventListener('pointerenter', onEnter);
          el.removeEventListener('pointerleave', onExit);
          el.removeEventListener('pointermove', onMove);
          gsap.set(el, { x: 0, y: 0 });
          el.style.willChange = '';
        });
      };

      const scan = () =>
        document.querySelectorAll<HTMLElement>(SELECTOR).forEach(bind);

      scan();

      const observer = new MutationObserver(scan);
      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
        cleanups.forEach((fn) => fn());
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
