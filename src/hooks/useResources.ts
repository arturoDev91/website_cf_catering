import { useState, useEffect } from 'react';
import { Resource } from '../types';
import { getResources } from '../lib/supabase';

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getResources();
        setResources(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch resources'));
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return { resources, loading, error };
};