import { createClient } from '@supabase/supabase-js';

// Environment variables validation
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

// Application configuration
export const config = {
  supabase: {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY,
    storage: {
      buckets: {
        resources: 'resources'
      },
      paths: {
        images: 'images',
        logos: 'logos'
      }
    }
  },
  images: {
    logo: 'https://kaxlpfjheljcaevaeucm.supabase.co/storage/v1/object/public/resources/images/Logo.png',
    defaultHero: 'https://kaxlpfjheljcaevaeucm.supabase.co/storage/v1/object/public/resources/images/CateringReal.jpeg'
  }
} as const;

// Create Supabase client singleton
export const supabaseClient = createClient(
  config.supabase.url,
  config.supabase.anonKey
);