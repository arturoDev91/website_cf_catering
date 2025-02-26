import { ArrowRight } from 'lucide-react';
import { ServiceProps } from '../../types';

export const ServiceCard = ({ icon, title, description }: ServiceProps) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <div className="text-gray-800 mb-4">{icon}</div>
      <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{title}</h4>
      <p className="text-sm sm:text-base text-gray-600 mb-4">{description}</p>
      <button className="flex items-center text-gray-800 hover:text-gray-600 transition duration-300 text-sm sm:text-base">
        Saber más <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
};