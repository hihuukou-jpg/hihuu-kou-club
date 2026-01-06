-- Create the table for Ema messages
CREATE TABLE IF NOT EXISTS ema_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL CHECK (char_length(content) <= 140),
  secret_key UUID DEFAULT gen_random_uuid(),
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RPC for atomic likes increment
CREATE OR REPLACE FUNCTION increment_ema_likes(row_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE ema_messages
  SET likes = likes + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql;

-- RPC for atomic likes decrement (NEW)
CREATE OR REPLACE FUNCTION decrement_ema_likes(row_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE ema_messages
  SET likes = GREATEST(0, likes - 1)
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE ema_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to view all messages
CREATE POLICY "Public Select" 
ON ema_messages 
FOR SELECT 
USING (true);

-- Allow anonymous users to insert messages
CREATE POLICY "Public Insert" 
ON ema_messages 
FOR INSERT 
WITH CHECK (true);

-- Optional: Clean up old messages automatically (e.g. keep last 100 or 30 days) if needed
-- For now, we keep everything.
