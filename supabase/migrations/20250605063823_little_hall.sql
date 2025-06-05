/*
  # Create profiles table

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text)
      - `gender` (text)
      - `date_of_birth` (date)
      - `marital_status` (text)
      - `height` (integer)
      - `religion` (text)
      - `mother_tongue` (text)
      - `about` (text)
      - `phone` (text)
      - `location` (text)
      - `education` (text)
      - `education_details` (text)
      - `occupation` (text)
      - `occupation_details` (text)
      - `annual_income` (text)
      - `diet` (text)
      - `smoking` (text)
      - `drinking` (text)
      - `family_details` (text)
      - `avatar_url` (text)
      - `profile_completion` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `profiles` table
    - Add policies for authenticated users to read and update their own data
    - Add policy for authenticated users to read other profiles
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  gender TEXT,
  date_of_birth DATE,
  marital_status TEXT,
  height INTEGER,
  religion TEXT,
  mother_tongue TEXT,
  about TEXT,
  phone TEXT,
  location TEXT,
  education TEXT,
  education_details TEXT,
  occupation TEXT,
  occupation_details TEXT,
  annual_income TEXT,
  diet TEXT,
  smoking TEXT,
  drinking TEXT,
  family_details TEXT,
  avatar_url TEXT,
  profile_completion INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Users can read other profiles
CREATE POLICY "Users can read other profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Create a function to create a profile after a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when a user is created
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();