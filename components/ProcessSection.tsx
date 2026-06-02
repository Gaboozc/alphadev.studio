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
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      {/* Background dot grid accent */}
      <div aria-hidden="true" className="absolute inset-0 bg-dot-grid pointer-events-none"
        style={{ opacity: 0.25, maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 100%)' }} />

      <div className="section-container relative z-10">
        <div className="section-header">
          <h2 className="section-title" data-animate="title">{p.title}</h2>
          <div className="gold-divider" data-animate="divider" />
          <p className="section-subtitle" data-animate="subtitle">{p.subtitle}</p>
        </div>

        <div className="section-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-6" data-animate="stagger">
          {p.phases.map((phase, index) => (
            <div key={index} className="relative group">
              <div className="process-card">
                <div className="process-file">
                  <div className="process-work-5" />
                  <div className="process-work-4" />
                  <div className="process-work-3" />
                  <div className="process-work-2" />
                  <div className="process-work-1" />
                </div>
                <div className="process-card-text">
                  <div className="process-number">{PHASE_NUMBERS[index]}</div>
                  <h3 className="process-title">{phase.title}</h3>
                  <p className="process-description">{phase.description}</p>
                </div>
              </div>

              {index < p.phases.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-px transition-all duration-300"
                  style={{ background: 'linear-gradient(90deg, var(--gold-light), transparent)' }}
                />
              )}
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
