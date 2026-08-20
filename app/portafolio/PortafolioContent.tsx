'use client';

import CTASection from '@/components/CTASection';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';

const PROJECT_ICONS = ['◉', '✦', '★'];

// Tags de servicio por cliente (mismo orden que portfolio.items), bilingües.
const PROJECT_TAGS: Record<Lang, string[][]> = {
  es: [
    ['Sitio web', 'Redes', 'Google + SEO'],
    ['Sitio web', 'Google + SEO'],
    ['Rediseño web', 'Diseño'],
  ],
  en: [
    ['Website', 'Social', 'Google + SEO'],
    ['Website', 'Google + SEO'],
    ['Web redesign', 'Design'],
  ],
};

export default function PortafolioContent() {
  const { dict, lang } = useLang();
  const p = dict.portfolio;

  return (
    <main style={{ background: 'var(--bg)' }}>
      <section className="pt-36 pb-20 text-center" style={{ background: 'var(--bg)' }}>
        <div className="section-container">
          <p className="eyebrow" data-animate="fade">
            {lang === 'es' ? 'Resultados' : 'Results'}
          </p>
          <h1 className="section-title mb-3" data-animate="title">{p.title}</h1>
          <div className="gold-divider" data-animate="divider" />
          <p className="section-subtitle mt-4" data-animate="subtitle">{p.subtitle}</p>
        </div>
      </section>

      <section className="section-pad-after-hero" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-animate="stagger">
            {p.items.map((project, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 border transition-all duration-200"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-hover)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(154,114,53,0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <div className="text-3xl mb-4" style={{ color: 'var(--gold)' }}>
                  {PROJECT_ICONS[index]}
                </div>
                <h3 className="text-lg mb-1" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'var(--text)' }}>
                  {project.title}
                </h3>
                <p className="text-xs font-semibold mb-3" style={{ color: 'var(--gold)', fontFamily: 'var(--font-inter)' }}>
                  {project.type}
                </p>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  {PROJECT_TAGS[lang][index]?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ background: 'var(--gold-bg)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
