'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageContext';

export default function CTASection() {
  const { dict } = useLang();
  const c = dict.cta;

  return (
    <section
      className="cta-dark py-24 md:py-32 text-center relative overflow-hidden"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      {/* Background treatments */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
          width: '70vw', height: '70vw', maxWidth: '800px', maxHeight: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,164,101,0.14) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }} />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-dot-grid pointer-events-none"
        style={{ opacity: 0.2, maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 100%)' }} />

      <div className="section-container space-y-8 relative z-10">
        <h2
          className="cta-title text-[clamp(2.25rem,5vw,3.5rem)] leading-tight"
          style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700 }}
          data-animate="title"
        >
          {c.title}
        </h2>
        <div className="gold-divider" data-animate="divider" />
        <p className="cta-subtitle text-lg max-w-xl mx-auto" style={{ fontFamily: 'var(--font-inter)' }} data-animate="subtitle">
          {c.subtitle}
        </p>
        <div data-animate="fade">
          <Link href="/contacto" className="btn-glow inline-flex">{c.button}</Link>
        </div>
        <p className="cta-note text-sm" data-animate="fade">{c.note}</p>
      </div>
    </section>
  );
}
