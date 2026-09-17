'use client';

import { useRef, useState } from 'react';
import { useLang } from '@/lib/i18n/LanguageContext';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);
  const { lang } = useLang();

  const scrollCue   = lang === 'es' ? 'Desliza para empezar' : 'Scroll down';
  const replayLabel = lang === 'es' ? 'Ver de nuevo' : 'Replay';

  function handleReplay() {
    const v = videoRef.current;
    if (!v) return;
    setEnded(false);
    v.currentTime = 0;
    v.play().catch(() => {});
  }

  return (
    <>
      {/* ── Video section ─────────────────────────────────────────────────
           100dvh = pantalla completa correcta en mobile.
           clipPath:inset(0) garantiza clipping aunque Lenis use transforms.
           data-hero-handoff: el hero cede protagonismo al hacer scroll en vez
           de simplemente desaparecer (yPercent/scale/opacity, solo desktop —
           ver ScrollAnimations.tsx). */}
      <section
        data-hero-handoff
        className={`hero-video-section${ended ? ' is-ended' : ''}`}
      >
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
          <img className="hero-logo-overlay-img" src="/assets/ads-logo.svg" alt="AlphaDev Studios" />
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
      </section>
    </>
  );
}
