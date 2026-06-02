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
           clipPath:inset(0) garantiza clipping aunque Lenis use transforms. */}
      <section
        style={{
          height: '100dvh',
          position: 'relative',
          overflow: 'hidden',
          clipPath: 'inset(0)',
          background: ended ? 'rgb(250,245,240)' : 'rgb(0,0,0)',
          transition: 'background 0.8s ease',
        }}
      >
        <video
          ref={videoRef}
          src="/assets/hero.mp4"
          poster="/assets/hero-poster.png"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() => setEnded(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Logo overlay — aparece cuando el video termina */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgb(250,245,240)',
            opacity: ended ? 1 : 0,
            transition: 'opacity 1s ease 0.3s',
            pointerEvents: 'none',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/ads-logo.svg"
            alt="AlphaDev Studios"
            style={{
              width: 'min(100vw, 100vh)',
              height: 'auto',
            }}
          />
        </div>

        {/* Overlay post-video */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 'clamp(1.5rem, 4vh, 3rem)',
            gap: '1rem',
            opacity: ended ? 1 : 0,
            transition: 'opacity 1s ease',
            pointerEvents: ended ? 'auto' : 'none',
          }}
        >
          <button
            onClick={handleReplay}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              background: 'rgba(250,250,247,0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border)',
              borderRadius: '2rem',
              padding: '0.5rem 1.25rem',
              cursor: 'pointer',
              transition: 'border-color 200ms ease, color 200ms ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold-border)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
            }}
          >
            ↺ {replayLabel}
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--text-subtle)',
            }}>
              {scrollCue}
            </span>
            <div style={{ width: '1px', height: '1.75rem', background: 'linear-gradient(to bottom, var(--gold-light), transparent)' }} />
          </div>
        </div>
      </section>

    </>
  );
}
