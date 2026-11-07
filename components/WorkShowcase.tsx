'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';
import { CASES, CASE_PHOTO_HEIGHT, CASE_PHOTO_WIDTH } from '@/lib/content/cases';

// Copy de sección: el motion spec sustituye el titular anterior
// ("Negocios que pasaron de invisibles a encontrados.") por uno más corto
// que cabe en el header del pin. Clientes y textos de cada tarjeta siguen
// saliendo de cases.ts — no se inventan métricas.
const SECTION_COPY: Record<Lang, { eyebrow: string; title: string; view: string; of: string }> = {
  es: {
    eyebrow: 'Resultados',
    title: 'Trabajo real, en línea.',
    view: 'Ver sitio',
    of: 'de',
  },
  en: {
    eyebrow: 'Results',
    title: 'Real work, online.',
    view: 'View site',
    of: 'of',
  },
};


/**
 * Carrusel horizontal pinneado — el ÚNICO pin del sitio.
 * `data-pin-track` (motor en ScrollAnimations.tsx) lo pinnea SOLO en
 * desktop y desliza `.work-track` con transform: x, ligado al scroll
 * vertical nativo (scrub 1, sin snap forzado). En móvil el mismo markup
 * es un `overflow-x: auto` nativo con scroll-snap — cero pin, ver globals.css.
 *
 * Cada pin añade un spacer y recalcula los triggers posteriores, así que no se
 * repite el patrón en ningún otro sitio.
 */
export default function WorkShowcase() {
  const { lang } = useLang();
  const copy = SECTION_COPY[lang];
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = CASES.length;
  const totalLabel = String(total).padStart(2, '0');

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const syncActive = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>('.work-panel'));
      if (!cards.length) return;
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const center = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };

    track.addEventListener('scroll', syncActive, { passive: true });
    syncActive();
    return () => track.removeEventListener('scroll', syncActive);
  }, []);

  function goToCard(index: number) {
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>('.work-panel')[index];
    if (!track || !card) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
      behavior: reduced ? 'auto' : 'smooth',
    });
  }

  return (
    <section className="work-showcase" data-pin-track data-section-theme="dark">
      <div className="work-showcase-header section-container">
        <p className="eyebrow" data-animate="fade">{copy.eyebrow}</p>
        {/* Sin splitWords: el titular del pin tiene que quedarse legible
            mientras la sección está fija; el reveal lo escondía detrás del nav. */}
        <h2 className="section-title">{copy.title}</h2>
        <div className="gold-divider" data-animate="divider" />
      </div>

      <div className="work-track" data-pin-track-inner ref={trackRef}>
        {CASES.map((item, i) => {
          const t = item.i18n[lang];
          return (
            <article
              key={item.slug}
              className="work-panel"
              // --i alimenta la rotación del abanico en teléfono (ver el bloque
              // max-width:899px de globals.css). En escritorio no se usa.
              style={{ '--i': i } as React.CSSProperties}
            >
              <div className="work-card">
                <div
                  className="work-card-media"
                  {...(i === 0 ? { 'data-animate': 'clip-reveal' } : {})}
                >
                  {/* data-pin-media: parallax de la captura dentro de la
                      timeline del pin, no un ScrollTrigger extra. El
                      clip-reveal de la primera va en el wrapper para no
                      pelear el transform. */}
                  <div className="work-card-media-shift" data-pin-media>
                    <Image
                      src={item.photos[0]}
                      alt={lang === 'es' ? `Trabajo para ${item.name}` : `Work for ${item.name}`}
                      width={CASE_PHOTO_WIDTH}
                      height={CASE_PHOTO_HEIGHT}
                      sizes="(max-width: 899px) 80vw, 69vw"
                    />
                  </div>
                </div>
                <div className="work-card-shade" aria-hidden="true" />
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
                    {copy.view} <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="work-progress">
        <div className="work-progress-track" aria-hidden="true">
          <div className="work-progress-bar" data-pin-progress />
        </div>
        <p
          className="work-progress-count"
          data-pin-count
          aria-live="polite"
        >
          01 / {totalLabel}
        </p>
      </div>

      <div className="work-dots" role="tablist" aria-label={copy.eyebrow}>
        {CASES.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            className={`work-dot${i === active ? ' is-active' : ''}`}
            aria-selected={i === active}
            aria-label={`${item.name}, ${String(i + 1).padStart(2, '0')} ${copy.of} ${totalLabel}`}
            onClick={() => goToCard(i)}
          />
        ))}
      </div>
    </section>
  );
}
