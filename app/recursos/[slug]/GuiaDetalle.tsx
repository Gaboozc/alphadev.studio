import { descripcionDeGuia, tituloDeGuia, type Guia } from '@/lib/guias';
import { iniciarCompra } from '../actions';
import type { Lang } from '@/lib/i18n';

const COPY: Record<Lang, { eyebrow: string; comprar: string; nota: string }> = {
  es: {
    eyebrow: 'Guía',
    comprar: 'Comprar ahora',
    nota: 'Pago único en USD, vía PayPal. Descarga inmediata y también te la mandamos por correo.',
  },
  en: {
    eyebrow: 'Guide',
    comprar: 'Buy now',
    nota: 'One-time payment in USD, via PayPal. Instant download, and we also email it to you.',
  },
};

function precio(cents: number): string {
  return `US$${(cents / 100).toFixed(2)}`;
}

// Componente de SERVIDOR: el formulario de compra llama a un Server Action
// directamente, sin necesitar 'use client' — el idioma llega como prop
// desde la ruta (/recursos vs /en/recursos), no de un contexto de cliente.
export default function GuiaDetalle({ guia, lang }: { guia: Guia; lang: Lang }) {
  const copy = COPY[lang];

  return (
    <main style={{ background: 'var(--bg)' }}>
      <section className="page-hero pt-36 pb-20" style={{ background: 'var(--bg)' }}>
        <div className="section-container">
          <div className="recurso-detalle">
            {guia.portada ? (
              <div className="recurso-detalle-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={guia.portada} alt="" />
              </div>
            ) : (
              <div className="recurso-detalle-media is-vacio" aria-hidden="true" />
            )}

            <div>
              <p className="eyebrow" data-animate="fade">{copy.eyebrow}</p>
              <h1 className="section-title" data-animate="title">{tituloDeGuia(guia, lang)}</h1>
              <p className="recurso-detalle-desc" data-animate="subtitle">{descripcionDeGuia(guia, lang)}</p>
              <p className="recurso-detalle-precio">{precio(guia.precio_cents)}</p>

              <form action={iniciarCompra}>
                <input type="hidden" name="guiaId" value={guia.id} />
                <input type="hidden" name="slug" value={guia.slug} />
                <input type="hidden" name="lang" value={lang} />
                <button type="submit" className="btn-glow inline-flex">{copy.comprar}</button>
              </form>

              <p style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--text-subtle)' }}>
                {copy.nota}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
