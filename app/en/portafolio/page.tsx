import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import PortafolioContent from '../../portafolio/PortafolioContent';

export const metadata: Metadata = metadataFor('/portafolio', 'en');

export default function PortafolioPageEn() {
  return <PortafolioContent />;
}
