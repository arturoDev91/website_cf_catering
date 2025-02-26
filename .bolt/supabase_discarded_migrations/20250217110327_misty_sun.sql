/*
  # Update storage upload policies

  1. Changes
    - Safely update the public upload policy
    - Maintain file type restrictions
  
  2. Security
    - Ensure public upload access
    - Maintain file type validation
*/

DO $$ 
BEGIN
    -- Drop the policy if it exists
    IF EXISTS (
        SELECT 1 
        FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Public can upload files'
    ) THEN
        DROP POLICY "Public can upload files" ON storage.objects;
    END IF;

    -- Drop the authenticated users policy if it exists
    IF EXISTS (
        SELECT 1 
        FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Authenticated users can upload files'
    ) THEN
        DROP POLICY "Authenticated users can upload files" ON storage.objects;
    END IF;
END $$;

-- Create new public upload policy
CREATE POLICY "Public can upload files"
ON storage.objects FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'resources'
  AND (LENGTH(name) > 0)
  AND (
    LOWER(RIGHT(name, POSITION('.' IN REVERSE(name))-1)) IN (
      'jpg', 'jpeg', 'png', 'gif', 'webp', -- Images
      'pdf', 'doc', 'docx', 'xls', 'xlsx', -- Documents
      'mp4', 'webm', -- Videos
      'mp3', 'wav'  -- Audio
    )
  )
);