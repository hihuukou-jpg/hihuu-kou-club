-- Create a simple table to track site statistics
CREATE TABLE IF NOT EXISTS site_stats (
  id INT PRIMARY KEY,
  views BIGINT DEFAULT 0
);

-- Insert the initial row if it doesn't exist
INSERT INTO site_stats (id, views)
VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;

-- Grant access to public (for updating, though usually we'd restrict this server-side)
-- Since we use supabaseAdmin server-side to increment, we don't strictly need public write access if RLS is on.
-- But for reading, we might want admin only.
-- Let's just create it. The API route will handle the logic using Service Role if needed.
