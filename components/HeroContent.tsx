'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';

// ── Service modules — the ecosystem ADS builds ────────────────────────────────
const MODULES: Record<Lang, { label: string; sub: string }[]> = {
  es: [
    { label: 'Web',           sub: 'Sitios profesionales' },
    { label: 'Apps',          sub: 'Aplicaciones a medida' },
    { label: 'Google',        sub: 'Business + SEO' },
    { label: 'Redes',         sub: 'Gestión social' },
    { label: 'Ads',           sub: 'Campañas que venden' },
    { label: 'Automatización',sub: 'Flujos inteligentes' },
    { label: 'IA',            sub: 'Integración nativa' },
  ],
  en: [
    { label: 'Web',        sub: 'Professional sites' },
    { label: 'Apps',       sub: 'Custom applications' },
    { label: 'Google',     sub: 'Business + SEO' },
    { label: 'Social',     sub: 'Social management' },
    { label: 'Ads',        sub: 'Campaigns that sell' },
    { label: 'Automation', sub: 'Smart workflows' },
    { label: 'AI',         sub: 'Native integration' },
  ],
};

const EYEBROW: Record<Lang, string> = {
  es: 'Ingeniería Digital',
  en: 'Digital Engineering',
};

const ECOSYSTEM_LABEL: Record<Lang, string> = {
  es: 'Ecosistemas digitales completos',
  en: 'Complete digital ecosystems',
};

export default function HeroContent() {
  const { dict, lang } = useLang();
  const h = dict.hero;
  const modules = MODULES[lang];

  return (
    <>
      {/* keyframes for the animated scan line on the modules grid */}
      <style>{`
        @keyframes scan {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
        .module-card:hover .module-dot { animation: none; opacity: 1; }
      `}</style>

      <section
        className="text-center"
        style={{
          background: 'var(--bg)',
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 10vh, 7rem) 1.5rem clamp(5rem, 12vh, 9rem)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle dot-grid background */}
        <div
          aria-hidden="true"
          data-parallax="10"
          className="bg-dot-grid absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.18,
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, black 20%, transparent 100%)',
          }}
        />

        {/* Radial glow behind headline */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60vw',
            height: '50vh',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(154,114,53,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="section-container"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', position: 'relative' }}
        >
          {/* Eyebrow */}
          <p
            data-animate="fade"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {/* Animated pulse dot */}
            <span
              className="module-dot"
              style={{
                display: 'inline-block',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'var(--gold)',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            {EYEBROW[lang]}
          </p>

          {/* Headline */}
          <h1
            data-animate="title"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 1.1,
              color: 'var(--text)',
              whiteSpace: 'pre-line',
              margin: 0,
            }}
          >
            {h.headline}
          </h1>

          <div className="gold-divider" data-animate="divider" />

          {/* Subheadline */}
          <p
            data-animate="subtitle"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              color: 'var(--text-muted)',
              maxWidth: '36rem',
              textAlign: 'center',
              margin: 0,
            }}
          >
            {h.subheadline}
          </p>

          {/* CTAs */}
          <div
            data-animate="fade"
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{ marginTop: '0.5rem' }}
          >
            <Link href="/contacto" className="btn-glow inline-flex">
              {h.cta_primary}
            </Link>
            <Link
              href="/proceso"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '2px',
                transition: 'color 200ms ease, border-color 200ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--gold)';
                e.currentTarget.style.borderColor = 'var(--gold-border)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              {h.cta_secondary} →
            </Link>
          </div>

          {/* ── Service modules grid ─────────────────────────────────────────── */}
          <div
            data-animate="fade"
            style={{ width: '100%', maxWidth: '780px', marginTop: '2rem' }}
          >
            {/* Label */}
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-subtle)',
              marginBottom: '1rem',
            }}>
              {ECOSYSTEM_LABEL[lang]}
            </p>

            {/* Grid container with animated border */}
            <div
              style={{
                position: 'relative',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '1.5rem',
                background: 'var(--bg-card)',
                overflow: 'hidden',
              }}
            >
              {/* Scan line animation */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(154,114,53,0.06) 50%, transparent 100%)',
                  animation: 'scan 4s linear infinite',
                  pointerEvents: 'none',
                }}
              />

              {/* Modules */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.625rem',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {modules.map((mod) => (
                  <div
                    key={mod.label}
                    className="module-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.25rem',
                      border: '1px solid var(--border)',
                      borderRadius: '0.625rem',
                      padding: '0.625rem 1rem',
                      background: 'var(--bg)',
                      cursor: 'default',
                      transition: 'border-color 200ms ease, background 200ms ease',
                      minWidth: '90px',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--gold-border)';
                      (e.currentTarget as HTMLDivElement).style.background = 'var(--gold-bg)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                      (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)';
                    }}
                  >
                    {/* Module dot */}
                    <span
                      className="module-dot"
                      style={{
                        display: 'block',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'var(--gold)',
                        animation: 'pulse-dot 2.5s ease-in-out infinite',
                        animationDelay: `${modules.indexOf(mod) * 0.3}s`,
                      }}
                    />
                    <span style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--text)',
                      letterSpacing: '0.01em',
                    }}>
                      {mod.label}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.625rem',
                      color: 'var(--text-subtle)',
                      letterSpacing: '0.02em',
                      whiteSpace: 'nowrap',
                    }}>
                      {mod.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
