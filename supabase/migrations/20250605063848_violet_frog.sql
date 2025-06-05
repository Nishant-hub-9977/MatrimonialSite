/*
  # Create messages table

  1. New Tables
    - `messages`
      - `id` (uuid, primary key)
      - `connection_id` (uuid, references connections.id)
      - `sender_id` (uuid, references profiles.id)
      - `receiver_id` (uuid, references profiles.id)
      - `content` (text)
      - `read` (boolean)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `messages` table
    - Add policies for authenticated users to manage their messages
*/

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_id UUID REFERENCES connections(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read messages where they are the sender or receiver
CREATE POLICY "Users can read own messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Users can insert messages where they are the sender
CREATE POLICY "Users can insert messages as sender"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Users can update messages where they are the receiver (to mark as read)
CREATE POLICY "Users can update messages as receiver"
  ON messages
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = receiver_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS messages_connection_id_idx ON messages(connection_id);
CREATE INDEX IF NOT EXISTS messages_sender_id_idx ON messages(sender_id);
CREATE INDEX IF NOT EXISTS messages_receiver_id_idx ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages(created_at);