'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger, registerGSAP } from '@/lib/gsap/setup';
import { splitWords } from '@/lib/anim/splitWords';

// Easing premium estándar (≈ cubic-bezier(0.16, 1, 0.3, 1)).
const EASE = 'expo.out';

export default function ScrollAnimations() {
  // Este componente vive en el layout, así que sin la ruta como dependencia el
  // efecto correría una sola vez en toda la sesión: al navegar de / a /servicios,
  // los [data-animate] de la página nueva no recibirían ningún ScrollTrigger.
  const pathname = usePathname();

  useEffect(() => {
    registerGSAP();

    // La barra de direcciones de los navegadores móviles cambia la altura del
    // viewport al hacer scroll. Sin esto, cada cambio dispara un refresh() y
    // los triggers con scrub o pin dan saltos.
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ════════════════════════════════════════════════════════════
      //  CON MOVIMIENTO — solo si el usuario no pidió reducirlo.
      //  Distancias de viaje menores en mobile para mantener fluidez.
      // ════════════════════════════════════════════════════════════
      mm.add(
        {
          motionOK: '(prefers-reduced-motion: no-preference)',
          isDesktop: '(min-width: 768px)',
        },
        (context) => {
          const { motionOK, isDesktop } = context.conditions as {
            motionOK: boolean;
            isDesktop: boolean;
          };

          if (!motionOK) return; // reduced-motion → todo queda visible, sin animar.

          const travel = isDesktop ? 1 : 0.55; // factor de desplazamiento

          // ── Titulares: reveal palabra por palabra (editorial) ──────
          gsap.utils.toArray<HTMLElement>('[data-animate="title"]').forEach((el) => {
            const words = splitWords(el);
            if (!words.length) return;
            // will-change se pone para la animación y se quita al terminar: dejarlo
            // fijo mantendría una capa de composición por palabra para siempre.
            gsap.set(words, { yPercent: 115, willChange: 'transform' });
            gsap.to(words, {
              yPercent: 0,
              duration: 0.9,
              ease: EASE,
              stagger: 0.06,
              onComplete: () => gsap.set(words, { willChange: 'auto' }),
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            });
          });

          // ── Dividers dorados: reveal de ancho (scaleX) ─────────────
          gsap.utils.toArray<HTMLElement>('[data-animate="divider"]').forEach((el) => {
            gsap.fromTo(
              el,
              { scaleX: 0, transformOrigin: 'center' },
              {
                scaleX: 1,
                duration: 0.7,
                ease: 'power2.inOut',
                scrollTrigger: { trigger: el, start: 'top 92%', once: true },
              }
            );
          });

          // ── Subtítulos / body: fade-up ─────────────────────────────
          gsap.utils.toArray<HTMLElement>('[data-animate="subtitle"]').forEach((el) => {
            gsap.fromTo(
              el,
              { y: 28 * travel, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: EASE,
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              }
            );
          });

          // ── Grids de cards: stagger desde abajo ────────────────────
          gsap.utils.toArray<HTMLElement>('[data-animate="stagger"]').forEach((grid) => {
            const cards = gsap.utils.toArray<HTMLElement>(
              grid.children as HTMLCollectionOf<HTMLElement>
            );
            gsap.fromTo(
              cards,
              { y: 48 * travel, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: EASE,
                stagger: 0.08,
                scrollTrigger: { trigger: grid, start: 'top 82%', once: true },
              }
            );
          });

          // ── Fade-in genérico ───────────────────────────────────────
          gsap.utils.toArray<HTMLElement>('[data-animate="fade"]').forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.8,
                ease: 'power1.out',
                scrollTrigger: { trigger: el, start: 'top 90%', once: true },
              }
            );
          });

          // ── Parallax sutil — solo desktop ──────────────────────────
          if (isDesktop) {
            gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
              const amount = parseFloat(el.dataset.parallax || '12'); // % de viaje
              gsap.fromTo(
                el,
                { yPercent: -amount / 2 },
                {
                  yPercent: amount / 2,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                }
              );
            });
          }
        }
      );

    });

    // Playfair e Inter cargan con display:swap: al entrar cambian la altura de los
    // titulares y los start/end calculados antes quedan desfasados. El refresh va
    // después de las fuentes, y otro tras 'load' por las imágenes sin dimensiones.
    let refreshRaf = 0;
    const refresh = () => {
      cancelAnimationFrame(refreshRaf);
      refreshRaf = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener('load', refresh);

    return () => {
      cancelAnimationFrame(refreshRaf);
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
