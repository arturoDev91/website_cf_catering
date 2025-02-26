/*
  # Fix Storage Policies

  1. Changes
    - Drop existing policies to clean up
    - Create new policies that allow public access and uploads
    - Ensure proper bucket configuration
  
  2. Security
    - Allow public uploads to resources bucket
    - Maintain file type restrictions for security
*/

-- Ensure the bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('resources', 'resources', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update their files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete their files" ON storage.objects;

-- Create new policies
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'resources');

CREATE POLICY "Allow public uploads"
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

-- Allow public updates and deletes for simplicity in this case
CREATE POLICY "Allow public updates"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'resources')
WITH CHECK (bucket_id = 'resources');

CREATE POLICY "Allow public deletes"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'resources');