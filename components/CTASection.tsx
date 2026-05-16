import React from 'react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 py-24 md:py-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10 -z-10"></div>
      
      {/* Animated blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="section-container text-center relative z-10 space-y-10 md:space-y-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          ¿Listo para construir un sistema sólido y escalable?
        </h2>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Cuéntanos sobre tu proyecto. Analizaremos la mejor estrategia técnica sin compromisos.
        </p>

        <Link
          href="/contacto"
          className="btn-glow inline-block"
        >
          Iniciar Proyecto
        </Link>

        {/* Accent line below button */}
        <div className="pt-10 border-t border-gray-800/50">
          <p className="text-sm text-gray-500">
            Disponible para consultoría y proyectos personalizados
          </p>
        </div>
      </div>
    </section>
  );
}
