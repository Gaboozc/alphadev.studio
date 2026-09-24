import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import PrivacidadContent from './PrivacidadContent';

export const metadata: Metadata = metadataFor('/privacidad', 'es');

export default function PrivacidadPage() {
  return <PrivacidadContent />;
}
