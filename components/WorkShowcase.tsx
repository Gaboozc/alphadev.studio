'use client';

import Image from 'next/image';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';
import { CASES, CASE_PHOTO_HEIGHT, CASE_PHOTO_WIDTH } from '@/lib/content/cases';

// Copy reciclado literalmente de CaseStudiesSection (que sale de la home:
// queda superada por BrandProofStrip + este carrusel). El componente se
// conserva por si hace falta revertir en un commit.
const SECTION_COPY: Record<Lang, { eyebrow: string; title: string }> = {
  es: {
    eyebrow: 'Resultados',
    title: 'Negocios que pasaron de\ninvisibles a encontrados.',
  },
  en: {
    eyebrow: 'Results',
    title: 'Businesses that went from\ninvisible to found.',
  },
};


/**
 * Carrusel horizontal pinneado — un panel a pantalla completa por cliente.
 * `data-pin-track` (motor en ScrollAnimations.tsx) lo pinnea SOLO en
 * desktop y desliza `.work-track` con transform: x, ligado al scroll
 * vertical. En móvil el mismo markup es un `overflow-x: auto` nativo con
 * scroll-snap — cero JS, ver globals.css.
 *
 * Es el único `pin` de todo el sitio (regla del plan de rediseño): cada
 * pin añade un spacer y recalcula los triggers posteriores, así que no se
 * repite el patrón en ningún otro sitio.
 */
export default function WorkShowcase() {
  const { lang } = useLang();
  const copy = SECTION_COPY[lang];

  return (
    <section className="work-showcase" data-pin-track>
      <div className="work-showcase-header section-container">
        <p className="eyebrow" data-animate="fade">{copy.eyebrow}</p>
        <h2 className="section-title" data-animate="title" style={{ whiteSpace: 'pre-line' }}>
          {copy.title}
        </h2>
        <div className="gold-divider" data-animate="divider" />
      </div>

      <div className="work-track" data-pin-track-inner>
        {CASES.map((item, i) => {
          const t = item.i18n[lang];
          return (
            <article
              key={item.slug}
              className={`work-panel${i % 2 === 1 ? ' is-alt' : ''}`}
              // --i alimenta la rotación del abanico en teléfono (ver el bloque
              // max-width:899px de globals.css). En escritorio no se usa.
              style={{ '--i': i } as React.CSSProperties}
            >
              <div className="section-container work-panel-inner">
                <div className="work-panel-copy">
                  <span className="work-panel-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="work-panel-name">{item.name}</h3>
                  <p className="work-panel-industry">{t.industry}</p>
                  <p className="work-panel-result">{t.result}</p>
                  <p className="work-panel-scope">{t.scope}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-panel-cta"
                  >
                    {lang === 'es' ? 'Ver sitio' : 'View site'} <span aria-hidden="true">→</span>
                  </a>
                </div>

                <div className="work-panel-frame browser-frame" data-animate="clip-reveal">
                  <div className="browser-bar"><span /><span /><span /></div>
                  <Image
                    src={item.photos[0]}
                    alt={lang === 'es' ? `Trabajo para ${item.name}` : `Work for ${item.name}`}
                    width={CASE_PHOTO_WIDTH}
                    height={CASE_PHOTO_HEIGHT}
                    sizes="(max-width: 899px) 92vw, 640px"
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
