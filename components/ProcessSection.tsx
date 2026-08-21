'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';

const PHASE_NUMBERS = ['01', '02', '03', '04', '05'];
const PROCESS_CTA: Record<Lang, string> = {
  es: 'Conocer Detalles del Proceso',
  en: 'See Process Details',
};

export default function ProcessSection() {
  const { dict, lang } = useLang();
  const p = dict.process;

  return (
    <section className="section-pad relative overflow-hidden" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      {/* Background dot grid accent */}
      <div aria-hidden="true" className="absolute inset-0 bg-dot-grid pointer-events-none"
        style={{ opacity: 0.25, maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 100%)' }} />

      <div className="section-container relative z-10">
        <div className="section-header">
          <h2 className="section-title" data-animate="title">{p.title}</h2>
          <div className="gold-divider" data-animate="divider" />
          <p className="section-subtitle" data-animate="subtitle">{p.subtitle}</p>
        </div>

        <div className="section-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5" data-animate="stagger">
          {p.phases.map((phase, index) => (
            <div key={index} className="process-step">
              <span className="process-step-num">{PHASE_NUMBERS[index]}</span>
              <h3 className="process-step-title">{phase.title}</h3>
              <p className="process-step-desc">{phase.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/proceso" className="btn-glow">{PROCESS_CTA[lang]}</Link>
        </div>
      </div>
    </section>
  );
}
