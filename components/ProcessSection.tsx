import React from 'react';
import Link from 'next/link';

export default function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Análisis y Arquitectura',
      description: 'Comprendemos tu negocio y diseñamos la arquitectura técnica óptima.',
    },
    {
      number: '02',
      title: 'Diseño del Sistema',
      description: 'Planificamos componentes, flujos de datos y patrones de escalabilidad.',
    },
    {
      number: '03',
      title: 'Desarrollo Modular',
      description: 'Construimos iterativamente con código limpio y documentación clara.',
    },
    {
      number: '04',
      title: 'Testing y Seguridad',
      description: 'Validamos funcionalidad, cobertura de tests y protocolos de seguridad.',
    },
    {
      number: '05',
      title: 'Deploy y Soporte',
      description: 'Desplegamos en producción y proporcionamos soporte técnico continuo.',
    },
  ];

  return (
    <section className="relative bg-gray-950 py-24 md:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10 blur-3xl -z-10"></div>

      <div className="section-container">
        <div className="section-header">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Nuestro Proceso
          </h2>
          <div className="w-14 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Metodología probada para entregar soluciones sólidas y escalables.
          </p>
        </div>

        <div className="section-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="process-card">
                <div className="process-file">
                  <div className="process-work-5" />
                  <div className="process-work-4" />
                  <div className="process-work-3" />
                  <div className="process-work-2" />
                  <div className="process-work-1" />
                </div>
                <div className="process-card-text">
                  <div className="process-number">{step.number}</div>
                  <h3 className="process-title">{step.title}</h3>
                  <p className="process-description">{step.description}</p>
                </div>
              </div>

              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-1 bg-gradient-to-r from-blue-500/60 to-blue-500/20 group-hover:from-blue-400 group-hover:to-blue-400/40 transition-all duration-300"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/proceso"
            className="btn-glow inline-block"
          >
            Conocer Detalles del Proceso
          </Link>
        </div>
      </div>
    </section>
  );
}
