àimport { supabase } from './lib/supabase.js';
import 'dotenv/config'; // Need to load env if running standalone

// Since we are running outside Next.js context, we need to manually ensure process.env is populated if not already.
// However, the test runner might not have dotenv installed.
// We can just hardcode the check logic or trust the environment if we pass it.

async function test() {
    console.log('Testing connection...');
    const { data, error } = await supabase.from('news').select('*').limit(1);
    console.log('Data:', data);
    console.log('Error:', error);
}

test();
à*cascade082Afile:///c:/Users/kouki/.gemini/hifuu-kou-club/test_connection.mjs