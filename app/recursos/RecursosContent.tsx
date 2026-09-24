import Link from 'next/link';
import CTASection from '@/components/CTASection';
import { listarGuiasPublicadas, tituloDeGuia, descripcionDeGuia } from '@/lib/guias';
import { localizedPath } from '@/lib/i18n/routes';
import type { Lang } from '@/lib/i18n';

// Componente de SERVIDOR, sin useLang(): el idioma ya se sabe por la ruta
// que llamó a esto (/recursos o /en/recursos), así que no hace falta el
// contexto de cliente para elegir el copy. Ver lib/i18n/routes.ts.

const COPY: Record<Lang, { eyebrow: string; title: string; subtitle: string; vacio: string }> = {
  es: {
    eyebrow: 'Recursos',
    title: 'Guías para hacer crecer\ntu negocio en línea.',
    subtitle: 'Pago único, descarga inmediata. Sin suscripción, sin cuenta que crear.',
    vacio: 'Todavía no hay guías publicadas. Vuelve pronto.',
  },
  en: {
    eyebrow: 'Resources',
    title: 'Guides to grow\nyour business online.',
    subtitle: 'One-time payment, instant download. No subscription, no account needed.',
    vacio: 'No guides published yet. Check back soon.',
  },
};

function precio(cents: number): string {
  return `US$${(cents / 100).toFixed(2)}`;
}

export default async function RecursosContent({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const guias = await listarGuiasPublicadas();

  return (
    <main style={{ background: 'var(--bg)' }}>
      <section className="page-hero pt-36 pb-16" style={{ background: 'var(--bg)' }}>
        <div className="section-container">
          <div className="section-header">
            <p className="eyebrow" data-animate="fade">{copy.eyebrow}</p>
            <h1 className="section-title" data-animate="title" style={{ whiteSpace: 'pre-line' }}>
              {copy.title}
            </h1>
            <div className="gold-divider" data-animate="divider" />
            <p className="section-subtitle" data-animate="subtitle">{copy.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="section-pad-after-hero" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
        <div className="section-container">
          {guias.length === 0 ? (
            <p className="recurso-vacio">{copy.vacio}</p>
          ) : (
            <div className="recursos-gallery" data-animate="stagger">
              {guias.map((g) => (
                <Link key={g.id} href={localizedPath(`/recursos/${g.slug}`, lang)} className="recurso-card">
                  {g.portada ? (
                    // <img> normal, no next/image: la portada es una URL que
                    // el admin pega a mano en el panel — cualquier dominio,
                    // no una lista cerrada que quepa en remotePatterns.
                    <div className="recurso-card-media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={g.portada} alt="" loading="lazy" />
                    </div>
                  ) : (
                    <div className="recurso-card-media is-vacio" aria-hidden="true" />
                  )}
                  <div className="recurso-card-body">
                    <h3 className="recurso-card-title">{tituloDeGuia(g, lang)}</h3>
                    <p className="recurso-card-desc">{descripcionDeGuia(g, lang)}</p>
                    <p className="recurso-card-precio">{precio(g.precio_cents)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
