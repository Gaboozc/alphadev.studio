import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import TerminosContent from './TerminosContent';

export const metadata: Metadata = metadataFor('/terminos', 'es');

export default function TerminosPage() {
  return <TerminosContent />;
}
