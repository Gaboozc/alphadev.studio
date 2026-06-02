import type { Metadata } from 'next';
import ServiciosContent from './ServiciosContent';

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Sitio web profesional, manejo de redes sociales, publicidad online y presencia en Google. Todo lo que tu negocio necesita para existir en internet.',
  alternates: { canonical: 'https://alphadev.studio/servicios' },
  openGraph: { url: 'https://alphadev.studio/servicios' },
};

export default function ServiciosPage() {
  return <ServiciosContent />;
}
