
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('ema_messages')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { content } = body;

        if (!content || content.trim().length === 0) {
            return NextResponse.json({ error: 'Comment cannot be empty' }, { status: 400 });
        }

        if (content.length > 140) {
            return NextResponse.json({ error: 'Comment too long' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('ema_messages')
            .insert([{ content }])
            .select();

        if (error) throw error;

        return NextResponse.json(data[0]);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
