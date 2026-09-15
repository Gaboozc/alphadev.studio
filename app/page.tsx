import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import HeroContent from '@/components/HeroContent';
import BrandProofStrip from '@/components/BrandProofStrip';
import WorkShowcase from '@/components/WorkShowcase';
import ProblemSection from '@/components/ProblemSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import WhyUsSection from '@/components/WhyUsSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'AlphaDev Studios | Te hacemos existir en internet',
  description:
    'Creamos tu presencia digital desde cero: sitio web, redes sociales y publicidad online. Para que tus clientes te encuentren, te elijan y vuelvan.',
  alternates: { canonical: '/' },
  openGraph: { url: '/' },
};

export default function Home() {
  return (
    <>
      <Hero />
      <HeroContent />
      <BrandProofStrip />
      <WorkShowcase />
      <ProblemSection />
      <CapabilitiesSection />
      <ServicesSection />
      <ProcessSection />
      <WhyUsSection />
      <CTASection />
    </>
  );
}
