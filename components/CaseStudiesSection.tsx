'use client';

import Image from 'next/image';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';
import { CASES } from '@/lib/content/cases';

const SECTION_COPY: Record<Lang, { eyebrow: string; title: string; subtitle: string }> = {
  es: {
    eyebrow: 'Resultados',
    title: 'Negocios que pasaron de\ninvisibles a encontrados.',
    subtitle: 'Proyectos reales. Sin inventar testimonios ni resultados falsos.',
  },
  en: {
    eyebrow: 'Results',
    title: 'Businesses that went from\ninvisible to found.',
    subtitle: 'Real projects. No fake testimonials or made-up results.',
  },
};

export default function CaseStudiesSection() {
  const { lang } = useLang();
  const copy = SECTION_COPY[lang];

  return (
    <section className="case-studies-section">
      <div className="section-container">
        <div className="section-header">
          <p className="eyebrow" data-animate="fade">
            {copy.eyebrow}
          </p>
          <h2 className="section-title" data-animate="title" style={{ whiteSpace: 'pre-line' }}>
            {copy.title}
          </h2>
          <div className="gold-divider" data-animate="divider" />
          <p className="section-subtitle" data-animate="subtitle">{copy.subtitle}</p>
        </div>

        <div className="section-content case-grid" data-animate="stagger">
          {CASES.map((item) => {
            const t = item.i18n[lang];
            return (
              <article key={item.slug} className="case-card">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-card-thumb"
                  data-animate="clip-reveal"
                  aria-label={lang === 'es' ? `Ver sitio de ${item.name}` : `View ${item.name} site`}
                >
                  <Image
                    src={item.photos[0]}
                    alt={lang === 'es' ? `Trabajo para ${item.name}` : `Work for ${item.name}`}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 400px"
                  />
                </a>
                <div className="case-card-body">
                  <div className="case-meta">{t.industry}</div>
                  <h3>{item.name}</h3>
                  <p className="case-result">{t.result}</p>
                  <div className="case-scope">{t.scope}</div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-link"
                  >
                    {lang === 'es' ? 'Ver sitio' : 'View site'} <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
