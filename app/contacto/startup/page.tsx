import type { Metadata } from 'next';
import StartupForm from './StartupForm';

export const metadata: Metadata = {
  title: 'Contacto Startup | AlphaDev Studios',
  description: 'Formulario para startups y proyectos de menor presupuesto o MVPs.',
};

export default function ContactoStartupPage() {
  return (
    <main className="pt-20">
      <section className="section-with-logo bg-gray-950 py-24 md:py-32">
        <div className="section-logo-bg" aria-hidden="true">
          <div className="animated-logo-container">
            <div className="animated-logo__halo">
              <svg viewBox="0 0 400 400" className="animated-logo__svg">
                <g className="animated-logo__group animated-logo__group--1">
                  <line x1="0" y1="0" x2="400" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                  <line x1="400" y1="0" x2="400" y2="400" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                  <line x1="400" y1="400" x2="0" y2="400" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                  <line x1="0" y1="400" x2="0" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                </g>
                <g className="animated-logo__group animated-logo__group--2">
                  <line x1="0" y1="0" x2="400" y2="400" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                  <line x1="400" y1="0" x2="0" y2="400" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                </g>
                <g className="animated-logo__group animated-logo__group--3">
                  <line x1="50" y1="50" x2="350" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                  <line x1="350" y1="50" x2="350" y2="350" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                  <line x1="350" y1="350" x2="50" y2="350" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                  <line x1="50" y1="350" x2="50" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                </g>
                <g className="animated-logo__corners">
                  <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.7" />
                  <circle cx="380" cy="20" r="3" fill="currentColor" opacity="0.7" />
                  <circle cx="380" cy="380" r="3" fill="currentColor" opacity="0.7" />
                  <circle cx="20" cy="380" r="3" fill="currentColor" opacity="0.7" />
                </g>
              </svg>
            </div>
            <div className="animated-logo__image">
              <img src="/assets/img/alphadev-logo.png" alt="" />
            </div>
            <div className="animated-logo__pulse"></div>
          </div>
        </div>
        <div className="section-container section-foreground">
          <div className="section-header">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contacto Startup
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Para MVPs, validaciones rapidas y presupuestos contenidos. Cuentanos lo esencial.
            </p>
          </div>
        </div>
      </section>

      <section className="section-with-logo bg-gray-900 py-24 md:py-32">
        <div className="section-logo-bg" aria-hidden="true">
          <div className="animated-logo-container">
            <div className="animated-logo__halo">
              <svg viewBox="0 0 400 400" className="animated-logo__svg">
                <g className="animated-logo__group animated-logo__group--1">
                  <line x1="0" y1="0" x2="400" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                  <line x1="400" y1="0" x2="400" y2="400" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                  <line x1="400" y1="400" x2="0" y2="400" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                  <line x1="0" y1="400" x2="0" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                </g>
                <g className="animated-logo__group animated-logo__group--2">
                  <line x1="0" y1="0" x2="400" y2="400" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                  <line x1="400" y1="0" x2="0" y2="400" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                </g>
                <g className="animated-logo__group animated-logo__group--3">
                  <line x1="50" y1="50" x2="350" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                  <line x1="350" y1="50" x2="350" y2="350" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                  <line x1="350" y1="350" x2="50" y2="350" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                  <line x1="50" y1="350" x2="50" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                </g>
                <g className="animated-logo__corners">
                  <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.7" />
                  <circle cx="380" cy="20" r="3" fill="currentColor" opacity="0.7" />
                  <circle cx="380" cy="380" r="3" fill="currentColor" opacity="0.7" />
                  <circle cx="20" cy="380" r="3" fill="currentColor" opacity="0.7" />
                </g>
              </svg>
            </div>
            <div className="animated-logo__image">
              <img src="/assets/img/alphadev-logo.png" alt="" />
            </div>
            <div className="animated-logo__pulse"></div>
          </div>
        </div>
        <div className="section-container section-foreground">
          <div className="section-content max-w-3xl mx-auto">
            <StartupForm />
          </div>
        </div>
      </section>
    </main>
  );
}
