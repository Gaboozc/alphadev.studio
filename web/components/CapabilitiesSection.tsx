import React from 'react';

const capabilities = [
  {
    title: 'Engineering',
    description: 'Arquitectura escalable, APIs robustas, integraciones y calidad de codigo.',
    items: ['Backend & APIs', 'Integraciones', 'Escalabilidad', 'Seguridad'],
  },
  {
    title: 'Product',
    description: 'MVPs, plataformas internas y experiencias digitales orientadas a negocio.',
    items: ['MVP a produccion', 'Dashboards', 'UX funcional', 'Optimizacion'],
  },
  {
    title: 'Strategy',
    description: 'Definimos roadmap tecnico, riesgos y prioridades para acelerar resultados.',
    items: ['Discovery', 'Roadmap', 'Estimacion', 'Go-to-market'],
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="capabilities-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Capacidades</h2>
          <p className="section-subtitle">
            Lo esencial en un solo lugar. Sin relleno, con foco tecnico y de negocio.
          </p>
        </div>

        <div className="section-content capability-grid">
          {capabilities.map((capability) => (
            <div key={capability.title} className="capability-card">
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <ul>
                {capability.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
