'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/lib/i18n/LanguageContext';
import Icon, { type IconName } from './Icon';

// Mismo orden que services.items. "Publicidad que vende" todavía no tiene
// imagen generada, así que esa card conserva su ícono hasta que llegue.
const SERVICE_IMAGES: (string | null)[] = [
  '/assets/secciones/serv-presencia.webp',
  '/assets/secciones/serv-redes.webp',
  null,
  '/assets/secciones/serv-google.webp',
  '/assets/secciones/serv-sitio.webp',
];
const SERVICE_ICONS: IconName[] = ['layers', 'share', 'megaphone', 'mapPin', 'monitor'];

export default function ServicesSection() {
  const { dict } = useLang();
  const s = dict.services;

  return (
    <section className="section-pad" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
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
                {SERVICE_IMAGES[index] ? (
                  <div className="service-card-media">
                    <Image
                      src={SERVICE_IMAGES[index]!}
                      alt=""
                      width={900}
                      height={562}
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 380px"
                    />
                  </div>
                ) : (
                  <div className="service-card-icon" style={{ color: 'var(--gold)' }}>
                    <Icon name={SERVICE_ICONS[index]} size={28} />
                  </div>
                )}
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
