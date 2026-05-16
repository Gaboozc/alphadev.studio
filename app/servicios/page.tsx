import type { Metadata } from 'next';
import TrustSection from '@/components/TrustSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Servicios | AlphaDev Studios',
  description: 'Conoce nuestros servicios: desarrollo web, APIs, CRM, seguridad, optimización de bases de datos.',
};

export default function ServiciosPage() {
  const serviceDetails = [
    {
      icon: '🌐',
      title: 'Desarrollo Web Profesional',
      description: 'Creamos aplicaciones web modernas, responsive y de alto rendimiento.',
      details: [
        'Desarrollo con React y Next.js',
        'Diseño responsive y mobile-first',
        'Performance optimizado',
        'SEO técnico implementado',
        'Integración con herramientas modernas',
      ],
    },
    {
      icon: '⚡',
      title: 'APIs & Backend Escalable',
      description: 'Arquitectura backend robusta y escalable para sistemas empresariales.',
      details: [
        'APIs REST y GraphQL',
        'Microservicios',
        'Arquitectura escalable',
        'Integración de servicios',
        'Documentación API completa',
      ],
    },
    {
      icon: '💼',
      title: 'CRM y Sistemas Internos',
      description: 'Plataformas internas y sistemas de gestión personalizados.',
      details: [
        'Dashboards analíticos',
        'Gestión de clientes',
        'Automatización de procesos',
        'Reportes en tiempo real',
        'Integración ERP',
      ],
    },
    {
      icon: '🔗',
      title: 'Integración Frontend–Backend',
      description: 'Conecta sistemas: APIs, webhooks, sincronización de datos.',
      details: [
        'Integración de servicios terceros',
        'Webhooks y notificaciones',
        'Sincronización en tiempo real',
        'Gestion de cambios de datos',
        'Flujos de automatización',
      ],
    },
    {
      icon: '🔍',
      title: 'Optimización de Bases de Datos',
      description: 'Auditoría, mejora de performance y escalabilidad de datos.',
      details: [
        'Análisis y auditoría de BD',
        'Optimización de queries',
        'Indexación estratégica',
        'Escalabilidad de datos',
        'Backup y recuperación',
      ],
    },
    {
      icon: '🔐',
      title: 'Seguridad y Autenticación',
      description: 'Arquitectura de seguridad empresarial y protección de datos.',
      details: [
        'JWT y OAuth',
        'Encriptación de datos',
        'Protección CSRF y XSS',
        'Auditorías de seguridad',
        'Compliance y regulaciones',
      ],
    },
  ];

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-gray-950 py-24 md:py-32">
        <div className="section-container">
          <div className="section-header">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Soluciones técnicas integrales para cada aspecto de tu proyecto.
          </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-900 py-24 md:py-32">
        <div className="section-container">
          <div className="section-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {serviceDetails.map((service, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-8 border border-gray-700 hover:border-blue-500 transition-all"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>

                <ul className="space-y-3">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TrustSection />
      <CTASection />
    </main>
  );
}
