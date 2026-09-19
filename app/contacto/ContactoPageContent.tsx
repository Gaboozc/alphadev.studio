'use client';

import Image from 'next/image';
import { useLang } from '@/lib/i18n/LanguageContext';
import { CASES, CASE_PHOTO_HEIGHT, CASE_PHOTO_WIDTH } from '@/lib/content/cases';
import ContactoForm from './ContactoForm';
import { PHONE_MX, PHONE_US } from '@/lib/site-config';

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
              <div className="hero-case-stack" style={{ '--stack-last': CASES.length - 1 } as React.CSSProperties}>
                {CASES.map((item, index) => (
                  <div
                    key={item.slug}
                    className="browser-frame hero-case-stack-item"
                    style={{ '--i': index } as React.CSSProperties}
                  >
                    <div className="browser-bar"><span /><span /><span /></div>
                    <Image
                      src={item.photos[0]}
                      alt={lang === 'es' ? `Sitio de ${item.name} hecho por AlphaDev` : `${item.name} site built by AlphaDev`}
                      width={CASE_PHOTO_WIDTH}
                      height={CASE_PHOTO_HEIGHT}
                      sizes="(max-width: 899px) 100vw, 620px"
                      priority={index === CASES.length - 1}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad-after-hero" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <ContactoForm />
            {/* Si prefieres no escribir el formulario, el teléfono. El correo
                personal salió de las superficies públicas del sitio. */}
            <div className="mt-12 pt-8 text-center" style={{ borderTop: '1px solid var(--border)' }}>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {lang === 'es' ? '¿Prefieres llamar?' : 'Rather call?'}{' '}
                <a href={PHONE_MX.href} className="transition-colors hover:opacity-80" style={{ color: 'var(--gold)' }}>
                  {PHONE_MX.display}
                </a>{' '}
                · MX{'  '}
                <a href={PHONE_US.href} className="transition-colors hover:opacity-80" style={{ color: 'var(--gold)' }}>
                  {PHONE_US.display}
                </a>{' '}
                · US
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
