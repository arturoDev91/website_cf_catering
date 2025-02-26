import { useState } from 'react';

interface ResourceImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ResourceImage = ({ src, alt, className = '' }: ResourceImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
      />
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-500">Error loading image</span>
        </div>
      )}
    </div>
  );
};