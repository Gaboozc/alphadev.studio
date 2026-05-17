import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import TrustSection from '@/components/TrustSection';
import ServicesSection from '@/components/ServicesSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import ProcessSection from '@/components/ProcessSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import StackSection from '@/components/StackSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'AlphaDev Studios | Desarrollo Web y Software Empresarial',
  description:
    'Construimos aplicaciones web, APIs escalables y sistemas internos a medida. Ingeniería de software profesional para empresas que necesitan soluciones técnicas robustas.',
  alternates: { canonical: 'https://alphadev.studio' },
  openGraph: { url: 'https://alphadev.studio' },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSection />
      <ServicesSection />
      <CapabilitiesSection />
      <ProcessSection />
      <CaseStudiesSection />
      <StackSection />
      <CTASection />
    </>
  );
}
