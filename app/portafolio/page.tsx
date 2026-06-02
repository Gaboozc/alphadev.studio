import type { Metadata } from 'next';
import PortafolioContent from './PortafolioContent';

export const metadata: Metadata = {
  title: 'Resultados',
  description: 'Negocios que pasaron de invisibles a encontrados. Psique\'n\'Pixel, AlphaDev Studios y más próximamente.',
  alternates: { canonical: 'https://alphadev.studio/portafolio' },
  openGraph: { url: 'https://alphadev.studio/portafolio' },
};

export default function PortafolioPage() {
  return <PortafolioContent />;
}
