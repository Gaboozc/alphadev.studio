'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import CTASection from '@/components/CTASection';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';
import { CASES, CASE_PHOTO_HEIGHT, CASE_PHOTO_WIDTH } from '@/lib/content/cases';

type LightboxState = { photos: string[]; index: number; title: string };

type CaseCardProps = {
  index: number;
  title: string;
  type: string;
  description: string;
  tags: string[];
  url: string;
  photos: string[];
  lang: Lang;
  onOpen: (state: LightboxState) => void;
};

function CaseCard({ index, title, type, description, tags, url, photos, lang, onOpen }: CaseCardProps) {
  const cover = photos[0];
  const count = photos.length;

  return (
    <article className="case-detail-card" data-animate="fade" style={{ animationDelay: `${index * 0.06}s` }}>
      {count > 0 ? (
        <button
          type="button"
          className="case-thumb"
          onClick={() => onOpen({ photos, index: 0, title })}
          aria-label={lang === 'es' ? `Ver galería de ${title}` : `View gallery of ${title}`}
        >
          <Image
            src={cover}
            alt={lang === 'es' ? `Trabajo realizado para ${title}` : `Work delivered for ${title}`}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 400px"
          />
          <span className="case-thumb-overlay">{lang === 'es' ? 'Ver galería' : 'View gallery'}</span>
          <span className="case-thumb-count">▦ {count}</span>
        </button>
      ) : (
        <span className="case-thumb">
          <span className="case-thumb-empty">{lang === 'es' ? 'Galería próximamente' : 'Gallery coming soon'}</span>
        </span>
      )}

      <div className="case-detail-body">
        <h3 className="text-lg mb-1" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'var(--text)' }}>
          {title}
        </h3>
        <p className="text-xs font-semibold mb-3" style={{ color: 'var(--gold)', fontFamily: 'var(--font-inter)' }}>
          {type}
        </p>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-muted)', flex: 1 }}>
          {description}
        </p>
        <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full"
              style={{ background: 'var(--gold-bg)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}
            >
              {tag}
            </span>
          ))}
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold mt-5 transition-opacity hover:opacity-70"
            style={{ color: 'var(--gold)', fontFamily: 'var(--font-inter)' }}
          >
            {lang === 'es' ? 'Ver sitio' : 'View site'} <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </article>
  );
}

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

      <section className="section-pad-after-hero" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-animate="stagger">
            {p.items.map((project, index) => {
              const item = CASES[index];
              return (
                <CaseCard
                  key={index}
                  index={index}
                  title={project.title}
                  type={project.type}
                  description={project.description}
                  tags={item?.i18n[lang].tags ?? []}
                  url={item?.url ?? ''}
                  photos={item?.photos ?? []}
                  lang={lang}
                  onOpen={setLightbox}
                />
              );
            })}
          </div>
        </div>
      </section>

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
