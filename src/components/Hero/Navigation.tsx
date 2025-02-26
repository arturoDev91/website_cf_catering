import { useEffect, useState } from 'react';
import { Logo } from '../common/Logo';
import { NavbarProps } from '../../types';

export const Navigation = ({ isScrolled }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm py-2' : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center relative">
        <Logo />
        
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8 font-caudex text-base">
          <a href="#servicios" className="text-white hover:text-gold-200 transition-colors duration-300">Servicios</a>
          <a href="#nosotros" className="text-white hover:text-gold-200 transition-colors duration-300">Nosotros</a>
          <a href="#galeria" className="text-white hover:text-gold-200 transition-colors duration-300">Galería</a>
          <a href="#contacto" className="text-white hover:text-gold-200 transition-colors duration-300">Contacto</a>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-sm transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col items-center justify-center h-full space-y-8 font-caudex text-2xl">
            <a
              href="#servicios"
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-gold-200 transition-colors duration-300"
            >
              Servicios
            </a>
            <a
              href="#nosotros"
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-gold-200 transition-colors duration-300"
            >
              Nosotros
            </a>
            <a
              href="#galeria"
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-gold-200 transition-colors duration-300"
            >
              Galería
            </a>
            <a
              href="#contacto"
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-gold-200 transition-colors duration-300"
            >
              Contacto
            </a>
          </div>
        </div>

        {/* Elegant separator line */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
    </nav>
  );
};