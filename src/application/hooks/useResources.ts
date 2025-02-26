import { useState, useEffect } from 'react';
import { ImageResource } from '../../domain/entities/Resource';
import { SupabaseResourceRepository } from '../../infrastructure/supabase/repositories/SupabaseResourceRepository';

const resourceRepository = new SupabaseResourceRepository();

export function useResources() {
  const [images, setImages] = useState<ImageResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      const images = await resourceRepository.getAllImages();
      setImages(images);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load images'));
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    const image = await resourceRepository.uploadImage(file);
    setImages(prev => [...prev, image]);
    return image;
  };

  return {
    images,
    loading,
    error,
    uploadImage,
    refreshImages: loadImages
  };
}