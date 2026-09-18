'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Lang } from '@/lib/i18n';
import { TEMPLATES } from '@/lib/content/templates';

/**
 * Visor expandido de una plantilla.
 *
 * No reusa el Lightbox de /portafolio: aquel centra una foto de 1200x750 fija
 * y la ajusta a la pantalla. Acá la imagen es la página entera —de 2.700 a
 * 5.400px de alto— y la gracia es recorrerla, así que se muestra a ancho
 * completo dentro de un contenedor que scrollea. En un teléfono eso es lo más
 * parecido a navegar el sitio que se puede dar sin desplegarlo.
 */
export default function TemplateViewer({
  index,
  onClose,
  onChange,
  lang,
}: {
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
  lang: Lang;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const total = TEMPLATES.length;
  const item = TEMPLATES[index];
  const t = item.i18n[lang];

  useEffect(() => {
    const go = (dir: number) => onChange((index + dir + total) % total);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    // El overlay se lleva el scroll; sin esto la página de atrás se mueve
    // debajo mientras se recorre la plantilla.
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [index, total, onChange, onClose]);

  // Al cambiar de plantilla, volver arriba: si no, se entra a la siguiente a
  // mitad de página.
  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0 });
  }, [index]);

  const go = (dir: number) => onChange((index + dir + total) % total);

  return (
    <div className="tpl-viewer" role="dialog" aria-modal="true" aria-label={t.industry}>
      <header className="tpl-viewer-bar">
        <div className="tpl-viewer-meta">
          <span className="tpl-viewer-industry">{t.industry}</span>
          <span className="tpl-viewer-hint">
            {lang === 'es' ? 'Desliza para ver la página completa' : 'Scroll to see the full page'}
          </span>
        </div>

        <div className="tpl-viewer-actions">
          <button
            type="button"
            className="tpl-viewer-btn"
            onClick={() => go(-1)}
            aria-label={lang === 'es' ? 'Plantilla anterior' : 'Previous template'}
          >
            ‹
          </button>
          <span className="tpl-viewer-count">{index + 1}/{total}</span>
          <button
            type="button"
            className="tpl-viewer-btn"
            onClick={() => go(1)}
            aria-label={lang === 'es' ? 'Plantilla siguiente' : 'Next template'}
          >
            ›
          </button>
          <button
            type="button"
            className="tpl-viewer-btn tpl-viewer-close"
            onClick={onClose}
            aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
          >
            ✕
          </button>
        </div>
      </header>

      <div className="tpl-viewer-scroll" ref={scrollerRef}>
        <Image
          className="tpl-viewer-img"
          src={item.full.src}
          alt={
            lang === 'es'
              ? `Plantilla completa para ${t.industry}`
              : `Full template page for ${t.industry}`
          }
          width={item.full.width}
          height={item.full.height}
          sizes="(max-width: 1099px) 100vw, 1000px"
          priority
        />
      </div>
    </div>
  );
}
