import React from 'react';

const cases = [
  {
    title: 'Plataforma de operaciones internas',
    industry: 'Servicios financieros',
    result: 'Reduccion de tiempos operativos en 42%.',
    scope: 'Backend + Integraciones + Dashboard',
  },
  {
    title: 'API para ecosistema de partners',
    industry: 'Retail',
    result: 'Escalado a 120k requests/min.',
    scope: 'Arquitectura + Observabilidad',
  },
  {
    title: 'Migracion a microservicios',
    industry: 'Logistica',
    result: 'Deploys diarios sin downtime.',
    scope: 'DevOps + Seguridad + QA',
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="case-studies-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Casos de uso</h2>
          <p className="section-subtitle">
            Resultados medibles en contextos reales. Cambiaremos estos ejemplos por los tuyos.
          </p>
        </div>

        <div className="section-content case-grid">
          {cases.map((item) => (
            <div key={item.title} className="case-card">
              <div className="case-meta">{item.industry}</div>
              <h3>{item.title}</h3>
              <p className="case-result">{item.result}</p>
              <div className="case-scope">{item.scope}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
