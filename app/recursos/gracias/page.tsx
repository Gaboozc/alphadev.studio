import type { Metadata } from 'next';
import GraciasContent from './GraciasContent';

export const metadata: Metadata = {
  title: 'Gracias',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function GraciasPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return <GraciasContent lang="es" orderId={token} />;
}
