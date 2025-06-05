/*
  # Create partner preferences table

  1. New Tables
    - `partner_preferences`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `min_age` (integer)
      - `max_age` (integer)
      - `min_height` (integer)
      - `max_height` (integer)
      - `marital_status` (text[])
      - `religion` (text[])
      - `mother_tongue` (text[])
      - `education` (text[])
      - `occupation` (text[])
      - `annual_income` (text)
      - `diet` (text[])
      - `smoking` (text[])
      - `drinking` (text[])
      - `location` (text[])
      - `additional_preferences` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `partner_preferences` table
    - Add policies for authenticated users to read and update their own preferences
*/

-- Create partner_preferences table
CREATE TABLE IF NOT EXISTS partner_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  min_age INTEGER,
  max_age INTEGER,
  min_height INTEGER,
  max_height INTEGER,
  marital_status TEXT[],
  religion TEXT[],
  mother_tongue TEXT[],
  education TEXT[],
  occupation TEXT[],
  annual_income TEXT,
  diet TEXT[],
  smoking TEXT[],
  drinking TEXT[],
  location TEXT[],
  additional_preferences TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE partner_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read their own preferences
CREATE POLICY "Users can read own preferences"
  ON partner_preferences
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can update their own preferences
CREATE POLICY "Users can update own preferences"
  ON partner_preferences
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own preferences
CREATE POLICY "Users can insert own preferences"
  ON partner_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own preferences
CREATE POLICY "Users can delete own preferences"
  ON partner_preferences
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can read other users' preferences
CREATE POLICY "Users can read other preferences"
  ON partner_preferences
  FOR SELECT
  TO authenticated
  USING (true);