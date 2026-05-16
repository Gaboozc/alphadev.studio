import React from 'react';

const testimonials = [
  {
    quote: 'Equipo con excelente criterio tecnico y foco real en negocio.',
    name: 'CTO, SaaS B2B',
  },
  {
    quote: 'Comunican claro, entregan rapido y no improvisan arquitectura.',
    name: 'Head of Product, Fintech',
  },
  {
    quote: 'Se integraron a nuestro equipo como si fueran internos.',
    name: 'Director de Tecnologia, Retail',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Testimonios</h2>
          <p className="section-subtitle">
            Confianza social real. Sustituiremos estos textos por testimonios reales.
          </p>
        </div>

        <div className="section-content testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <p className="testimonial-name">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
