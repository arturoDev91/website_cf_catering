/*
  # Create contact form submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamp)
      - `status` (text) - For tracking message status (new, read, responded)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for public submissions
    - Add policy for admin read access
*/

CREATE TABLE IF NOT EXISTS catering.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE catering.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public to submit contact forms
CREATE POLICY "Allow public contact form submissions"
  ON catering.contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users can view submissions
CREATE POLICY "Authenticated users can view submissions"
  ON catering.contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);