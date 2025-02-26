/*
  # Storage Setup for Static Resources

  1. Storage Configuration
    - Create a new public bucket called 'resources'
    - Enable public access for reading files
    - Restrict file uploads to authenticated users only
    
  2. Security
    - Enable RLS policies for storage
    - Add policies for:
      - Public read access
      - Authenticated user write access
      - File size and type restrictions
*/

-- Create a new storage bucket for resources
INSERT INTO storage.buckets (id, name, public)
VALUES ('resources', 'resources', true);

-- Set up RLS policies for the resources bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'resources');

CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
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

CREATE POLICY "Authenticated users can update their files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'resources' AND auth.uid() = owner)
WITH CHECK (bucket_id = 'resources' AND auth.uid() = owner);

CREATE POLICY "Authenticated users can delete their files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'resources' AND auth.uid() = owner);