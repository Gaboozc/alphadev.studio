import { confirmarCompra } from '@/lib/compra';
import type { Lang } from '@/lib/i18n';

const COPY: Record<
  Lang,
  { titulo: string; cuerpo: string; boton: string; correo: string; error: string; sinDatos: string }
> = {
  es: {
    titulo: '¡Gracias por tu compra!',
    cuerpo: 'Tu guía ya está lista.',
    boton: 'Descargar mi guía',
    correo: 'También te la mandamos por correo, por si prefieres guardarla desde ahí.',
    error: 'No pudimos confirmar tu pago. Si PayPal ya te cobró, escríbenos y lo resolvemos.',
    sinDatos: 'Nos falta información para confirmar tu compra. Si acabas de pagar, revisa tu correo.',
  },
  en: {
    titulo: 'Thanks for your purchase!',
    cuerpo: 'Your guide is ready.',
    boton: 'Download my guide',
    correo: "We also emailed it to you, in case you'd rather save it from there.",
    error: "We couldn't confirm your payment. If PayPal already charged you, write to us and we'll sort it out.",
    sinDatos: "We're missing information to confirm your purchase. If you just paid, check your email.",
  },
};

// Recibe `token` (el id de la orden de PayPal, que PayPal agrega al volver
// del checkout) por query string. Sin él no hay nada que confirmar: alguien
// llegó aquí sin pasar por el pago.
export default async function GraciasContent({ lang, orderId }: { lang: Lang; orderId: string | undefined }) {
  const copy = COPY[lang];

  if (!orderId) {
    return (
      <main className="recurso-gracias">
        <p className="section-subtitle">{copy.sinDatos}</p>
      </main>
    );
  }

  // Envuelto a propósito: alguien que acaba de pagar no debería ver la
  // pantalla genérica de "se nos rompió algo" del sitio por una falla de
  // configuración o de red — su plata ya se movió, así que la respuesta
  // aquí tiene que seguir siendo la de este flujo, con el aviso de que
  // escriba si PayPal ya le cobró.
  let resultado;
  try {
    resultado = await confirmarCompra(orderId);
  } catch (e) {
    console.error('[recursos/gracias] fallo inesperado confirmando la compra:', e);
    resultado = { ok: false as const };
  }

  if (!resultado.ok) {
    return (
      <main className="recurso-gracias">
        <p className="section-subtitle">{copy.error}</p>
      </main>
    );
  }

  return (
    <main className="recurso-gracias">
      <p className="eyebrow">{copy.titulo}</p>
      <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)' }}>{copy.cuerpo}</h1>
      <div className="gold-divider" />
      <a href={`/recursos/descargar/${resultado.token}`} className="btn-glow inline-flex" style={{ marginTop: '1.5rem' }}>
        {copy.boton}
      </a>
      <p style={{ marginTop: '1.5rem', fontSize: '0.8125rem', color: 'var(--text-subtle)' }}>{copy.correo}</p>
    </main>
  );
}
