import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold">Logo</a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="hover:text-gray-600">Servicios</a>
            <a href="#about" className="hover:text-gray-600">Nosotros</a>
            <a href="#contact" className="hover:text-gray-600">Contacto</a>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#services" className="block px-3 py-2 hover:bg-gray-50">Servicios</a>
              <a href="#about" className="block px-3 py-2 hover:bg-gray-50">Nosotros</a>
              <a href="#contact" className="block px-3 py-2 hover:bg-gray-50">Contacto</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};