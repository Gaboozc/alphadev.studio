'use client';

import { useLang } from '@/lib/i18n/LanguageContext';

export default function TrustSection() {
  const { dict } = useLang();
  const t = dict.trust;

  return (
    <section className="trust-section">
      <div className="section-container">
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <h2 className="trust-title">{t.title}</h2>
          <p className="trust-subtitle">{t.subtitle}</p>
        </div>
        <div className="section-content">
          <div className="marquee">
            <div className="marquee__track">
              {t.clients.concat(t.clients).map((client, index) => (
                <div key={index} className="logo-pill">{client}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
