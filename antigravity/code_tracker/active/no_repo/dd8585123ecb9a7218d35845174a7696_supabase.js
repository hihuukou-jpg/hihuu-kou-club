ùimport { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    // Warn but don't hard crash to allow build phase if envs are missing
    console.warn('Missing Supabase Environment Variables');
}

// Client for public access (obeys RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for backend operations (bypasses RLS)
export const supabaseAdmin = supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
    : null;
Y *cascade08Y*cascade08 *cascade08Š*cascade08Š× *cascade08×Û*cascade08Ûç *cascade08çñ*cascade08ñò *cascade08òù*cascade08ùú *cascade08úû*cascade08ûü *cascade08üŠ*cascade08Š *cascade08*cascade08 *cascade08 *cascade08 ¡ *cascade08¡¢*cascade08¢£ *cascade08£³*cascade08³´ *cascade08´¼*cascade08¼½ *cascade08½¾*cascade08¾ğ *cascade08ğ™*cascade08™Ó *cascade08Ó×*cascade08×Ş *cascade08Şù*cascade082=file:///c:/Users/kouki/.gemini/hifuu-kou-club/lib/supabase.js