'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageContext';

// Glifos geométricos coherentes con la página de servicios (sin emojis)
const SERVICE_ICONS = ['✦', '◉', '★', '◈', '◻'];

export default function ServicesSection() {
  const { dict } = useLang();
  const s = dict.services;

  return (
    <section className="py-24 md:py-32" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title" data-animate="title">{s.title}</h2>
          <div className="gold-divider" data-animate="divider" />
          <p className="section-subtitle" data-animate="subtitle">{s.subtitle}</p>
        </div>

        <div className="section-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-animate="stagger">
          {s.items.map((service, index) => (
            <Link key={index} href="/contacto" className="block">
              <div className="service-card h-full">
                <div className="service-card-icon">{SERVICE_ICONS[index]}</div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-description">{service.description}</p>
                <div className="service-card-corner">
                  <span className="service-card-arrow">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/contacto" className="btn-glow">{s.cta}</Link>
        </div>
      </div>
    </section>
  );
}
