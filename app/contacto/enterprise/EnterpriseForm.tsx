'use client';

import { FormEvent, useState } from 'react';

export default function EnterpriseForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    budget: '',
    timeline: '',
    teamSize: '',
    scope: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Enterprise form submitted:', formData);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', company: '', role: '', budget: '', timeline: '', teamSize: '', scope: '' });
      alert('Gracias. Nuestro equipo enterprise se pondra en contacto pronto.');
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
          <label htmlFor="name" className="block text-white font-semibold mb-2">Nombre completo *</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            placeholder="Tu nombre" />
        </div>
        <div>
          <label htmlFor="email" className="block text-white font-semibold mb-2">Email corporativo *</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            placeholder="tu@empresa.com" />
        </div>
        <div>
          <label htmlFor="company" className="block text-white font-semibold mb-2">Empresa *</label>
          <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            placeholder="Nombre de la empresa" />
        </div>
        <div>
          <label htmlFor="role" className="block text-white font-semibold mb-2">Rol *</label>
          <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            placeholder="CTO, VP, Director, etc." />
        </div>
        <div>
          <label htmlFor="budget" className="block text-white font-semibold mb-2">Presupuesto estimado *</label>
          <select id="budget" name="budget" value={formData.budget} onChange={handleChange} required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition">
            <option value="">Selecciona un rango</option>
            <option value="50k-100k">USD 50k - 100k</option>
            <option value="100k-250k">USD 100k - 250k</option>
            <option value="250k-500k">USD 250k - 500k</option>
            <option value="500k+">USD 500k+</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="block text-white font-semibold mb-2">Timeline deseado *</label>
          <select id="timeline" name="timeline" value={formData.timeline} onChange={handleChange} required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition">
            <option value="">Selecciona un rango</option>
            <option value="0-3">0-3 meses</option>
            <option value="3-6">3-6 meses</option>
            <option value="6-12">6-12 meses</option>
            <option value="12+">12+ meses</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="teamSize" className="block text-white font-semibold mb-2">Tamano del equipo involucrado</label>
        <input type="text" id="teamSize" name="teamSize" value={formData.teamSize} onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
          placeholder="Ej: 5-10, 20+, etc." />
      </div>
      <div>
        <label htmlFor="scope" className="block text-white font-semibold mb-2">Alcance y objetivos del proyecto *</label>
        <textarea id="scope" name="scope" value={formData.scope} onChange={handleChange} required rows={6}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition resize-none"
          placeholder="Describe el alcance, objetivos, restricciones, integraciones clave, etc." />
      </div>
      <button type="submit" disabled={isSubmitting}
        className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
        {isSubmitting ? 'Enviando...' : 'Enviar Solicitud Enterprise'}
      </button>
    </form>
  );
}
