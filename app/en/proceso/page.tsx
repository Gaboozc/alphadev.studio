import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import ProcesoContent from '../../proceso/ProcesoContent';

export const metadata: Metadata = metadataFor('/proceso', 'en');

export default function ProcesoPageEn() {
  return <ProcesoContent />;
}
