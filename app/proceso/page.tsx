import type { Metadata } from 'next';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Proceso | AlphaDev Studios',
  description: 'Metodología de trabajo: análisis, diseño, desarrollo, testing y deploy.',
};

export default function ProcesoPage() {
  const phases = [
    {
      number: '01',
      title: 'Análisis y Arquitectura',
      description: 'Comprendemos tu negocio en profundidad.',
      details: [
        'Reunión de descubrimiento',
        'Análisis de requisitos',
        'Definición de alcance',
        'Arquitectura propuesta',
        'Timeline y presupuesto',
      ],
    },
    {
      number: '02',
      title: 'Diseño del Sistema',
      description: 'Planificamos la solución técnica.',
      details: [
        'Diseño de base de datos',
        'Modelo de API',
        'Flujos de usuario',
        'Componentes principales',
        'Documentación de diseño',
      ],
    },
    {
      number: '03',
      title: 'Desarrollo Modular',
      description: 'Construcción iterativa y progresiva.',
      details: [
        'Sprints de 2 semanas',
        'Código limpio y documentado',
        'Revisiones de código',
        'Integración continua',
        'Actualización progresiva',
      ],
    },
    {
      number: '04',
      title: 'Testing y Seguridad',
      description: 'Validación exhaustiva del sistema.',
      details: [
        'Testing unitario',
        'Testing de integración',
        'Auditoría de seguridad',
        'Performance testing',
        'QA manual',
      ],
    },
    {
      number: '05',
      title: 'Deploy y Soporte',
      description: 'Despliegue en producción y acompañamiento.',
      details: [
        'Preparación de deploy',
        'Migración de datos',
        'Deploy zero-downtime',
        'Monitoreo en tiempo real',
        'Soporte técnico 24/7',
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
            Nuestro Proceso
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Metodología probada para entregar soluciones técnicas sólidas y escalables.
          </p>
          </div>
        </div>
      </section>

      {/* Phases */}
      <section className="bg-gray-900 py-24 md:py-32">
        <div className="section-container">
          <div className="section-content space-y-12 md:space-y-14">
            {phases.map((phase, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Number */}
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-12 flex items-center justify-center text-white">
                    <div className="text-6xl font-bold opacity-30">{phase.number}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8 md:p-12">
                    <h3 className="text-2xl font-bold text-white mb-2">{phase.title}</h3>
                    <p className="text-gray-400 mb-6">{phase.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {phase.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-blue-400 mt-1">✓</span>
                          <span className="text-gray-300">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </main>
  );
}
