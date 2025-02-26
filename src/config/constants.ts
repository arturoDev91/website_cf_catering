import { config } from './application';
import { Resource } from '../types';

export const SLIDE_INTERVAL = 5000;

export const BACKGROUND_IMAGES: Resource[] = [
  {
    url: config.images.defaultHero,
    filename: "CateringReal.jpeg"
  },
  {
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&q=80",
    filename: "catering-2.jpg"
  },
  {
    url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&q=80",
    filename: "catering-3.jpg"
  }
];

export const SERVICES = [
  {
    title: "Catering Gourmet",
    description: "Experiencias culinarias excepcionales para eventos exclusivos"
  },
  {
    title: "Eventos Corporativos",
    description: "Servicios de catering profesional para reuniones y conferencias"
  },
  {
    title: "Bodas y Celebraciones",
    description: "Menús personalizados para tu día especial"
  },
  {
    title: "Cocktails y Bebidas",
    description: "Servicio de bar premium y coctelería de autor"
  }
];

export const CONTACT_INFO = [
  {
    text: "+34 900 123 456"
  },
  {
    text: "info@cmplanificacion.com"
  },
  {
    text: "Calle Principal 123, Madrid"
  }
];