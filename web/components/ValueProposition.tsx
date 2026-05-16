import React from 'react';

export default function ValueProposition() {
  const values = [
    {
      icon: '⚙️',
      title: 'Qué hacemos',
      description: 'Construimos sistemas backend escalables, integraciones complejas y frontends optimizados que trabajan en armonía.',
    },
    {
      icon: '🎯',
      title: 'Para quién',
      description: 'Empresas que necesitan soluciones técnicas sólidas, equipos internos limitados, o arquitectura de sistemas complejos.',
    },
    {
      icon: '✓',
      title: 'Problema resuelto',
      description: 'Dejamos de lado la improvisación. Arquitectura clara, código mantenible, y sistemas que escalan sin deuda técnica.',
    },
  ];

  return (
    <section className="relative bg-gray-950 py-20 md:py-32 px-4 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            ¿Por qué AlphaDev?
          </h2>
          <div className="w-14 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Somos más que desarrolladores. Somos arquitectos de soluciones tecnológicas empresariales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-8 md:p-10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

              {/* Icon container */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-500/30">
                <span className="text-3xl">{value.icon}</span>
              </div>

              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors">
                {value.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {value.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
