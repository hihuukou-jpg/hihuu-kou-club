import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase'; // Import supabaseAdmin
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('ema_messages')
            .select('id, content, likes, created_at') // Exclude secret_key
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

        // secret_key generates automatically by default
        const { data, error } = await supabase
            .from('ema_messages')
            .insert([{ content }])
            .select() // This returns all columns including secret_key
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const key = searchParams.get('key'); // From client localStorage

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        // 1. Check Admin Session
        const session = await getServerSession(authOptions);
        const isAdmin = !!session;

        let authorized = isAdmin;

        // 2. If not admin, check Secret Key
        if (!authorized && key) {
            // Retrieve the record's secret key
            const { data: record, error: fetchError } = await supabase
                .from('ema_messages')
                .select('secret_key')
                .eq('id', id)
                .single();

            if (!fetchError && record && record.secret_key === key) {
                authorized = true;
            }
        }

        if (!authorized) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Use Admin client for deletion to bypass RLS
        const client = supabaseAdmin || supabase;
        if (!supabaseAdmin) console.warn("Service Role Key missing, deletion may fail due to RLS");

        // Perform Delete
        const { error } = await client
            .from('ema_messages')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, content, key } = body;

        if (!id || !content) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

        // 1. Check Admin Session
        const session = await getServerSession(authOptions);
        const isAdmin = !!session;

        let authorized = isAdmin;

        // 2. If not admin, check Secret Key
        if (!authorized && key) {
            const { data: record, error: fetchError } = await supabase
                .from('ema_messages')
                .select('secret_key')
                .eq('id', id)
                .single();

            if (!fetchError && record && record.secret_key === key) {
                authorized = true;
            }
        }

        if (!authorized) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Use Admin client for update to bypass RLS
        const client = supabaseAdmin || supabase;

        // Perform Update
        const { data, error } = await client
            .from('ema_messages')
            .update({ content })
            .eq('id', id)
            .select('id, content, created_at')
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
