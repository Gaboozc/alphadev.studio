'use client';

import Link from 'next/link';
import CTASection from '@/components/CTASection';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';

const SERVICE_ICONS = ['✦', '◉', '★', '◈', '◻'];

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
      <section className="pt-36 pb-20 text-center" style={{ background: 'var(--bg)' }}>
        <div className="section-container">
          <p className="eyebrow" data-animate="fade">
            {lang === 'es' ? 'Servicios' : 'Services'}
          </p>
          <h1 className="section-title mb-3" data-animate="title" style={{ whiteSpace: 'pre-line' }}>
            {copy.title}
          </h1>
          <div className="gold-divider" data-animate="divider" />
          <p className="section-subtitle mt-4" data-animate="subtitle">{copy.subtitle}</p>
        </div>
      </section>

      {/* Services grid */}
      <section className="pb-24" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
        <div className="section-container pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-animate="stagger">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 border transition-all duration-200"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-hover)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(154,114,53,0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <div className="text-3xl mb-4" style={{ color: 'var(--gold)' }}>
                  {SERVICE_ICONS[index]}
                </div>
                <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'var(--text)' }}>
                  {service.title}
                </h3>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/contacto" className="btn-glow inline-flex">
              {lang === 'es' ? 'Quiero mi llamada' : 'I want my call'}
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
