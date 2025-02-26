/*
  # Create Resources Table in Catering Schema

  1. New Schema
    - Create catering schema if it doesn't exist
    
  2. New Tables
    - `catering.resources`
      - `id` (uuid, primary key)
      - `name` (text, resource name)
      - `storage_path` (text, path in storage bucket)
      - `type` (text, resource type: image, document, video, audio)
      - `size` (bigint, file size in bytes)
      - `metadata` (jsonb, additional metadata)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `created_by` (uuid, references auth.users)
      
  3. Security
    - Enable RLS
    - Add policies for read/write access
*/

-- Create catering schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS catering;

-- Create resources table
CREATE TABLE IF NOT EXISTS catering.resources (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    storage_path text NOT NULL,
    type text NOT NULL CHECK (type IN ('image', 'document', 'video', 'audio')),
    size bigint NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE catering.resources ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public can view resources"
    ON catering.resources
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Authenticated users can insert resources"
    ON catering.resources
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Resource owners can update their resources"
    ON catering.resources
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = created_by)
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Resource owners can delete their resources"
    ON catering.resources
    FOR DELETE
    TO authenticated
    USING (auth.uid() = created_by);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION catering.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON catering.resources
    FOR EACH ROW
    EXECUTE FUNCTION catering.set_updated_at();