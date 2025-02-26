/*
  # Create resources bucket and policies

  1. Storage Setup
    - Creates a public bucket named 'resources'
    - Sets up storage policies for public access
  
  2. Security
    - Enables public read access
    - Allows public uploads with file type validation
*/

-- Create the resources bucket if it doesn't exist
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('resources', 'resources', true)
  ON CONFLICT (id) DO NOTHING;
END $$;

-- Drop existing policies to avoid conflicts
DO $$
BEGIN
  DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated Upload Access" ON storage.objects;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create public read access policy
DO $$
BEGIN
  CREATE POLICY "Public Read Access"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'resources');
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Create public upload policy with file type validation
DO $$
BEGIN
  CREATE POLICY "Public Upload Access"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (
    bucket_id = 'resources'
    AND (LENGTH(name) > 0)
    AND (
      LOWER(RIGHT(name, POSITION('.' IN REVERSE(name))-1)) IN (
        'jpg', 'jpeg', 'png', 'gif', 'webp'
      )
    )
  );
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;