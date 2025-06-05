/*
  # Create notifications table

  1. New Tables
    - `notifications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `type` (text: 'connection_request', 'connection_accepted', 'message', 'profile_view')
      - `from_user_id` (uuid, references profiles.id)
      - `content` (text)
      - `read` (boolean)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `notifications` table
    - Add policies for authenticated users to manage their notifications
*/

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('connection_request', 'connection_accepted', 'message', 'profile_view', 'system')),
  from_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read their own notifications
CREATE POLICY "Users can read own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can update their own notifications (to mark as read)
CREATE POLICY "Users can update own notifications"
  ON notifications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON notifications(created_at);
CREATE INDEX IF NOT EXISTS notifications_read_idx ON notifications(read);