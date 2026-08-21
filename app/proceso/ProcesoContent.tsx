'use client';

import Link from 'next/link';
import CTASection from '@/components/CTASection';
import { useLang } from '@/lib/i18n/LanguageContext';

const PHASE_NUMBERS = ['01', '02', '03', '04', '05'];

export default function ProcesoContent() {
  const { dict, lang } = useLang();
  const p = dict.process;

  return (
    <main style={{ background: 'var(--bg)' }}>
      <section className="page-hero pt-36 pb-20" style={{ background: 'var(--bg)' }}>
        <div className="section-container">
          <div className="hero-showcase-grid">
            <div className="hero-copy">
              <p className="eyebrow" data-animate="fade">
                {lang === 'es' ? 'Cómo trabajamos' : 'How we work'}
              </p>
              <h1 className="section-title" data-animate="title">{p.title}</h1>
              <div className="gold-divider" data-animate="divider" />
              <p className="section-subtitle hero-sub" data-animate="subtitle">{p.subtitle}</p>
              <div className="hero-cta" data-animate="fade">
                <Link href="/contacto" className="btn-glow inline-flex">
                  {lang === 'es' ? 'Quiero empezar' : 'I want to start'}
                </Link>
              </div>
            </div>
            <div className="hero-visual" data-animate="fade">
              <div className="browser-frame browser-float">
                <div className="browser-bar"><span /><span /><span /></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/cases/bfs-karate-1.png"
                  alt={lang === 'es' ? 'Sitio de cliente hecho por AlphaDev' : 'Client site built by AlphaDev'}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad-after-hero" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
        <div className="section-container space-y-6" data-animate="stagger">
          {p.phases.map((phase, index) => (
            <div key={index} className="rounded-2xl border overflow-hidden transition-all duration-200"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-hover)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Phase number sidebar */}
                <div className="flex items-center justify-center p-8 md:p-10 md:w-28"
                  style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
                  <span className="text-4xl font-bold opacity-70" style={{ color: '#FAFAF7', fontFamily: 'var(--font-playfair)' }}>
                    {PHASE_NUMBERS[index]}
                  </span>
                </div>
                {/* Phase content */}
                <div className="flex-1 p-8 md:p-10">
                  <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'var(--text)' }}>
                    {phase.title}
                  </h3>
                  <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>{phase.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span style={{ color: 'var(--gold)', marginTop: '2px', flexShrink: 0 }}>✓</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTASection />
    </main>
  );
}
