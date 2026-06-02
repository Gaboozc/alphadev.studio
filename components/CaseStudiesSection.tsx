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
      title: "Psique 'n' Pixel",
      industry: 'Marca personal · Buenos Aires',
      result: 'Identidad visual completa + 0 a presencia activa en redes.',
      scope: 'Marca + Logo + Instagram + TikTok',
    },
    {
      title: 'AlphaDev Studios',
      industry: 'Agencia digital · LATAM',
      result: 'Presencia digital construida desde cero.',
      scope: 'Sitio web + Google Business + Contenido',
    },
    {
      title: 'Tu negocio podría estar aquí',
      industry: 'Próximo caso de éxito',
      result: 'Estamos construyendo nuestra cartera. Sé parte de los primeros.',
      scope: 'Precio de lanzamiento disponible',
    },
  ],
  en: [
    {
      title: "Psique 'n' Pixel",
      industry: 'Personal brand · Buenos Aires',
      result: 'Complete visual identity + 0 to active social media presence.',
      scope: 'Brand + Logo + Instagram + TikTok',
    },
    {
      title: 'AlphaDev Studios',
      industry: 'Digital agency · LATAM',
      result: 'Full digital presence built from scratch.',
      scope: 'Website + Google Business + Content',
    },
    {
      title: 'Your business could be here',
      industry: 'Next success story',
      result: "We're building our portfolio. Be one of the first.",
      scope: 'Launch pricing available',
    },
  ],
};

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
          <p
            data-animate="fade"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '1.25rem',
            }}
          >
            {copy.eyebrow}
          </p>
          <h2 className="section-title" data-animate="title" style={{ whiteSpace: 'pre-line' }}>
            {copy.title}
          </h2>
          <p className="section-subtitle" data-animate="subtitle">{copy.subtitle}</p>
        </div>

        <div className="section-content case-grid" data-animate="stagger">
          {cases.map((item) => (
            <div key={item.title} className="case-card">
              <div className="case-meta">{item.industry}</div>
              <h3>{item.title}</h3>
              <p className="case-result">{item.result}</p>
              <div className="case-scope">{item.scope}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
