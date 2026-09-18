'use client';

import Link from 'next/link';
import Image from 'next/image';
import CTASection from '@/components/CTASection';
import TemplatesSection from '@/components/TemplatesSection';

import { useLang } from '@/lib/i18n/LanguageContext';
import { CASES, CASE_PHOTO_HEIGHT, CASE_PHOTO_WIDTH } from '@/lib/content/cases';
import type { Lang } from '@/lib/i18n';

// Mismo orden que SERVICES.
const SERVICE_IMAGES: string[] = [
  '/assets/secciones/serv-presencia.webp',
  '/assets/secciones/serv-redes.webp',
  '/assets/secciones/serv-publicidad.webp',
  '/assets/secciones/serv-google.webp',
  '/assets/secciones/serv-sitio.webp',
];


type ServiceDetail = { title: string; description: string; details: string[] };

const SERVICES: Record<Lang, ServiceDetail[]> = {
  es: [
    {
      title: 'Presencia desde cero',
      description: '¿Empiezas de la nada? Te creamos todo: marca, logo, sitio web y perfiles sociales. Sales a internet con una imagen profesional completa.',
      details: [
        'Diseño de logo e identidad visual',
        'Sitio web profesional y responsivo',
        'Configuración de redes sociales',
        'Perfil de Google Business',
        'Guía de uso de la marca',
      ],
    },
    {
      title: 'Manejo de redes sociales',
      description: 'Nos encargamos de tus redes: contenido, publicaciones, respuestas. Tu marca activa y creciendo, sin que muevas un dedo.',
      details: [
        'Calendario editorial mensual',
        'Diseño de contenido original',
        'Publicaciones en Instagram, Facebook y TikTok',
        'Respuesta a comentarios y mensajes',
        'Reporte de crecimiento mensual',
      ],
    },
    {
      title: 'Publicidad que vende',
      description: 'Campañas en Google y redes sociales diseñadas para traer clientes reales, no solo "likes". Medimos cada peso invertido.',
      details: [
        'Campaña de Google Ads',
        'Campaña de Meta Ads (Facebook e Instagram)',
        'Segmentación de audiencia',
        'Optimización continua',
        'Reporte de resultados claro',
      ],
    },
    {
      title: 'Aparece en Google',
      description: 'Optimizamos tu perfil de Google para que aparezcas en el mapa y en las búsquedas cuando alguien necesite lo que ofreces.',
      details: [
        'Creación y verificación del perfil',
        'Optimización de descripción y categorías',
        'Carga de fotos y horarios',
        'Estrategia para conseguir reseñas',
        'Monitoreo de posición en búsquedas',
      ],
    },
    {
      title: 'Sitio web profesional',
      description: 'Una página que carga rápido, se ve increíble en el celular, y convierte visitantes en clientes.',
      details: [
        'Diseño personalizado a tu marca',
        'Optimizado para celulares',
        'Carga rápida',
        'Formulario de contacto',
        'Integración con WhatsApp',
      ],
    },
  ],
  en: [
    {
      title: 'Presence from scratch',
      description: "Starting from zero? We build everything: brand, logo, website, and social profiles. You launch online with a complete, professional image.",
      details: [
        'Logo and visual identity design',
        'Professional, responsive website',
        'Social media setup',
        'Google Business Profile',
        'Brand usage guide',
      ],
    },
    {
      title: 'Social media management',
      description: "We handle your social media: content, posts, responses. Your brand stays active and growing without you lifting a finger.",
      details: [
        'Monthly editorial calendar',
        'Original content design',
        'Posts on Instagram, Facebook, and TikTok',
        'Comment and message responses',
        'Monthly growth report',
      ],
    },
    {
      title: 'Advertising that sells',
      description: "Campaigns on Google and social media designed to bring real customers, not just 'likes'. We track every dollar spent.",
      details: [
        'Google Ads campaign',
        'Meta Ads campaign (Facebook & Instagram)',
        'Audience targeting',
        'Continuous optimization',
        'Clear results report',
      ],
    },
    {
      title: 'Show up on Google',
      description: "We optimize your Google profile so you appear on the map and in searches when someone needs what you offer.",
      details: [
        'Profile creation and verification',
        'Description and category optimization',
        'Photos and hours upload',
        'Review acquisition strategy',
        'Search position monitoring',
      ],
    },
    {
      title: 'Professional website',
      description: "A page that loads fast, looks amazing on mobile, and turns visitors into customers.",
      details: [
        'Custom design for your brand',
        'Mobile-optimized',
        'Fast loading',
        'Contact form',
        'WhatsApp integration',
      ],
    },
  ],
};

