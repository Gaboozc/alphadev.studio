'use client';

import { FormEvent, useState } from 'react';

export default function StartupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    stage: '',
    budget: '',
    timeline: '',
    product: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Startup form submitted:', formData);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', company: '', stage: '', budget: '', timeline: '', product: '' });
      alert('Gracias. Revisaremos tu solicitud y te responderemos pronto.');
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-white font-semibold mb-2">Nombre *</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            placeholder="Tu nombre" />
        </div>
        <div>
          <label htmlFor="email" className="block text-white font-semibold mb-2">Email *</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            placeholder="tu@email.com" />
        </div>
        <div>
          <label htmlFor="company" className="block text-white font-semibold mb-2">Startup/Producto</label>
          <input type="text" id="company" name="company" value={formData.company} onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            placeholder="Nombre del producto" />
        </div>
        <div>
          <label htmlFor="stage" className="block text-white font-semibold mb-2">Etapa actual</label>
          <select id="stage" name="stage" value={formData.stage} onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition">
            <option value="">Selecciona</option>
            <option value="idea">Idea</option>
            <option value="mvp">MVP</option>
            <option value="growth">Crecimiento</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="block text-white font-semibold mb-2">Presupuesto estimado</label>
          <select id="budget" name="budget" value={formData.budget} onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition">
            <option value="">Selecciona un rango</option>
            <option value="5k-15k">USD 5k - 15k</option>
            <option value="15k-30k">USD 15k - 30k</option>
            <option value="30k-50k">USD 30k - 50k</option>
            <option value="50k+">USD 50k+</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="block text-white font-semibold mb-2">Timeline deseado</label>
          <select id="timeline" name="timeline" value={formData.timeline} onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition">
            <option value="">Selecciona un rango</option>
            <option value="0-1">0-1 mes</option>
            <option value="1-3">1-3 meses</option>
            <option value="3-6">3-6 meses</option>
            <option value="6+">6+ meses</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="product" className="block text-white font-semibold mb-2">Que quieres construir? *</label>
        <textarea id="product" name="product" value={formData.product} onChange={handleChange} required rows={6}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition resize-none"
          placeholder="Describe tu idea o MVP y el objetivo principal." />
      </div>
      <button type="submit" disabled={isSubmitting}
        className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
        {isSubmitting ? 'Enviando...' : 'Enviar Solicitud Startup'}
      </button>
    </form>
  );
}
