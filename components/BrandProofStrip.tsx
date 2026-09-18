'use client';

import Image from 'next/image';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';
import { CASES, CASE_PHOTO_HEIGHT, CASE_PHOTO_WIDTH } from '@/lib/content/cases';

const COPY: Record<Lang, { eyebrow: string }> = {
  es: { eyebrow: 'Clientes reales, no maquetas' },
  en: { eyebrow: 'Real clients, not mockups' },
};

/**
 * El nombre del cliente en Playfair gigante ES el logo — no existen logos
 * reales como asset (ni SVG ni PNG) para ninguno de los tres. La tipografía
 * display cumple el mismo rol que el muro de logos de Huge, a coste cero y
 * sin salirse de la paleta. Ver `[[lib/content/cases]]` para los datos.
 */
export default function BrandProofStrip() {
  const { lang } = useLang();
  const copy = COPY[lang];

  return (
    <section className="brand-proof">
      <div className="section-container">
        <p className="eyebrow brand-proof-eyebrow" data-animate="fade">
          {copy.eyebrow}
        </p>

        <div className="brand-rows">
          {CASES.map((item, index) => {
            const t = item.i18n[lang];
            return (
              <a
                key={item.slug}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="brand-row"
                data-scroll-progress
                // --i alimenta la rotación del abanico en móvil (ver el bloque
                // max-width:899px de globals.css). En escritorio no se usa.
                style={{ '--i': index } as React.CSSProperties}
                aria-label={lang === 'es' ? `Ver sitio de ${item.name}` : `View ${item.name} site`}
              >
                <div className="brand-row-copy">
                  <span className="brand-row-industry">{t.industry}</span>
                  <span className="brand-row-name" data-animate="title">
                    {item.name}
                  </span>
                  <div className="gold-divider brand-row-divider" />
                </div>

                <div className="brand-row-frame browser-frame" data-animate="clip-reveal">
                  <div className="browser-bar"><span /><span /><span /></div>
                  <Image
                    src={item.photos[0]}
                    alt={lang === 'es' ? `Trabajo para ${item.name}` : `Work for ${item.name}`}
                    width={CASE_PHOTO_WIDTH}
                    height={CASE_PHOTO_HEIGHT}
                    sizes="(max-width: 899px) 100vw, 380px"
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
