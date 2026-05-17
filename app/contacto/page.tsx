import type { Metadata } from 'next';
import TrustSection from '@/components/TrustSection';
import ContactoForm from './ContactoForm';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Cuéntanos sobre tu proyecto. Sin compromiso, analizamos la mejor solución técnica para tu empresa.',
  alternates: { canonical: 'https://alphadev.studio/contacto' },
  openGraph: { url: 'https://alphadev.studio/contacto' },
};

export default function ContactoPage() {
  return (
    <main className="pt-20">
      <section className="bg-gray-950 py-24 md:py-32">
        <div className="section-container">
          <div className="section-header">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ponte en Contacto
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Cuéntanos sobre tu proyecto. Sin compromiso, analizamos la mejor solución técnica.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-24 md:py-32">
        <div className="section-container">
          <div className="section-content max-w-2xl mx-auto">
            <ContactoForm />

            <div className="mt-16 pt-12 border-t border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <a href="mailto:info@alphadev.com" className="text-blue-400 hover:text-blue-300">
                  info@alphadev.com
                </a>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Teléfono</h3>
                <a href="tel:+1234567890" className="text-blue-400 hover:text-blue-300">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TrustSection />
    </main>
  );
}
