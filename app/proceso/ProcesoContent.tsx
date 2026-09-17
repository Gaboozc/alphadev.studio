'use client';

import Link from 'next/link';
import Image from 'next/image';
import CTASection from '@/components/CTASection';
import { useLang } from '@/lib/i18n/LanguageContext';
import { CASE_PHOTO_HEIGHT, CASE_PHOTO_WIDTH } from '@/lib/content/cases';
const PHASE_NUMBERS = ['01', '02', '03', '04', '05'];
const PHASE_IMAGES = [
  '/assets/secciones/fase-conversamos.webp',
  '/assets/secciones/fase-disenamos.webp',
  '/assets/secciones/fase-construimos.webp',
  '/assets/secciones/fase-lanzamos.webp',
  '/assets/secciones/fase-crecemos.webp',
];

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
                <Image
                  src="/assets/cases/bfs-karate-1.png"
                  alt={lang === 'es' ? 'Sitio de cliente hecho por AlphaDev' : 'Client site built by AlphaDev'}
                  width={CASE_PHOTO_WIDTH}
                  height={CASE_PHOTO_HEIGHT}
                  sizes="(max-width: 899px) 100vw, 620px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad-after-hero" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
        <div className="section-container">
          <div className="sticky-stack">
            <div className="sticky-stack-header">
              <p className="eyebrow" data-animate="fade">
                {lang === 'es' ? 'Las 5 fases' : 'The 5 phases'}
              </p>
              <h2 className="section-title" data-animate="title" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)' }}>
                {lang === 'es' ? 'De invisible a imparable, paso a paso.' : 'From invisible to unstoppable, step by step.'}
              </h2>
              <div className="gold-divider" data-animate="divider" />
              <p className="section-subtitle" data-animate="subtitle">
                {lang === 'es'
                  ? 'El mismo proceso para todos los proyectos, sin importar el tamaño del negocio.'
                  : 'The same process for every project, no matter the size of the business.'}
              </p>
            </div>

            <div className="sticky-stack-items" data-animate="stagger">
              {p.phases.map((phase, index) => (
                <div key={index} className="process-step process-step-withmedia">
                  <div className="process-step-media">
                    <Image
                      src={PHASE_IMAGES[index]}
                      alt=""
                      width={700}
                      height={700}
                      sizes="160px"
                    />
                  </div>
                  <span className="process-step-num">{PHASE_NUMBERS[index]}</span>
                  <h3 className="process-step-title">{phase.title}</h3>
                  <p className="process-step-desc">{phase.description}</p>
                  <div className="process-step-details">
                    {phase.details.map((detail, i) => (
                      <span key={i} className="process-step-detail">{detail}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </main>
  );
}
