import { useEffect, useState } from 'react';
import { Resource } from '../../types';

interface ImageSliderProps {
  images: Resource[];
  interval: number;
}

export const ImageSlider = ({ images, interval }: ImageSliderProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [interval, images.length]);

  return (
    <div className="absolute inset-0">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentImageIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.url}
            className="w-full h-full object-cover"
            alt="Catering and events"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
      ))}
    </div>
  );
};