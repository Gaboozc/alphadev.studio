'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import CTASection from '@/components/CTASection';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';
import { CASES, CASE_PHOTO_HEIGHT, CASE_PHOTO_WIDTH } from '@/lib/content/cases';

type LightboxState = { photos: string[]; index: number; title: string };

function Lightbox({ state, onClose, onChange, lang }: {
  state: LightboxState;
  onClose: () => void;
  onChange: (index: number) => void;
  lang: Lang;
}) {
  const { photos, index, title } = state;
  const total = photos.length;
  const go = (dir: number) => onChange((index + dir + total) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="lightbox-close" onClick={onClose} aria-label={lang === 'es' ? 'Cerrar' : 'Close'}>✕</button>
      {total > 1 && (
        <button type="button" className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label={lang === 'es' ? 'Anterior' : 'Previous'}>‹</button>
      )}
      <Image
        className="lightbox-img"
        src={photos[index]}
        alt={`${title} — ${index + 1}/${total}`}
        width={CASE_PHOTO_WIDTH}
        height={CASE_PHOTO_HEIGHT}
        sizes="(max-width: 1199px) 92vw, 1100px"
        onClick={(e) => e.stopPropagation()}
      />
      {total > 1 && (
        <button type="button" className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label={lang === 'es' ? 'Siguiente' : 'Next'}>›</button>
      )}
      <div className="lightbox-caption" onClick={(e) => e.stopPropagation()}>
        {title} · {index + 1}/{total}
      </div>
    </div>
  );
}

export default function PortafolioContent() {
  const { dict, lang } = useLang();
  const p = dict.portfolio;
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  return (
    <main style={{ background: 'var(--bg)' }}>
      <section className="page-hero pt-36 pb-20" style={{ background: 'var(--bg)' }}>
        <div className="section-container">
          <div className="hero-showcase-grid">
            <div className="hero-copy">
              <p className="eyebrow" data-animate="fade">
                {lang === 'es' ? 'Resultados' : 'Results'}
              </p>
              <h1 className="section-title" data-animate="title">{p.title}</h1>
              <div className="gold-divider" data-animate="divider" />
              <p className="section-subtitle hero-sub" data-animate="subtitle">{p.subtitle}</p>
            </div>
            <div className="hero-visual" data-animate="fade">
              <div className="browser-frame browser-float">
                <div className="browser-bar"><span /><span /><span /></div>
                <Image
                  src="/assets/cases/the-latin-grill-1.png"
                  alt={lang === 'es' ? 'Sitio de cliente hecho por AlphaDev' : 'Client site built by AlphaDev'}
                  width={CASE_PHOTO_WIDTH}
                  height={CASE_PHOTO_HEIGHT}
                  sizes="(max-width: 899px) 100vw, 620px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Una sección full-bleed por cliente: el nombre queda sticky a la
          izquierda mientras la galería completa pasa a la derecha — el
          trabajo real es el protagonista, no una tarjeta de un tercio. */}
      {CASES.map((item, index) => {
        const t = item.i18n[lang];
        const project = p.items[index];
        return (
          <section
            key={item.slug}
            className="portfolio-client"
            style={{ background: index % 2 === 0 ? 'var(--bg-alt)' : 'var(--bg)' }}
          >
            <div className="section-container">
              <div className="sticky-stack">
                <div className="sticky-stack-header">
                  <p className="portfolio-client-industry" data-animate="fade">{t.industry}</p>
                  <h2 className="portfolio-client-name" data-animate="title">{item.name}</h2>
                  <p className="portfolio-client-result" data-animate="subtitle">
                    {project?.description ?? t.result}
                  </p>
                  <div className="portfolio-client-tags" data-animate="fade">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{ background: 'var(--gold-bg)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-client-link"
                      data-animate="fade"
                    >
                      {lang === 'es' ? 'Ver sitio' : 'View site'} <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>

                {item.photos.length > 0 ? (
                  <div className="portfolio-gallery" data-animate="stagger">
                    {item.photos.map((photo, photoIndex) => (
                      <button
                        key={photo}
                        type="button"
                        className="case-thumb"
                        data-animate="clip-reveal"
                        onClick={() => setLightbox({ photos: item.photos, index: photoIndex, title: item.name })}
                        aria-label={lang === 'es' ? `Ver ${item.name}, foto ${photoIndex + 1}` : `View ${item.name}, photo ${photoIndex + 1}`}
                      >
                        <Image
                          src={photo}
                          alt={lang === 'es' ? `Trabajo realizado para ${item.name}` : `Work delivered for ${item.name}`}
                          fill
                          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 460px"
                        />
                        <span className="case-thumb-overlay">{lang === 'es' ? 'Ver galería' : 'View gallery'}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="case-thumb">
                    <span className="case-thumb-empty">{lang === 'es' ? 'Galería próximamente' : 'Gallery coming soon'}</span>
                  </span>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <CTASection />

      {lightbox && (
        <Lightbox
          state={lightbox}
          lang={lang}
          onClose={() => setLightbox(null)}
          onChange={(i) => setLightbox((s) => (s ? { ...s, index: i } : s))}
        />
      )}
    </main>
  );
}
