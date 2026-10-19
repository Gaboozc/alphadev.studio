import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import DemosContent from '../../demos/DemosContent';

export const metadata: Metadata = metadataFor('/demos', 'en');

export default function DemosPageEn() {
  return <DemosContent />;
}
