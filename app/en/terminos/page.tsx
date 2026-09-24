import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import TerminosContent from '../../terminos/TerminosContent';

export const metadata: Metadata = metadataFor('/terminos', 'en');

export default function TerminosPageEn() {
  return <TerminosContent />;
}
