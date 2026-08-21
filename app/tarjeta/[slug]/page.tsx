import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CARDS } from '../cards';
import TarjetaContent from './TarjetaContent';

export function generateStaticParams() {
  return Object.keys(CARDS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const card = CARDS[slug];
  return {
    title: card ? `${card.name} · AlphaDev Studios` : 'Tarjeta',
    // Ruta secreta: no indexar
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function TarjetaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = CARDS[slug];
  if (!card) notFound();
  return <TarjetaContent slug={slug} />;
}
