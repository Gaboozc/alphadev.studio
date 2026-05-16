import React from 'react';

const logos = [
  'Client A',
  'Client B',
  'Client C',
  'Client D',
  'Client E',
  'Client F',
  'Client G',
  'Client H',
];

export default function TrustSection() {
  return (
    <section className="trust-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="trust-title">Confianza de equipos que valoran la ingenieria</h2>
          <p className="trust-subtitle">
            Placeholder de logos. Reemplazaremos con los logos reales cuando los compartas.
          </p>
        </div>

        <div className="section-content">
          <div className="marquee">
            <div className="marquee__track">
              {logos.concat(logos).map((logo, index) => (
                <div key={index} className="logo-pill">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
