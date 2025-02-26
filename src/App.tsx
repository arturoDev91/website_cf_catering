import { useState, useEffect } from 'react';
import { Calendar, Users, GlassWater, ChefHat, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { ImageSlider } from './components/Hero/ImageSlider';
import { Navigation } from './components/Hero/Navigation';
import { ServiceCard } from './components/Services/ServiceCard';
import { ContactInfo } from './components/Contact/ContactInfo';
import { SocialIcon } from './components/Contact/SocialIcon';
import { ContactForm } from './components/Contact/ContactForm';
import { BACKGROUND_IMAGES, SLIDE_INTERVAL, SERVICES } from './config/constants';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation isScrolled={isScrolled} />
      
      {/* Hero Section */}
      <header className="relative h-screen">
        <ImageSlider images={BACKGROUND_IMAGES} interval={SLIDE_INTERVAL} />
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center mt-20">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-caudex text-white mb-4 sm:mb-8 leading-tight">
              Experiencias Gastronómicas Excepcionales
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-10 max-w-3xl mx-auto font-caudex tracking-wide">
              Especialistas en catering y eventos que transforman momentos en memorias inolvidables
            </p>
            <button className="bg-white text-gray-900 px-8 sm:px-10 py-3 sm:py-4 rounded-full hover:bg-gray-100 transition duration-300 font-caudex text-lg sm:text-xl tracking-wide transform hover:scale-105">
              Consultar Ahora
            </button>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="servicios" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-3xl sm:text-4xl font-caudex text-center mb-12 sm:mb-16">Nuestros Servicios</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {SERVICES.map((service, index) => {
              const icons = [<ChefHat className="w-6 h-6 sm:w-8 sm:h-8" />, <Users className="w-6 h-6 sm:w-8 sm:h-8" />, <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />, <GlassWater className="w-6 h-6 sm:w-8 sm:h-8" />];
              return (
                <ServiceCard
                  key={index}
                  icon={icons[index]}
                  title={service.title}
                  description={service.description}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-16 sm:py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-3xl sm:text-4xl font-caudex mb-6 sm:mb-8">Contacta con Nosotros</h3>
              <div className="space-y-4 sm:space-y-6">
                <ContactInfo icon={<Phone className="w-5 h-5" />} text="+34 900 123 456" />
                <ContactInfo icon={<Mail className="w-5 h-5" />} text="info@cmplanificacion.com" />
                <ContactInfo icon={<MapPin className="w-5 h-5" />} text="Calle Principal 123, Madrid" />
              </div>
              <div className="flex space-x-4 mt-6 sm:mt-8">
                <SocialIcon icon={<Instagram className="w-5 h-5" />} />
                <SocialIcon icon={<Facebook className="w-5 h-5" />} />
                <SocialIcon icon={<Twitter className="w-5 h-5" />} />
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;