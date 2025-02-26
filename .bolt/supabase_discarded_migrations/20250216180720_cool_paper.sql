/*
  # Update storage policies to allow public uploads

  1. Changes
    - Modify the upload policy to allow public access
    - Keep file type restrictions and size limits
  
  2. Security
    - Allow public uploads to resources bucket
    - Maintain file type restrictions for security
*/

-- Drop the existing upload policy
DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;

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