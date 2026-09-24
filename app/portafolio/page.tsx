import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import PortafolioContent from './PortafolioContent';

export const metadata: Metadata = metadataFor('/portafolio', 'es');

export default function PortafolioPage() {
  return <PortafolioContent />;
}
