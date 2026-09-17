'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';

// Quién te va a atender, justo en el momento en que se pide la llamada.
// Habla en plural a propósito: el equipo ya no es una sola persona, así que
// la promesa es "te conoce por tu nombre", no "te contesto yo".
const FOUNDER: Record<Lang, { quote: string; name: string; role: string }> = {
  es: {
    quote: 'Detrás de cada proyecto hay un equipo chico, no un call center. Escribes por WhatsApp y te contesta alguien que conoce tu cuenta.',
    name: 'Gabriel Zavarse',
    role: 'Founder, AlphaDev Studios',
  },
  en: {
    quote: 'Behind every project is a small team, not a call center. You message on WhatsApp and someone who knows your account answers.',
    name: 'Gabriel Zavarse',
    role: 'Founder, AlphaDev Studios',
  },
};

export default function CTASection() {
  const { dict, lang } = useLang();
  const c = dict.cta;
  const f = FOUNDER[lang];

  return (
    <section
      className="cta-dark section-pad text-center relative overflow-hidden"
      style={{ borderTop: '1px solid var(--border)' }}
      data-section-theme="dark"
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

        <div className="cta-founder" data-animate="fade">
          <div className="cta-founder-photo">
            <Image
              src="/assets/secciones/gabriel-founder.webp"
              alt={f.name}
              width={600}
              height={750}
              sizes="(max-width: 767px) 120px, 150px"
            />
          </div>
          <blockquote className="cta-founder-quote">
            <p>{f.quote}</p>
            <footer>
              <span className="cta-founder-name">{f.name}</span>
              <span className="cta-founder-role">{f.role}</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
