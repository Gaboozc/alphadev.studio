'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';

const COPY: Record<Lang, {
  eyebrow: string;
  title: string;
  subtitle: string;
  points: string[];
  wordplay: string;
  cta: string;
}> = {
  es: {
    eyebrow: 'Por qué ADS',
    title: 'No solo te ponemos online.\nTe hacemos crecer.',
    subtitle: 'Somos un equipo chico con foco total en tu resultado. Sin estructuras corporativas, sin intermediarios, sin excusas.',
    points: [
      'Hablamos tu idioma, no en tecnicismos',
      'Nos ocupamos de todo: tú te concentras en tu negocio',
      'Resultados medibles, no promesas vacías',
      'Acompañamiento real — no nos desaparecemos tras el lanzamiento',
      'Precios pensados para negocios que están creciendo',
    ],
    wordplay: 'ADS. Tres letras. Tu negocio, visible.',
    cta: 'Agendar llamada',
  },
  en: {
    eyebrow: 'Why ADS',
    title: "We don't just put you online.\nWe make you grow.",
    subtitle: "We're a small team with total focus on your results. No corporate structures, no middlemen, no excuses.",
    points: [
      'We speak your language, not tech jargon',
      'We handle everything — you focus on your business',
      'Measurable results, not empty promises',
      "Real support — we don't disappear after launch",
      'Pricing designed for growing businesses',
    ],
    wordplay: 'ADS. Three letters. Your business, visible.',
    cta: 'Book a call',
  },
};

export default function WhyUsSection() {
  const { lang } = useLang();
  const c = COPY[lang];

  return (
    <section
      className="section-pad"
      style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}
    >
      <div className="section-container">
        <div className="section-header">
          <p className="eyebrow" data-animate="fade">
            {c.eyebrow}
          </p>
          <h2
            className="section-title"
            data-animate="title"
            style={{ whiteSpace: 'pre-line' }}
          >
            {c.title}
          </h2>
          <div className="gold-divider" data-animate="divider" />
          <p className="section-subtitle" data-animate="subtitle">
            {c.subtitle}
          </p>
        </div>

        <div className="section-content" data-animate="stagger">
          {/* Points grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              maxWidth: '760px',
              margin: '0 auto 2.5rem',
            }}
          >
            {c.points.map((point) => (
              <div
                key={point}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.875rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.875rem',
                  padding: '1.125rem 1.25rem',
                }}
              >
                {/* Gold checkmark */}
                <div
                  style={{
                    flexShrink: 0,
                    width: '1.375rem',
                    height: '1.375rem',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    marginTop: '1px',
                  }}
                >
                  ✓
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.9375rem',
                    color: 'var(--text)',
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Wordplay + CTA */}
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                fontWeight: 700,
                color: 'var(--gold)',
                marginBottom: '1.75rem',
              }}
            >
              {c.wordplay}
            </p>
            <Link href="/contacto" className="btn-glow inline-flex">
              {c.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
