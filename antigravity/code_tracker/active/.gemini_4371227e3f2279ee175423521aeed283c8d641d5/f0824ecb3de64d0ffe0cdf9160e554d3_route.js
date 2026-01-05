ùimport { supabase } from '../../../lib/supabase';
import { NextResponse } from 'next/server';

// GET: Fetch current visitor count (Admin only checks are done in UI, but safe to be public or restricted)
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('site_stats')
            .select('views')
            .eq('id', 1)
            .single();

        if (error) {
            // If table doesn't exist or empty, return 0
            return NextResponse.json({ views: 0 });
        }

        return NextResponse.json({ views: data?.views || 0 });
    } catch (err) {
        return NextResponse.json({ views: 0 }, { status: 500 });
    }
}

// POST: Increment visitor count
export async function POST() {
    try {
        // 1. Get current count
        const { data, error } = await supabase
            .from('site_stats')
            .select('views')
            .eq('id', 1)
            .single();

        let currentViews = 0;
        if (data) {
            currentViews = data.views;
        }

        // 2. Increment
        const { error: updateError } = await supabase
            .from('site_stats')
            .upsert({ id: 1, views: currentViews + 1 });

        if (updateError) {
            console.error("Error incrementing stats:", updateError);
            return NextResponse.json({ error: updateError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, views: currentViews + 1 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
ù*cascade08"(4371227e3f2279ee175423521aeed283c8d641d52Dfile:///c:/Users/kouki/.gemini/hifuu-kou-club/app/api/stats/route.js:file:///c:/Users/kouki/.gemini