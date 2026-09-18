import type { Metadata } from 'next';
import PortafolioContent from './PortafolioContent';

export const metadata: Metadata = {
  title: 'Resultados',
  description:
    'Los sitios de BFS Karate, Imperial Barbershop, Fenix Group y The Latin Grill, en línea. El trabajo real que hicimos para cada negocio.',
  alternates: { canonical: '/portafolio' },
  openGraph: { url: '/portafolio' },
};

export default function PortafolioPage() {
  return <PortafolioContent />;
}
