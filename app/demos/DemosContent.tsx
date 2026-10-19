'use client';

import SiteLink from '@/components/SiteLink';
import CTASection from '@/components/CTASection';
import { useLang } from '@/lib/i18n/LanguageContext';

// Cada demo es una empresa ficticia con un producto que funciona. Si `url` es
// null, la tarjeta muestra «Próximamente».
const DEMOS = [
  {
    slug: 'ambar',
    ficha: 'ambar-grill',
    name: 'Ámbar Grill',
    url: 'https://ambar.demo.alphadev.studio',
    es: {
      sector: 'Restaurantes',
      pitch: 'Una cadena de varios locales en dos países, con compras por WhatsApp y cero visibilidad desde la sede. Ahora lo ve todo en un solo panel.',
      modules: ['Directorio de proveedores', 'Inventario con stock calculado', 'Ventas por local', 'Pronóstico de ventas', 'Asistente de cocina'],
    },
    en: {
      sector: 'Restaurants',
      pitch: 'A multi-location chain across two countries, buying over WhatsApp with no visibility from headquarters. Now it sees everything in one dashboard.',
      modules: ['Supplier directory', 'Inventory with computed stock', 'Sales by location', 'Sales forecast', 'Kitchen assistant'],
    },
  },
  {
    slug: 'cometa',
    ficha: 'cometa-cargo',
    name: 'Cometa Cargo',
    url: 'https://cometa.demo.alphadev.studio',
    es: {
      sector: 'Logística',
      pitch: 'Envíos que se retrasan, transportistas que no avisan y devoluciones sin dueño. Un solo lugar para ver qué se atoró y por qué.',
      modules: ['Incidencias de envío', 'Transportistas', 'Devoluciones', 'Seguimiento de envíos'],
    },
    en: {
      sector: 'Logistics',
      pitch: 'Late shipments, carriers that never call, and returns nobody owns. One place to see what got stuck and why.',
      modules: ['Shipment incidents', 'Carriers', 'Returns', 'Shipment tracking'],
    },
  },
  {
    slug: 'celeste',
    ficha: 'celeste-clinic',
    name: 'Celeste Clinic',
    url: 'https://celeste.demo.alphadev.studio',
    es: {
      sector: 'Clínicas',
      pitch: 'Reservas que se pierden, insumos que se agotan sin aviso y protocolos que nadie encuentra a tiempo.',
      modules: ['Reservas y recordatorios', 'Insumos clínicos', 'Asistente de protocolos', 'Seguridad'],
    },
    en: {
      sector: 'Clinics',
      pitch: 'Bookings that slip through, supplies that run out unannounced, and protocols nobody can find in time.',
      modules: ['Bookings and reminders', 'Clinical supplies', 'Protocol assistant', 'Security'],
    },
  },
  {
    slug: 'mentora',
    ficha: 'mentora-talent',
    name: 'Mentora Talent',
    url: 'https://mentora.demo.alphadev.studio',
    es: {
      sector: 'Talento y consultoría',
      pitch: 'Cientos de candidatos y respuestas a licitaciones que se arman desde cero cada vez. Aquí se reutiliza lo que ya se sabe.',
      modules: ['Candidatos', 'Respuestas a RFP', 'Base de conocimiento', 'Herramientas MCP'],
    },
    en: {
      sector: 'Talent and consulting',
      pitch: 'Hundreds of candidates and RFP responses rebuilt from scratch every time. Here, what the team already knows gets reused.',
      modules: ['Candidates', 'RFP responses', 'Knowledge base', 'MCP tools'],
    },
  },
] as const;

export default function DemosContent() {
  const { lang } = useLang();
  const es = lang === 'es';

  return (
    <main style={{ background: 'var(--bg)' }}>
      <section className="page-hero pt-36 pb-16" style={{ background: 'var(--bg)' }}>
        <div className="section-container">
          <div className="hero-copy">
          <p className="eyebrow" data-animate="fade">
            Demos
          </p>
          <h1 className="section-title" data-animate="title">
            {es ? 'Pruébalo antes de hablar con nosotros.' : 'Try it before you talk to us.'}
          </h1>
          <div className="gold-divider" data-animate="divider" />
          <p className="section-subtitle hero-sub" data-animate="subtitle">
            {es
              ? 'Cuatro productos con IA dentro, funcionando. Son empresas ficticias: entras con cualquier correo y contraseña, lo que hagas no se guarda y se borra al salir. Así ves cómo se sentiría con tu negocio.'
              : 'Four working products with AI built in. They are fictional companies: sign in with any email and password, nothing you do is saved, and it all disappears when you leave. So you can see how it would feel with your business.'}
          </p>
          </div>
        </div>
      </section>

      <section className="section-pad-after-hero" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEMOS.map((d) => {
              const t = es ? d.es : d.en;
              return (
                <article key={d.slug} className="service-card" data-animate="fade">
                  <p className="eyebrow" style={{ margin: 0 }}>{t.sector}</p>
                  <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.7rem', margin: 0, position: 'relative', zIndex: 1 }}>{d.name}</h2>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.65, margin: 0, position: 'relative', zIndex: 1 }}>{t.pitch}</p>
                  <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, margin: '0.25rem 0 0.5rem', paddingLeft: '1.1rem', position: 'relative', zIndex: 1 }}>
                    {t.modules.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 'auto', position: 'relative', zIndex: 1 }}>
                    {d.url ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                        <a href={d.url} target="_blank" rel="noopener noreferrer" className="btn-glow inline-flex">
                          {es ? `Probar ${d.name}` : `Try ${d.name}`}
                        </a>
                        <SiteLink href={`/demos/${d.ficha}`} className="underline" >
                          {es ? 'Ver cómo se hizo' : 'See how it was built'}
                        </SiteLink>
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-subtle)', fontSize: '0.875rem', fontWeight: 600 }}>
                        {es ? 'Próximamente' : 'Coming soon'}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <p style={{ color: 'var(--text-subtle)', fontSize: '0.85rem', marginTop: '2rem', maxWidth: '46rem' }}>
            {es ? (
              <>
                Las respuestas de IA en los demos están grabadas para que probarlos no cueste. En tu producto, la IA responde con tus propios datos.{' '}
                <SiteLink href="/contacto" className="underline">¿Quieres uno para tu negocio?</SiteLink>
              </>
            ) : (
              <>
                AI answers in the demos are recorded so trying them costs nothing. In your product, the AI answers from your own data.{' '}
                <SiteLink href="/contacto" className="underline">Want one for your business?</SiteLink>
              </>
            )}
          </p>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