const PAGE_COPY: Record<Lang, { title: string; subtitle: string }> = {
  es: {
    title: 'Todo lo que tu negocio\nnecesita para brillar online.',
    subtitle: 'Servicios concretos, resultados medibles. Sin paquetes genéricos.',
  },
  en: {
    title: 'Everything your business\nneeds to shine online.',
    subtitle: 'Concrete services, measurable results. No generic packages.',
  },
};

export default function ServiciosContent() {
  const { lang } = useLang();
  const services = SERVICES[lang];
  const copy = PAGE_COPY[lang];

  return (
    <main style={{ background: 'var(--bg)' }}>
      {/* Page hero */}
      <section className="page-hero pt-36 pb-20" style={{ background: 'var(--bg)' }}>
        <div className="section-container">
          <div className="hero-showcase-grid">
            <div className="hero-copy">
              <p className="eyebrow" data-animate="fade">
                {lang === 'es' ? 'Servicios' : 'Services'}
              </p>
              <h1 className="section-title" data-animate="title" style={{ whiteSpace: 'pre-line' }}>
                {copy.title}
              </h1>
              <div className="gold-divider" data-animate="divider" />
              <p className="section-subtitle hero-sub" data-animate="subtitle">{copy.subtitle}</p>
              <div className="hero-cta" data-animate="fade">
                <Link href="/contacto" className="btn-glow inline-flex">
                  {lang === 'es' ? 'Quiero mi llamada' : 'I want my call'}
                </Link>
              </div>
            </div>
            <div className="hero-visual" data-animate="fade">
              {/* Abanico con los 3 clientes reales — antes era una sola
                  captura de Imperial que daba la impresión de que solo
                  existía ese proyecto. */}
              <div className="hero-case-stack" style={{ '--stack-last': CASES.length - 1 } as React.CSSProperties}>
                {CASES.map((item, index) => (
                  <div
                    key={item.slug}
                    className="browser-frame hero-case-stack-item"
                    style={{ '--i': index } as React.CSSProperties}
                  >
                    <div className="browser-bar"><span /><span /><span /></div>
                    <Image
                      src={item.photos[0]}
                      alt={lang === 'es' ? `Sitio de ${item.name} hecho por AlphaDev` : `${item.name} site built by AlphaDev`}
                      width={CASE_PHOTO_WIDTH}
                      height={CASE_PHOTO_HEIGHT}
                      sizes="(max-width: 899px) 100vw, 620px"
                      priority={index === CASES.length - 1}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-pad-after-hero" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
        <div className="section-container">
          {/* Filas alternadas: imagen a un lado, texto al otro, y se invierte
              en cada fila. Antes era una grilla de 3 columnas donde cada
              tarjeta medía distinto según cuántas pruebas colgaran de ella
              — una con cliente y plantilla, otra con nada— y el escalonado
              se leía como desorden. */}
          <div className="service-rows" data-animate="stagger">
            {services.map((service, index) => (
              <article key={index} className="service-row">
                <div className="service-row-media">
                  <Image
                    src={SERVICE_IMAGES[index]}
                    alt=""
                    width={900}
                    height={562}
                    sizes="(max-width: 899px) 100vw, 50vw"
                  />
                </div>

                <div className="service-row-copy">
                  <h3 className="service-row-title">{service.title}</h3>
                  <p className="service-row-desc">{service.description}</p>
                  <ul className="service-row-list">
                    {service.details.map((detail, i) => (
                      <li key={i}>
                        <span aria-hidden="true">✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/contacto" className="btn-glow inline-flex">
              {lang === 'es' ? 'Quiero mi llamada' : 'I want my call'}
            </Link>
          </div>
        </div>
      </section>

      <TemplatesSection />

      <CTASection />
    </main>
  );
}
