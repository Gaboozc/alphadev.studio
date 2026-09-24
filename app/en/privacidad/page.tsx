import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import PrivacidadContent from '../../privacidad/PrivacidadContent';

export const metadata: Metadata = metadataFor('/privacidad', 'en');

export default function PrivacidadPageEn() {
  return <PrivacidadContent />;
}
