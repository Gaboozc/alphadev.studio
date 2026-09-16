'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';
import Image from 'next/image';

type Point = { text: string };

// Mismo orden que points en ambos idiomas.
const POINT_IMAGES = [
  '/assets/secciones/why-idioma.webp',
  '/assets/secciones/why-todo.webp',
  '/assets/secciones/why-medible.webp',
  '/assets/secciones/why-acompanamiento.webp',
  '/assets/secciones/why-precios.webp',
];

const COPY: Record<Lang, {
  eyebrow: string;
  title: string;
  subtitle: string;
  points: Point[];
  wordplay: string;
  cta: string;
}> = {
  es: {
    eyebrow: 'Por qué ADS',
    title: 'No solo te ponemos online.\nTe hacemos crecer.',
    subtitle: 'Somos un equipo chico con foco total en tu resultado. Sin estructuras corporativas, sin intermediarios, sin excusas.',
    points: [
      { text: 'Hablamos tu idioma, no en tecnicismos' },
      { text: 'Nos ocupamos de todo: tú te concentras en tu negocio' },
      { text: 'Resultados medibles, no promesas vacías' },
      { text: 'Acompañamiento real — no nos desaparecemos tras el lanzamiento' },
      { text: 'Precios pensados para negocios que están creciendo' },
    ],
    wordplay: 'ADS. Tres letras. Tu negocio, visible.',
    cta: 'Agendar llamada',
  },
  en: {
    eyebrow: 'Why ADS',
    title: "We don't just put you online.\nWe make you grow.",
    subtitle: "We're a small team with total focus on your results. No corporate structures, no middlemen, no excuses.",
    points: [
      { text: 'We speak your language, not tech jargon' },
      { text: 'We handle everything — you focus on your business' },
      { text: 'Measurable results, not empty promises' },
      { text: "Real support — we don't disappear after launch" },
      { text: 'Pricing designed for growing businesses' },
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

        <div className="whyus-grid" data-animate="stagger">
          {c.points.map((point, index) => (
            <div key={point.text} className="whyus-card">
              <div className="whyus-card-media">
                <Image
                  src={POINT_IMAGES[index]}
                  alt=""
                  width={800}
                  height={500}
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 340px"
                />
              </div>
              <p>{point.text}</p>
            </div>
          ))}
        </div>

        <div className="section-content">
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
