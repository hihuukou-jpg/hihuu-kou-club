
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: Message Supabase credentials.');
    console.error('Ensure .env has NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupTable() {
    console.log('Setting up ema_messages table...');

    // SQL to create table if not exists
    const createTableSql = `
    CREATE TABLE IF NOT EXISTS ema_messages (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

    // SQL to enable RLS
    const enableRlsSql = `
    ALTER TABLE ema_messages ENABLE ROW LEVEL SECURITY;
  `;

    // SQL for Policies (Allow Public Insert/Select for anonymous usage)
    const policyInsertSql = `
    DO $$ 
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'ema_messages' AND policyname = 'Public Insert') THEN
            CREATE POLICY "Public Insert" ON ema_messages FOR INSERT WITH CHECK (true);
        END IF;
    END $$;
  `;

    const policySelectSql = `
    DO $$ 
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'ema_messages' AND policyname = 'Public Select') THEN
            CREATE POLICY "Public Select" ON ema_messages FOR SELECT USING (true);
        END IF;
    END $$;
  `;

    try {
        // 1. Create Table (using RPC usually requires a function, but we'll try raw SQL via standard pg driver workaround or just simple error handling if not supported directly via JS SDK without SQL editor. 
        // Wait, supabase-js doesn't run raw SQL easily on the client side without a stored procedure.
        // Actually, "postgres-js" or similar is needed for raw SQL, OR we use the dashboard.
        // BUT we can use the 'rpc' interface if we have a 'exec_sql' function set up (which is common in some starters), but we probably don't.
        // User might need to run this SQL manually in dashboard if I can't do it here. 
        // HOWEVER, I can check if 'storage' or other APIs allow setup.
        // actually, typically for these tasks I should ask user to run SQL or use a migration tool.
        // I will try to use the "rpc" method IF there is a known function, but likely there isn't.

        // ALTERNATIVE: Use the existing setup pattern if any. I see `supabase_stats.sql` in previous file list.
        // The user has `supabase_stats.sql` in the root. I should probably create a `supabase_ema.sql` and ask the user to run it, OR try to use a migration library if installed. 
        // Checking package.json... no migration tool.

        // I will write a .sql file instead and ask the user to run it in the Supabase Dashboard SQL Editor.
        // This is safer and standard for Supabase.

        console.log("Generating SQL file for manual execution...");
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

setupTable();
