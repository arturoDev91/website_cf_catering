import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getResources = async () => {
  const { data, error } = await supabase
    .storage
    .from('resources')
    .list('images');

  if (error) {
    console.error('Error fetching resources:', error);
    return [];
  }

  return data.map(file => ({
    name: file.name,
    url: `${supabaseUrl}/storage/v1/object/public/resources/images/${file.name}`
  }));
};

export const uploadResource = async (file: File) => {
  const { data, error } = await supabase
    .storage
    .from('resources')
    .upload(`images/${file.name}`, file);

  if (error) {
    throw error;
  }

  return {
    name: file.name,
    url: `${supabaseUrl}/storage/v1/object/public/resources/images/${file.name}`
  };
};