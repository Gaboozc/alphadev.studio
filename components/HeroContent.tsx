'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';
import { CASES, CASE_PHOTO_HEIGHT, CASE_PHOTO_WIDTH } from '@/lib/content/cases';

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
    { label: 'GEO',           sub: 'Visible para la IA' },
  ],
  en: [
    { label: 'Web',        sub: 'Professional sites' },
    { label: 'Apps',       sub: 'Custom applications' },
    { label: 'Google',     sub: 'Business + SEO' },
    { label: 'Social',     sub: 'Social management' },
    { label: 'Ads',        sub: 'Campaigns that sell' },
    { label: 'Automation', sub: 'Smart workflows' },
    { label: 'AI',         sub: 'Native integration' },
    { label: 'GEO',        sub: 'Visible to AI' },
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
    <section className="hero-stage text-center">
      {/* Subtle dot-grid background */}
      <div aria-hidden="true" data-parallax="10" className="hero-stage-dots bg-dot-grid" />

      {/* Radial glow behind headline */}
      <div aria-hidden="true" className="hero-stage-glow" />

      {/* Ambient gold orbs — drift lento detrás del headline (on-spec del design system) */}
      <div aria-hidden="true" className="hero-orb hero-orb-1" />
      <div aria-hidden="true" className="hero-orb hero-orb-2" />
      <div aria-hidden="true" className="hero-orb hero-orb-3" />

      <div className="section-container hero-stage-inner">
        <div className="hero-showcase-grid hero-intro-grid">
          <div className="hero-copy">
            {/* Eyebrow */}
            <p data-animate="fade" className="hero-badge">
              {/* Animated pulse dot */}
              <span className="hero-badge-dot module-dot" />
              {EYEBROW[lang]}
            </p>

            {/* Headline */}
            <h1 data-animate="title" className="hero-headline">
              {h.headline}
            </h1>

            <div className="gold-divider" data-animate="divider" />

            {/* Subheadline */}
            <p data-animate="subtitle" className="hero-subheadline">
              {h.subheadline}
            </p>

            {/* CTAs */}
            <div data-animate="fade" className="hero-cta-row flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contacto" className="btn-glow inline-flex">
                {h.cta_primary}
              </Link>
              <Link href="/proceso" className="hero-cta-secondary">
                {h.cta_secondary} →
              </Link>
            </div>
          </div>

          {/* El mismo abanico de clientes reales que /servicios, /proceso y
              /contacto — el home era la única de las 4 páginas sin trabajo
              real a la vista en su hero. */}
          <div className="hero-visual" data-animate="fade">
            <div className="hero-case-stack" style={{ '--stack-last': CASES.length - 1 } as React.CSSProperties}>
              {CASES.map((item, index) => (
                <div
                  key={item.slug}
                  className="browser-frame hero-case-stack-item"
                  style={{ '--i': index } as React.CSSProperties}
                >
                  <div className="browser-bar"><span /><span /><span /></div>
                  <Image
                    src={item.photos[0]}
                    alt={lang === 'es' ? `Sitio de ${item.name} hecho por AlphaDev` : `${item.name} site built by AlphaDev`}
                    width={CASE_PHOTO_WIDTH}
                    height={CASE_PHOTO_HEIGHT}
                    sizes="(max-width: 899px) 100vw, 620px"
                    priority={index === CASES.length - 1}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Service modules grid ─────────────────────────────────────────── */}
        <div data-animate="fade" className="hero-modules">
          {/* Label */}
          <p className="hero-modules-label">{ECOSYSTEM_LABEL[lang]}</p>

          {/* Grid container with animated border */}
          <div className="hero-modules-panel">
            {/* Scan line animation */}
            <div aria-hidden="true" className="hero-modules-scan" />

            {/* Modules */}
            <div className="hero-modules-grid">
              {modules.map((mod, i) => (
                <div key={mod.label} className="module-card">
                  {/* Module dot */}
                  <span
                    className="module-dot"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                  <span className="module-label">{mod.label}</span>
                  <span className="module-sub">{mod.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
