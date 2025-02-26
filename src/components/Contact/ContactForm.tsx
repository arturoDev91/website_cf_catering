import { FormEvent, useState } from 'react';
import { useContact } from '../../application/hooks/useContact';

export const ContactForm = () => {
  const { status, submitContact } = useContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submitContact(formData);
    if (status === 'success') {
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <input
        type="text"
        placeholder="Nombre"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        required
        className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-base"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        required
        className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-base"
      />
      <textarea
        placeholder="Mensaje"
        value={formData.message}
        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
        required
        rows={4}
        className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-base"
      ></textarea>
      <button 
        type="submit"
        disabled={status === 'submitting'}
        className={`w-full px-8 py-3 rounded-lg transition duration-300 text-base ${
          status === 'submitting'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-900 hover:bg-gray-100'
        }`}
      >
        {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
      
      {status === 'success' && (
        <div className="text-green-400 text-center text-sm sm:text-base">
          ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
        </div>
      )}
      
      {status === 'error' && (
        <div className="text-red-400 text-center text-sm sm:text-base">
          Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
        </div>
      )}
    </form>
  );
}