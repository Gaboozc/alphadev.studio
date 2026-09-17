'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';
import { TEMPLATES, TEMPLATE_IMAGE_HEIGHT, TEMPLATE_IMAGE_WIDTH } from '@/lib/content/templates';

// Copy local, como el resto de /servicios: no hay strings de nav ni de
// metadata acá, así que no entra al diccionario global.
const COPY: Record<Lang, {
  eyebrow: string;
  title: string;
  subtitle: string;
  badge: string;
  cta: string;
}> = {
  es: {
    eyebrow: 'Plantillas por rubro',
    title: 'Aquí puede ir tu marca.',
    // El encabezado tiene que impedir activamente que esto se lea como
    // trabajo entregado: son puntos de partida, no clientes.
    subtitle: 'No son clientes nuestros: son puntos de partida reales que adaptamos a tu negocio, con tu nombre, tus fotos y tus textos.',
    badge: 'Aquí va tu marca',
    cta: 'Quiero el mío',
  },
  en: {
    eyebrow: 'Templates by industry',
    title: 'Your brand goes here.',
    subtitle: 'These are not our clients: they are real starting points we adapt to your business, with your name, your photos and your words.',
    badge: 'Your brand goes here',
    cta: 'I want mine',
  },
};

export default function TemplatesSection({
  limit,
  showCta = false,
}: {
  limit?: number;
  showCta?: boolean;
}) {
  const { lang } = useLang();
  const copy = COPY[lang];
  const items = limit ? TEMPLATES.slice(0, limit) : TEMPLATES;

  return (
    <section className="section-pad" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="section-container">
        <div className="section-header">
          <p className="eyebrow" data-animate="fade">{copy.eyebrow}</p>
          <h2 className="section-title" data-animate="title">{copy.title}</h2>
          <div className="gold-divider" data-animate="divider" />
          <p className="section-subtitle" data-animate="subtitle">{copy.subtitle}</p>
        </div>

        <div className="templates-gallery" data-animate="stagger">
          {items.map((item) => (
            <figure key={item.slug} className="template-card">
              <div className="browser-frame">
                <div className="browser-bar"><span /><span /><span /></div>
                <Image
                  src={item.image}
                  alt={
                    lang === 'es'
                      ? `Plantilla de sitio para ${item.i18n.es.industry}`
                      : `Website template for ${item.i18n.en.industry}`
                  }
                  width={TEMPLATE_IMAGE_WIDTH}
                  height={TEMPLATE_IMAGE_HEIGHT}
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 380px"
                />
                <span className="template-badge">{copy.badge}</span>
              </div>
              <figcaption>
                <p className="template-card-name">{item.i18n[lang].industry}</p>
                <p className="template-card-pitch">{item.i18n[lang].pitch}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {showCta && (
          <div className="text-center mt-12" data-animate="fade">
            <Link href="/servicios" className="btn-glow inline-flex">{copy.cta}</Link>
          </div>
        )}
      </div>
    </section>
  );
}
