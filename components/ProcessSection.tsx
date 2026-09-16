'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';
import Image from 'next/image';

const PHASE_NUMBERS = ['01', '02', '03', '04', '05'];
const PHASE_IMAGES = [
  '/assets/secciones/fase-conversamos.webp',
  '/assets/secciones/fase-disenamos.webp',
  '/assets/secciones/fase-construimos.webp',
  '/assets/secciones/fase-lanzamos.webp',
  '/assets/secciones/fase-crecemos.webp',
];
const PROCESS_CTA: Record<Lang, string> = {
  es: 'Conocer Detalles del Proceso',
  en: 'See Process Details',
};

export default function ProcessSection() {
  const { dict, lang } = useLang();
  const p = dict.process;

  return (
    <section className="section-pad relative" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      {/* Background dot grid accent — el overflow-hidden vive en este wrapper,
          nunca en la <section>: si estuviera en la section rompería el
          position:sticky del encabezado de abajo (ver .sticky-stack en globals.css). */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-dot-grid"
          style={{ opacity: 0.25, maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 100%)' }} />
      </div>

      <div className="section-container relative z-10">
        <div className="sticky-stack">
          <div className="sticky-stack-header">
            <h2 className="section-title" data-animate="title">{p.title}</h2>
            <div className="gold-divider" data-animate="divider" />
            <p className="section-subtitle" data-animate="subtitle">{p.subtitle}</p>
            <div className="mt-8" data-animate="fade">
              <Link href="/proceso" className="btn-glow">{PROCESS_CTA[lang]}</Link>
            </div>
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
                    sizes="140px"
                  />
                </div>
                <span className="process-step-num">{PHASE_NUMBERS[index]}</span>
                <h3 className="process-step-title">{phase.title}</h3>
                <p className="process-step-desc">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
