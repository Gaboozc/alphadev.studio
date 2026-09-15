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

          // ScrollTrigger mide mal cuando el propio trigger es position:sticky
          // (su getBoundingClientRect refleja la posición "pegada" en vez de la
          // de documento en el momento del refresh, así que el cálculo de
          // start/end queda mal para siempre y el reveal nunca dispara). Todo
          // lo que vive dentro de .sticky-stack-header usa en su lugar el
          // .sticky-stack contenedor (grid normal, no sticky) como trigger —
          // misma posición vertical aproximada, sin el bug de medición.
          const stableTrigger = (el: HTMLElement) =>
            el.closest('.sticky-stack-header') ? (el.closest<HTMLElement>('.sticky-stack') ?? el) : el;

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
              scrollTrigger: { trigger: stableTrigger(el), start: 'top 88%', once: true },
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
                scrollTrigger: { trigger: stableTrigger(el), start: 'top 92%', once: true },
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
                scrollTrigger: { trigger: stableTrigger(el), start: 'top 88%', once: true },
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
                scrollTrigger: { trigger: stableTrigger(grid), start: 'top 82%', once: true },
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
                scrollTrigger: { trigger: stableTrigger(el), start: 'top 90%', once: true },
              }
            );
          });

          // ── Reveal-scrub: párrafo que se ilumina palabra por palabra
          //    según el progreso del scroll (estilo Fantasy). El estado inicial
          //    vive en el tween, nunca en CSS: sin JS el texto se lee al 100%.
          gsap.utils.toArray<HTMLElement>('[data-animate="reveal-scrub"]').forEach((el) => {
            const words = splitWords(el);
            // Guard de coste: un párrafo muy largo scrubbeado palabra por palabra
            // sería demasiados tweens por frame. Por encima de 140 se degrada a
            // un fade-in simple, ya cubierto por la variante "fade".
            if (!words.length || words.length > 140) return;
            gsap.fromTo(
              words,
              { opacity: 0.12 },
              {
                opacity: 1,
                ease: 'none',
                stagger: { each: 0.08 },
                scrollTrigger: {
                  trigger: el,
                  start: 'top 78%',
                  end: 'bottom 60%',
                  scrub: 0.5,
                },
              }
            );
          });

          // ── Clip-reveal: el contenido se destapa en vez de aparecer
          //    (estilo Huge). Pensado para mockups y thumbnails de trabajo real.
          gsap.utils.toArray<HTMLElement>('[data-animate="clip-reveal"]').forEach((el) => {
            gsap.fromTo(
              el,
              { clipPath: 'inset(0 0 100% 0)', scale: 1.06 },
              {
                clipPath: 'inset(0 0 0% 0)',
                scale: 1,
                duration: 1,
                ease: EASE,
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              }
            );
          });

          // ── Scroll-progress: escribe --p (0→1) como custom property en vez
          //    de animar una propiedad directamente. El CSS del elemento decide
          //    qué hacer con --p (escala, tracking, opacidad de máscara...).
          //    Pensado para el nombre de cliente gigante de BrandProofStrip
          //    (Fase 3); el motor ya queda listo aquí.
          gsap.utils.toArray<HTMLElement>('[data-scroll-progress]').forEach((el) => {
            gsap.fromTo(
              el,
              { '--p': 0 } as gsap.TweenVars,
              {
                '--p': 1,
                ease: 'none',
                scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
              } as gsap.TweenVars
            );
          });

          // ── Section-theme: cuando una sección oscura (ej. CTASection) entra
          //    en viewport, marca <html> para que el grano de fondo cambie a
          //    'screen' — con 'multiply' sobre un fondo casi negro el grano
          //    queda matemáticamente invisible (ver globals.css). Corre en
          //    todos los tamaños: el fix de contraste no es un lujo de desktop.
          gsap.utils.toArray<HTMLElement>('[data-section-theme]').forEach((el) => {
            const theme = el.dataset.sectionTheme || 'dark';
            ScrollTrigger.create({
              trigger: el,
              start: 'top 60%',
              end: 'bottom 40%',
              onEnter: () => { document.documentElement.dataset.themeScroll = theme; },
              onEnterBack: () => { document.documentElement.dataset.themeScroll = theme; },
              onLeave: () => { delete document.documentElement.dataset.themeScroll; },
              onLeaveBack: () => { delete document.documentElement.dataset.themeScroll; },
            });
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

            // ── Hero handoff: el video cede protagonismo al hacer scroll en
            //    vez de simplemente desaparecer bajo el contenido siguiente
            //    (estilo Huge/Fantasy). Solo desktop: en móvil el vídeo ya es
            //    caro y esto añadiría un scrub más al hilo principal.
            gsap.utils.toArray<HTMLElement>('[data-hero-handoff]').forEach((el) => {
              gsap.fromTo(
                el,
                { yPercent: 0, scale: 1, opacity: 1 },
                {
                  yPercent: -8,
                  scale: 0.96,
                  opacity: 0.4,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: el,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                  },
                }
              );
            });

          // ── Pin-track: carrusel horizontal pinneado (WorkShowcase,
            //    estilo Huge "Our work."). Es el UNICO pin de todo el sitio a
            //    propósito: cada pin inserta un spacer y fuerza un recálculo
            //    de todos los triggers posteriores, así que no se repite el
            //    patrón en ningún otro sitio. Solo desktop: en móvil el mismo
            //    markup es scroll-snap nativo, sin JS (ver globals.css).
            gsap.utils.toArray<HTMLElement>('[data-pin-track]').forEach((section) => {
              const track = section.querySelector<HTMLElement>('[data-pin-track-inner]');
              if (!track) return;
              gsap.to(track, {
                x: () => -(track.scrollWidth - section.clientWidth),
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  pin: true,
                  scrub: 1,
                  anticipatePin: 1,
                  end: () => '+=' + (track.scrollWidth - section.clientWidth),
                  invalidateOnRefresh: true,
                },
              });
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
      // Evita que una navegación a mitad de una sección oscura deje <html>
      // marcado para siempre — la página nueva no tiene por qué serlo.
      delete document.documentElement.dataset.themeScroll;
    };
  }, [pathname]);

  return null;
}
