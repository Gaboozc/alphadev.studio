'use client';

import ContactoForm from './ContactoForm';
import { useLang } from '@/lib/i18n/LanguageContext';

export default function ContactoPageContent() {
  const { dict, lang } = useLang();
  const c = dict.contact;

  return (
    <main style={{ background: 'var(--bg)' }}>
      <section className="pt-36 pb-20 text-center" style={{ background: 'var(--bg)' }}>
        <div className="section-container">
          <p className="eyebrow" data-animate="fade">
            {lang === 'es' ? 'Contacto' : 'Contact'}
          </p>
          <h1 className="section-title mb-3" data-animate="title">{c.title}</h1>
          <div className="gold-divider" data-animate="divider" />
          <p className="section-subtitle mt-4" data-animate="subtitle">{c.subtitle}</p>
        </div>
      </section>

      <section className="section-pad-after-hero" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <ContactoForm />
            <div className="mt-12 pt-8 text-center" style={{ borderTop: '1px solid var(--border)' }}>
              <a href="mailto:zavarsegabriel@gmail.com" className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--gold)' }}>
                zavarsegabriel@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
