import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import ServiciosContent from './ServiciosContent';

export const metadata: Metadata = metadataFor('/servicios', 'es');

export default function ServiciosPage() {
  return <ServiciosContent />;
}
