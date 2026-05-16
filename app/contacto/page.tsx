'use client';

import { FormEvent, useState } from 'react';
import TrustSection from '@/components/TrustSection';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Form submitted:', formData);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      alert('Mensaje enviado. Nos pondremos en contacto pronto.');
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="pt-20">
      {/* Hero */}
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

      {/* Contact Form */}
      <section className="bg-gray-900 py-24 md:py-32">
        <div className="section-container">
          <div className="section-content max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-white font-semibold mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder="+1 (234) 567-890"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-white font-semibold mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder="Tu empresa"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-white font-semibold mb-2">
                Cuéntanos sobre tu proyecto *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition resize-none"
                placeholder="¿Qué necesitas construir? Cuéntanos los detalles..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>

          {/* Contact Info */}
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
