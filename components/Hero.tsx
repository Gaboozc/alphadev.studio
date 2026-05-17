import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__background"></div>
      <div className="hero__content">
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
            <img src="/assets/img/alphadev-logo.png" alt="AlphaDev Studios" />
          </div>
          <div className="animated-logo__pulse"></div>
        </div>

        <div className="mt-12 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ingeniería de Software{' '}
            <span className="text-blue-400">Empresarial</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Construimos aplicaciones web, APIs escalables y sistemas internos a medida.
            Soluciones técnicas robustas para empresas que necesitan resultados reales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="btn-glow px-8 py-4 text-base font-semibold"
            >
              Agendar Reunión
            </Link>
            <Link
              href="/servicios"
              className="px-8 py-4 text-base font-semibold text-white border border-blue-500/40 rounded-lg hover:border-blue-400 hover:bg-blue-500/10 transition"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
