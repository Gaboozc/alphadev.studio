import Hero from '@/components/Hero';
import TrustSection from '@/components/TrustSection';
import ServicesSection from '@/components/ServicesSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import ProcessSection from '@/components/ProcessSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import StackSection from '@/components/StackSection';
import CTASection from '@/components/CTASection';

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
