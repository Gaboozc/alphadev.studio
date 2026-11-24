'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/i18n/LanguageContext';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);
  const { lang } = useLang();

  const scrollCue   = lang === 'es' ? 'Desliza para empezar' : 'Scroll down';
  const replayLabel = lang === 'es' ? 'Ver de nuevo' : 'Replay';

  // Póster + logo quietos si el visitante pidió movimiento reducido: no se
  // fuerza autoplay. El resto del handoff lo apaga ScrollAnimations (matchMedia).
  useLayoutEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const video = videoRef.current;

    const apply = () => {
      if (!motion.matches) return;
      if (video) {
        video.pause();
        video.removeAttribute('autoplay');
      }
      setEnded(true);
    };

    apply();
    motion.addEventListener('change', apply);
    return () => motion.removeEventListener('change', apply);
  }, []);

  function handleReplay() {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnded(false);
    v.currentTime = 0;
    v.play().catch(() => {});
  }

  return (
    <>
      {/* ── Video section ─────────────────────────────────────────────────
           100dvh = pantalla completa correcta en mobile.
           overflow:hidden + border-radius (GSAP) recortan el handoff a tarjeta
           en desktop. data-hero-handoff: el video cede a tarjeta (radio 36,
           scale ≈0.55, origen arriba-derecha) ligado al scroll del propio
           hero, sin pin — ver ScrollAnimations.tsx. En ≤899 no hay handoff. */}
      <section
        data-hero-handoff
        className={`hero-video-section${ended ? ' is-ended' : ''}`}
      >
        {/* Frame visual: en desktop es sticky (no pin de GSAP, sin pin-spacer)
            para que la tarjeta conviva con el titular. El trigger del scrub
            es la sección, que sí mide bien. */}
        <div className="hero-video-frame" data-hero-frame>
          {/* preload="metadata" en vez de "auto": con autoPlay el navegador descarga
              el vídeo igualmente, pero así no compite por ancho de banda antes de que
              pinte el poster — que es el LCP de la home. */}
          <video
            ref={videoRef}
            className="hero-video"
            src="/assets/hero.mp4"
            poster="/assets/hero-poster.webp"
            autoPlay
            muted
            playsInline
            preload="metadata"
            onEnded={() => setEnded(true)}
          />

          {/* Logo overlay — aparece cuando el video termina */}
          <div className={`hero-logo-overlay${ended ? ' is-visible' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-logo-overlay-img solo-claro" src="/assets/ads-logo.svg" alt="AlphaDev Studios" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-logo-overlay-img solo-oscuro" src="/assets/ads-logo-oscuro.svg" alt="" aria-hidden="true" />
          </div>

          {/* Overlay post-video */}
          <div className={`hero-post-overlay${ended ? ' is-visible' : ''}`}>
            <button className="hero-replay-btn" onClick={handleReplay}>
              ↺ {replayLabel}
            </button>

            <div className="hero-scroll-cue">
              <span className="hero-scroll-cue-label">{scrollCue}</span>
              <div className="hero-scroll-cue-line" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
