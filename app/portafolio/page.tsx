import type { Metadata } from 'next';
import PortafolioContent from './PortafolioContent';

export const metadata: Metadata = {
  title: 'Resultados',
  description: 'Negocios que pasaron de invisibles a encontrados. Psique\'n\'Pixel, AlphaDev Studios y más próximamente.',
  alternates: { canonical: '/portafolio' },
  openGraph: { url: '/portafolio' },
};

export default function PortafolioPage() {
  return <PortafolioContent />;
}
