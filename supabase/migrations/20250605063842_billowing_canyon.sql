/*
  # Create connections table

  1. New Tables
    - `connections`
      - `id` (uuid, primary key)
      - `sender_id` (uuid, references profiles.id)
      - `receiver_id` (uuid, references profiles.id)
      - `status` (text: 'pending', 'accepted', 'rejected')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `connections` table
    - Add policies for authenticated users to manage their connections
*/

-- Create connections table
CREATE TABLE IF NOT EXISTS connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT different_users CHECK (sender_id <> receiver_id),
  UNIQUE(sender_id, receiver_id)
);

-- Enable Row Level Security
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read connections where they are the sender or receiver
CREATE POLICY "Users can read own connections"
  ON connections
  FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Users can insert connections where they are the sender
CREATE POLICY "Users can insert connections as sender"
  ON connections
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Users can update connections where they are the receiver
CREATE POLICY "Users can update connections as receiver"
  ON connections
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = receiver_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS connections_sender_id_idx ON connections(sender_id);
CREATE INDEX IF NOT EXISTS connections_receiver_id_idx ON connections(receiver_id);
CREATE INDEX IF NOT EXISTS connections_status_idx ON connections(status);