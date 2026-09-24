import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import ServiciosContent from '../../servicios/ServiciosContent';

export const metadata: Metadata = metadataFor('/servicios', 'en');

export default function ServiciosPageEn() {
  return <ServiciosContent />;
}
