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
      title: 'Imperial Barbershop',
      industry: 'Cliente · Barbería',
      result: 'Construyendo su presencia digital desde cero.',
      scope: 'Marca + Sitio + Google Business',
    },
    {
      title: 'AlphaDev Studios',
      industry: 'Proyecto propio · LATAM',
      result: 'Nuestra propia presencia, con el mismo criterio que damos al cliente.',
      scope: 'Sitio web + Diseño + SEO',
    },
    {
      title: 'Tu negocio podría estar aquí',
      industry: 'Próximo proyecto',
      result: 'Abriendo cupos para los primeros clientes del estudio.',
      scope: 'Hablemos',
    },
  ],
  en: [
    {
      title: 'Imperial Barbershop',
      industry: 'Client · Barbershop',
      result: 'Building their digital presence from scratch.',
      scope: 'Brand + Site + Google Business',
    },
    {
      title: 'AlphaDev Studios',
      industry: 'Our own project · LATAM',
      result: 'Our own presence, built to the same standard we give clients.',
      scope: 'Website + Design + SEO',
    },
    {
      title: 'Your business could be here',
      industry: 'Next project',
      result: "We're opening spots for the studio's first clients.",
      scope: "Let's talk",
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
