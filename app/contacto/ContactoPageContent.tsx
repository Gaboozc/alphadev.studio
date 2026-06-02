'use client';

import TrustSection from '@/components/TrustSection';
import ContactoForm from './ContactoForm';
import { useLang } from '@/lib/i18n/LanguageContext';

export default function ContactoPageContent() {
  const { dict } = useLang();
  const c = dict.contact;

  return (
    <main style={{ background: 'var(--bg)' }}>
      <section className="pt-36 pb-20 text-center" style={{ background: 'var(--bg)' }}>
        <div className="section-container">
          <h1 className="section-title mb-3">{c.title}</h1>
          <div className="gold-divider" />
          <p className="section-subtitle mt-4">{c.subtitle}</p>
        </div>
      </section>

      <section className="pb-24" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
        <div className="section-container pt-16">
          <div className="max-w-2xl mx-auto">
            <ContactoForm />
            <div className="mt-12 pt-8 text-center" style={{ borderTop: '1px solid var(--border)' }}>
              <a href="mailto:info@alphadev.studio" className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--gold)' }}>
                info@alphadev.studio
              </a>
            </div>
          </div>
        </div>
      </section>
      <TrustSection />
    </main>
  );
}
