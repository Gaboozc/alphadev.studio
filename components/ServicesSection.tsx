import React from 'react';
import Link from 'next/link';

const services = [
  {
    icon: '🌐',
    title: 'Desarrollo Web Profesional',
    description: 'Aplicaciones web modernas, responsive y performantes con React, Next.js o tecnologías custom.',
  },
  {
    icon: '⚡',
    title: 'APIs & Backend Escalable',
    description: 'Arquitectura backend robusta, microservicios, integración de APIs y bases de datos optimizadas.',
  },
  {
    icon: '💼',
    title: 'CRM y Sistemas Internos',
    description: 'Plataformas internas, sistemas de gestión y herramientas empresariales a medida.',
  },
  {
    icon: '🔗',
    title: 'Integración Frontend–Backend',
    description: 'Conecta tus sistemas: integraciones con servicios terceros, webhooks, sincronización de datos.',
  },
  {
    icon: '🔍',
    title: 'Optimización de Bases de Datos',
    description: 'Auditoría, optimización de queries, indexación estratégica y escalabilidad de datos.',
  },
  {
    icon: '🔐',
    title: 'Seguridad y Autenticación',
    description: 'JWT, OAuth, encriptación, protección CSRF y arquitectura de seguridad empresarial.',
  },
];

export default function ServicesSection() {
  return (
    <section className="relative bg-gray-900 py-24 md:py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="section-container">
        <div className="section-header">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Servicios
          </h2>
          <div className="w-14 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Soluciones técnicas completas para cada etapa de tu proyecto.
          </p>
        </div>

        <div className="section-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {services.map((service, index) => (
            <Link key={index} href="/contacto" className="w-full">
              <div className="service-card cursor-pointer">
                <div className="service-card-icon">
                  {service.icon}
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-description">{service.description}</p>
                <div className="service-card-corner">
                  <div className="service-card-arrow">→</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/contacto"
            className="btn-glow inline-block"
          >
            Explorar Todos los Servicios
          </Link>
        </div>
      </div>
    </section>
  );
}
