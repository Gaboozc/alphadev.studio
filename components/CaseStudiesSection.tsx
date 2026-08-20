'use client';

import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';

type CaseStudy = {
  title: string;
  industry: string;
  result: string;
  scope: string;
};

const CASES: Record<Lang, CaseStudy[]> = {
  es: [
    {
      title: 'BFS Karate',
      industry: 'Cliente · Artes marciales',
      result: 'Presencia digital completa desde cero.',
      scope: 'Sitio + Redes + Google Business',
    },
    {
      title: 'Imperial Barbershop',
      industry: 'Cliente · Barbería',
      result: 'Visible cuando buscan dónde cortarse el pelo.',
      scope: 'Sitio + Google Business',
    },
    {
      title: 'The Latin Grill',
      industry: 'Cliente · Restaurante',
      result: 'Sitio rediseñado desde cero, listo para el celular.',
      scope: 'Rediseño web',
    },
  ],
  en: [
    {
      title: 'BFS Karate',
      industry: 'Client · Martial arts',
      result: 'A complete digital presence from scratch.',
      scope: 'Site + Social + Google Business',
    },
    {
      title: 'Imperial Barbershop',
      industry: 'Client · Barbershop',
      result: 'Visible when people search for a haircut.',
      scope: 'Site + Google Business',
    },
    {
      title: 'The Latin Grill',
      industry: 'Client · Restaurant',
      result: 'Site redesigned from scratch, mobile-ready.',
      scope: 'Web redesign',
    },
  ],
};

// Sitio web real de cada cliente (mismo orden que CASES).
const CASE_URLS = [
  'https://www.bfsmartialart.com/',
  'https://imperialbarbercoacalco.com/',
  'https://www.thelatingrillfl.com/',
];

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
  const cases = CASES[lang];
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
          {cases.map((item, i) => (
            <div key={item.title} className="case-card">
              <div className="case-meta">{item.industry}</div>
              <h3>{item.title}</h3>
              <p className="case-result">{item.result}</p>
              <div className="case-scope">{item.scope}</div>
              {CASE_URLS[i] && (
                <a
                  href={CASE_URLS[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-link"
                >
                  {lang === 'es' ? 'Ver sitio' : 'View site'} <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
