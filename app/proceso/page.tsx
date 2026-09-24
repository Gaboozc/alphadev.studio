import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import ProcesoContent from './ProcesoContent';

export const metadata: Metadata = metadataFor('/proceso', 'es');

export default function ProcesoPage() {
  return <ProcesoContent />;
}
