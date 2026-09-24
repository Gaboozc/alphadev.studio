// Las secciones de la home, en orden.
//
// Vive aparte porque la home existe en dos rutas —/ y /en— y son la misma
// página. Si cada una listara sus secciones, agregar una sola en español
// dejaría la inglesa atrás sin que nada avise.

import Hero from '@/components/Hero';
import HeroContent from '@/components/HeroContent';
import BrandProofStrip from '@/components/BrandProofStrip';
import WorkShowcase from '@/components/WorkShowcase';
import ProblemSection from '@/components/ProblemSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import ServicesSection from '@/components/ServicesSection';
import TemplatesSection from '@/components/TemplatesSection';
import ProcessSection from '@/components/ProcessSection';
import WhyUsSection from '@/components/WhyUsSection';
import CTASection from '@/components/CTASection';

export default function HomeSections() {
  return (
    <>
      <Hero />
      <HeroContent />
      <BrandProofStrip />
      <WorkShowcase />
      <ProblemSection />
      <CapabilitiesSection />
      <ServicesSection />
      <TemplatesSection limit={3} showCta />
      <ProcessSection />
      <WhyUsSection />
      <CTASection />
    </>
  );
}
