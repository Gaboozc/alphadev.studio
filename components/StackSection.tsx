import React from 'react';

const technologies = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Node.js', icon: '⬡' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Docker', icon: '🐳' },
  { name: 'AWS', icon: '☁️' },
  { name: 'REST APIs', icon: '📡' },
  { name: 'GraphQL', icon: '◊' },
  { name: 'JWT Auth', icon: '🔐' },
  { name: 'Git', icon: '📦' },
];

export default function StackSection() {
  return (
    <section className="relative bg-gray-900 py-24 md:py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="section-container">
        <div className="section-header">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Stack Tecnológico
          </h2>
          <div className="w-14 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Herramientas modernas y probadas para máxima calidad y rendimiento.
          </p>
        </div>

        <div className="section-content grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-10">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 md:p-8 flex flex-col items-center justify-center hover:border-blue-500/60 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-full transition-all duration-500"></div>

              <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 group-hover:translate-y-1 transition-all duration-300">
                {tech.icon}
              </div>
              <span className="text-xs md:text-sm text-gray-400 group-hover:text-white transition-colors text-center font-medium">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
