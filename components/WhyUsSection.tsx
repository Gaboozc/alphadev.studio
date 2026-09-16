'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';
import Icon, { type IconName } from '@/components/Icon';

type Point = { icon: IconName; text: string };

const COPY: Record<Lang, {
  eyebrow: string;
  title: string;
  subtitle: string;
  points: Point[];
  founderQuote: string;
  founderName: string;
  founderRole: string;
  wordplay: string;
  cta: string;
}> = {
  es: {
    eyebrow: 'Por qué ADS',
    title: 'No solo te ponemos online.\nTe hacemos crecer.',
    subtitle: 'Somos un equipo chico con foco total en tu resultado. Sin estructuras corporativas, sin intermediarios, sin excusas.',
    points: [
      { icon: 'message', text: 'Hablamos tu idioma, no en tecnicismos' },
      { icon: 'layers', text: 'Nos ocupamos de todo: tú te concentras en tu negocio' },
      { icon: 'barChart', text: 'Resultados medibles, no promesas vacías' },
      { icon: 'users', text: 'Acompañamiento real — no nos desaparecemos tras el lanzamiento' },
      { icon: 'trendingUp', text: 'Precios pensados para negocios que están creciendo' },
    ],
    founderQuote: 'Detrás de cada proyecto estoy yo, no un call center. Me escribes por WhatsApp y te contesto yo.',
    founderName: 'Gabriel Zavarse',
    founderRole: 'Founder, AlphaDev Studios',
    wordplay: 'ADS. Tres letras. Tu negocio, visible.',
    cta: 'Agendar llamada',
  },
  en: {
    eyebrow: 'Why ADS',
    title: "We don't just put you online.\nWe make you grow.",
    subtitle: "We're a small team with total focus on your results. No corporate structures, no middlemen, no excuses.",
    points: [
      { icon: 'message', text: 'We speak your language, not tech jargon' },
      { icon: 'layers', text: 'We handle everything — you focus on your business' },
      { icon: 'barChart', text: 'Measurable results, not empty promises' },
      { icon: 'users', text: "Real support — we don't disappear after launch" },
      { icon: 'trendingUp', text: 'Pricing designed for growing businesses' },
    ],
    founderQuote: "Behind every project is me, not a call center. You message me on WhatsApp and I'm the one who answers.",
    founderName: 'Gabriel Zavarse',
    founderRole: 'Founder, AlphaDev Studios',
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

        {/* Founder — la prueba de que no hay call center detrás: una persona
            real, con nombre, que es quien efectivamente contesta. Es el
            argumento de esta sección, así que va antes que la lista. */}
        <div className="whyus-founder" data-animate="fade">
          <div className="whyus-founder-photo">
            <Image
              src="/assets/secciones/gabriel-founder.webp"
              alt={c.founderName}
              width={600}
              height={750}
              sizes="(max-width: 767px) 150px, 180px"
            />
          </div>
          <blockquote className="whyus-founder-quote">
            <p>{c.founderQuote}</p>
            <footer>
              <span className="whyus-founder-name">{c.founderName}</span>
              <span className="whyus-founder-role">{c.founderRole}</span>
            </footer>
          </blockquote>
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
                key={point.text}
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
                <div
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '10px',
                    background: 'var(--gold-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold)',
                  }}
                >
                  <Icon name={point.icon} size={19} />
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.9375rem',
                    color: 'var(--text)',
                    lineHeight: 1.5,
                    margin: 0,
                    marginTop: '0.3rem',
                  }}
                >
                  {point.text}
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
