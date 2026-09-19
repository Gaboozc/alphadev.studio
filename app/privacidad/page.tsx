import type { Metadata } from 'next';
import PrivacidadContent from './PrivacidadContent';

export const metadata: Metadata = {
  title: 'Privacidad',
  description:
    'Qué datos recoge alphadev.studio, para qué se usan y cómo pedir que se borren. Sin analítica ni rastreo de terceros.',
  alternates: { canonical: '/privacidad' },
  openGraph: { url: '/privacidad' },
};

export default function PrivacidadPage() {
  return <PrivacidadContent />;
}
