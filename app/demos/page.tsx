import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import DemosContent from './DemosContent';

export const metadata: Metadata = metadataFor('/demos', 'es');

export default function DemosPage() {
  return <DemosContent />;
}
