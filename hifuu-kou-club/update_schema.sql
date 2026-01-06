-- Ensure theme column exists in illustrations
ALTER TABLE illustrations ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'omote';

-- Update illustrations table constraint to allow 'both'
ALTER TABLE illustrations DROP CONSTRAINT IF EXISTS illustrations_theme_check;
ALTER TABLE illustrations ADD CONSTRAINT illustrations_theme_check CHECK (theme IN ('omote', 'ura', 'both'));

-- Add theme column to news table
ALTER TABLE news ADD COLUMN IF NOT EXISTS theme TEXT CHECK (theme IN ('omote', 'ura', 'both')) DEFAULT 'both';

-- Enable RLS for news (if not already)
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Policy: Public news view
CREATE POLICY "Public news are viewable by everyone" 
ON news FOR SELECT 
USING (true);

-- Policy: Only authenticated users (admins) can insert/update/delete news
CREATE POLICY "Admins can manage news" 
ON news FOR ALL
USING (auth.role() = 'authenticated');

-- Add theme column to diary table
ALTER TABLE diary ADD COLUMN IF NOT EXISTS theme TEXT CHECK (theme IN ('omote', 'ura', 'both')) DEFAULT 'both';

-- Add theme column to videos table
ALTER TABLE videos ADD COLUMN IF NOT EXISTS theme TEXT CHECK (theme IN ('omote', 'ura', 'both')) DEFAULT 'both';
