'use client';

import Image from 'next/image';
import { useLang } from '@/lib/i18n/LanguageContext';
import { CASE_PHOTO_HEIGHT, CASE_PHOTO_WIDTH } from '@/lib/content/cases';
import ContactoForm from './ContactoForm';
import { CONTACT_EMAIL } from '@/lib/site-config';

export default function ContactoPageContent() {
  const { dict, lang } = useLang();
  const c = dict.contact;

  return (
    <main style={{ background: 'var(--bg)' }}>
      <section className="page-hero pt-36 pb-20" style={{ background: 'var(--bg)' }}>
        <div className="section-container">
          <div className="hero-showcase-grid">
            <div className="hero-copy">
              <p className="eyebrow" data-animate="fade">
                {lang === 'es' ? 'Contacto' : 'Contact'}
              </p>
              <h1 className="section-title" data-animate="title">{c.title}</h1>
              <div className="gold-divider" data-animate="divider" />
              <p className="section-subtitle hero-sub" data-animate="subtitle">{c.subtitle}</p>
            </div>
            <div className="hero-visual" data-animate="fade">
              <div className="browser-frame browser-float">
                <div className="browser-bar"><span /><span /><span /></div>
                <Image
                  src="/assets/cases/imperial-barbershop-1.png"
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
          <div className="max-w-2xl mx-auto">
            <ContactoForm />
            <div className="mt-12 pt-8 text-center" style={{ borderTop: '1px solid var(--border)' }}>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--gold)' }}>
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
