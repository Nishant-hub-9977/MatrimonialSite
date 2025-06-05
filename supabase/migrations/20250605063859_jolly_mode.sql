/*
  # Create profile views table

  1. New Tables
    - `profile_views`
      - `id` (uuid, primary key)
      - `viewer_id` (uuid, references profiles.id)
      - `viewed_id` (uuid, references profiles.id)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `profile_views` table
    - Add policies for authenticated users to manage profile views
*/

-- Create profile_views table
CREATE TABLE IF NOT EXISTS profile_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  viewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  viewed_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT different_users CHECK (viewer_id <> viewed_id)
);

-- Enable Row Level Security
ALTER TABLE profile_views ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read profile views where they are the viewer or viewed
CREATE POLICY "Users can read own profile views"
  ON profile_views
  FOR SELECT
  TO authenticated
  USING (auth.uid() = viewer_id OR auth.uid() = viewed_id);

-- Users can insert profile views where they are the viewer
CREATE POLICY "Users can insert profile views as viewer"
  ON profile_views
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = viewer_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS profile_views_viewer_id_idx ON profile_views(viewer_id);
CREATE INDEX IF NOT EXISTS profile_views_viewed_id_idx ON profile_views(viewed_id);
CREATE INDEX IF NOT EXISTS profile_views_created_at_idx ON profile_views(created_at);

-- Create function to create notification when profile is viewed
CREATE OR REPLACE FUNCTION public.handle_profile_view()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, from_user_id, content)
  VALUES (
    NEW.viewed_id, 
    'profile_view', 
    NEW.viewer_id, 
    'Someone viewed your profile'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function when a profile is viewed
CREATE OR REPLACE TRIGGER on_profile_view
  AFTER INSERT ON public.profile_views
  FOR EACH ROW EXECUTE FUNCTION public.handle_profile_view();