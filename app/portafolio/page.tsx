import type { Metadata } from 'next';
import TrustSection from '@/components/TrustSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Portafolio | AlphaDev Studios',
  description: 'Proyectos y soluciones desarrolladas. Casos de estudio de nuestros clientes empresariales.',
};

export default function PortafolioPage() {
  const projects = [
    {
      title: 'Plataforma de Gestión Empresarial',
      type: 'CRM + Backend',
      stack: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
      description: 'Sistema interno de gestión de clientes y proyectos con dashboards analíticos.',
      icon: '📊',
    },
    {
      title: 'API REST Escalable',
      type: 'Backend',
      stack: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      description: 'API robusta para plataforma de e-commerce con 100k+ transacciones diarias.',
      icon: '⚡',
    },
    {
      title: 'Aplicación Web de Análisis',
      type: 'Frontend + Visualización',
      stack: ['React', 'D3.js', 'TypeScript', 'Tailwind'],
      description: 'Dashboard de análisis en tiempo real con visualizaciones interactivas.',
      icon: '📈',
    },
    {
      title: 'Integración Multi-Sistema',
      type: 'Integración',
      stack: ['Webhooks', 'APIs', 'Sincronización', 'AWS'],
      description: 'Conectamos tres sistemas empresariales independientes en una sola plataforma.',
      icon: '🔗',
    },
    {
      title: 'Optimización de Base de Datos',
      type: 'Backend',
      stack: ['PostgreSQL', 'Índices', 'Sharding', 'Caching'],
      description: 'Reducimos query time en 80% en sistema con 5M+ registros.',
      icon: '🔍',
    },
    {
      title: 'Migración a Arquitectura Escalable',
      type: 'Arquitectura',
      stack: ['Microservicios', 'Docker', 'Kubernetes', 'AWS'],
      description: 'Migramos monolito a arquitectura de microservicios sin downtime.',
      icon: '⚙️',
    },
  ];

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-gray-950 py-24 md:py-32">
        <div className="section-container">
          <div className="section-header">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Portafolio
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Proyectos desarrollados para clientes empresariales. Soluciones técnicas reales.
          </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-gray-900 py-24 md:py-32">
        <div className="section-container">
          <div className="section-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-8 border border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                <div className="text-5xl mb-4">{project.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-blue-400 text-sm mb-4 font-semibold">{project.type}</p>
                <p className="text-gray-300 mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-700 text-gray-200 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
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
