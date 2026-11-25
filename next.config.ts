import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // El catálogo universidad de la Academia lee .md/.json de content/academia
  // con fs en el servidor. Se incluyen explícitamente en las funciones de esas
  // rutas para que existan en Vercel aunque se rendericen bajo demanda.
  outputFileTracingIncludes: {
    '/academia': ['./content/academia/**/*'],
    '/academia/**/*': ['./content/academia/**/*'],
    '/en/academia': ['./content/academia/**/*'],
    '/en/academia/**/*': ['./content/academia/**/*'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
    ],
  },
};

export default nextConfig;
