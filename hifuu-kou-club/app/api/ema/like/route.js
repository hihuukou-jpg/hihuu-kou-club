
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
    try {
        const body = await request.json();
        const { id, increment = true } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const rpcName = increment ? 'increment_ema_likes' : 'decrement_ema_likes';
        const { error } = await supabase.rpc(rpcName, { row_id: id });

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
