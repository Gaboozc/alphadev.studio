import type { Metadata } from 'next';
import GraciasContent from '@/app/recursos/gracias/GraciasContent';

export const metadata: Metadata = {
  title: 'Thank you',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function GraciasPageEn({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return <GraciasContent lang="en" orderId={token} />;
}
