-- Create illustrations table
CREATE TABLE IF NOT EXISTS illustrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    theme TEXT CHECK (theme IN ('omote', 'ura')) DEFAULT 'omote',
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE illustrations ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can view
CREATE POLICY "Public illustrations are viewable by everyone" 
ON illustrations FOR SELECT 
USING (true);

-- Policy: Only authenticated users (admins) can insert
CREATE POLICY "Admins can insert illustrations" 
ON illustrations FOR INSERT 
WITH CHECK (auth.role() = 'authenticated'); 
-- Note: Adjust based on actual auth setup, e.g., using a specific user ID or admin claim if needed.
-- For now, relying on basic auth state.

-- Policy: Only admins can delete
CREATE POLICY "Admins can delete illustrations" 
ON illustrations FOR DELETE 
USING (auth.role() = 'authenticated');


-- STORAGE BUCKET SETUP
-- Attempt to create the 'illustrations' bucket if it doesn't exist.
-- Note: This requires permissions on the storage schema.
INSERT INTO storage.buckets (id, name, public)
VALUES ('illustrations', 'illustrations', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Public View
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'illustrations' );

-- Storage Policy: Authenticated Upload
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'illustrations' AND auth.role() = 'authenticated' );
