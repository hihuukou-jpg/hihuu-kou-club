-- Add theme column to diary table
ALTER TABLE diary ADD COLUMN IF NOT EXISTS theme TEXT CHECK (theme IN ('omote', 'ura', 'both')) DEFAULT 'both';

-- Add theme column to videos table
ALTER TABLE videos ADD COLUMN IF NOT EXISTS theme TEXT CHECK (theme IN ('omote', 'ura', 'both')) DEFAULT 'both';
