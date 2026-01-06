import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const theme = searchParams.get('theme');

        let query = supabaseAdmin
            .from('illustrations')
            .select('*')
            .order('created_at', { ascending: false });

        if (theme) {
            // Logic: If theme is requested (e.g. 'omote'), get 'omote' AND 'both'.
            // If theme is 'ura', get 'ura' AND 'both'.
            // Supabase 'in' filter is useful here.
            query = query.in('theme', [theme, 'both']);
        }

        const { data, error } = await query;

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        // Basic admin check - in real app, verify session/token properly
        const body = await request.json();
        const { title, description, theme = 'omote', image_url } = body;

        // Validation
        if (!title || !image_url) {
            return NextResponse.json({ error: 'Title and Image URL are required' }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from('illustrations')
            .insert([{ title, description, theme, image_url }])
            .select();

        if (error) throw error;

        return NextResponse.json(data[0]);

    } catch (error) {
        console.error("Illustration Post Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('illustrations')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
