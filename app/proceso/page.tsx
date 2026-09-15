import type { Metadata } from 'next';
import ProcesoContent from './ProcesoContent';

export const metadata: Metadata = {
  title: 'Cómo trabajamos',
  description: 'De invisible a imparable en 5 pasos simples: conversamos, diseñamos tu estrategia, construimos, lanzamos y medimos, y crecemos juntos.',
  alternates: { canonical: '/proceso' },
  openGraph: { url: '/proceso' },
};

export default function ProcesoPage() {
  return <ProcesoContent />;
}
