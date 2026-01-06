import { supabase } from '../../../lib/supabase';
import { NextResponse } from 'next/server';

// GET: Fetch current visitor count (Admin only checks are done in UI, but safe to be public or restricted)
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('site_stats')
            .select('views')
            .eq('id', 1)
            .single();

        let views = 0;
        if (!error && data) {
            views = data.views;
        }

        // Fetch storage usage
        const { data: storageData, error: storageError } = await supabase
            .rpc('get_storage_usage');

        let storageSize = 0;
        if (!storageError) {
            storageSize = storageData;
        }

        return NextResponse.json({ views, storage: storageSize });
    } catch (err) {
        return NextResponse.json({ views: 0, storage: 0 }, { status: 500 });
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
