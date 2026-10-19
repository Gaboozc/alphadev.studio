'use client';

import SiteLink from '@/components/SiteLink';
import CTASection from '@/components/CTASection';
import { fichaPorSlug } from '@/lib/content/demos';
import { useLang } from '@/lib/i18n/LanguageContext';

export default function FichaContent({ slug }: { slug: string }) {
  const { lang } = useLang();
  const ficha = fichaPorSlug(slug);
  if (!ficha) return null;
  const es = lang === 'es';

  return (
    <main style={{ background: 'var(--bg)' }}>
      <section className="page-hero pt-36 pb-16" style={{ background: 'var(--bg)' }}>
        <div className="section-container">
          <div className="hero-copy">
            <p className="eyebrow" data-animate="fade">
              {ficha.sector[lang]}
            </p>
            <h1 className="section-title" data-animate="title">
              {ficha.name}
            </h1>
            <div className="gold-divider" data-animate="divider" />
            <p className="section-subtitle hero-sub" data-animate="subtitle">
              {ficha.problema[lang]}
            </p>
            <div className="hero-cta" data-animate="fade">
              <a href={ficha.url} target="_blank" rel="noopener noreferrer" className="btn-glow inline-flex">
                {es ? `Probar ${ficha.name}` : `Try ${ficha.name}`}
              </a>
            </div>
            <p style={{ color: 'var(--text-subtle)', fontSize: '0.85rem', marginTop: '1rem' }}>
              {es
                ? `${ficha.name} es una empresa ficticia. Entras con cualquier correo y contraseña; nada de lo que hagas se guarda.`
                : `${ficha.name} is a fictional company. Sign in with any email and password; nothing you do is saved.`}
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad-after-hero" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
        <div className="section-container">
          <p className="eyebrow">{es ? 'Qué hace' : 'What it does'}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginTop: '1.5rem' }}>
            {ficha.modulos.map((m) => (
              <article key={m.nombre.es} className="service-card">
                <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.3rem', margin: 0, position: 'relative', zIndex: 1 }}>{m.nombre[lang]}</h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.65, margin: 0, position: 'relative', zIndex: 1 }}>{m.texto[lang]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-after-hero" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="section-container" style={{ maxWidth: '48rem' }}>
          <p className="eyebrow">{es ? 'Cómo se hizo' : 'How it was built'}</p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '1rem' }}>{ficha.destacado[lang]}</p>
          <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: '1.1rem', marginTop: '1.25rem' }}>
            <li>
              {es
                ? 'Los cuatro demos son una sola aplicación (Next.js y Python en Vercel) que cambia de marca según el subdominio.'
                : 'All four demos are a single application (Next.js and Python on Vercel) that switches brand by subdomain.'}
            </li>
            <li>
              {es
                ? 'La IA está grabada, para que probarlo no cueste: con tus datos, responde con un modelo real sobre tus propios documentos.'
                : 'The AI is recorded, so trying it costs nothing: with your data, it answers with a real model over your own documents.'}
            </li>
            <li>
              {es
                ? 'No se guarda nada de quien prueba: la sesión y los cambios viven solo en su pestaña y se borran al cerrarla. Solo se cuenta, de forma anónima, que alguien entró.'
                : 'Nothing about whoever tries it is stored: the session and changes live only in their tab and vanish when it closes. Only an anonymous count that someone visited is kept.'}
            </li>
            <li>
              {es
                ? 'Todos los datos son ficticios y las reglas de negocio están probadas con pruebas automáticas.'
                : 'All data is fictional and the business rules are covered by automated tests.'}
            </li>
          </ul>
          <p style={{ marginTop: '2rem' }}>
            <SiteLink href="/contacto" className="btn-glow inline-flex">
              {es ? 'Quiero algo así para mi negocio' : 'I want something like this for my business'}
            </SiteLink>
          </p>
          <p style={{ marginTop: '1rem' }}>
            <SiteLink href="/demos" className="underline">
              {es ? '← Ver los cuatro demos' : '← See all four demos'}
            </SiteLink>
          </p>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
