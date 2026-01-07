import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { supabase, supabaseAdmin } from '../../../lib/supabase';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const theme = searchParams.get('theme');

        let query = supabase
            .from('news')
            .select('*')
            .order('created_at', { ascending: false });

        if (theme) {
            query = query.in('theme', [theme, 'both']);
        }

        const { data, error } = await query;

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load news' }, { status: 500 });
    }
}

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!supabaseAdmin) {
        return NextResponse.json({ error: 'Server configuration error: Missing Service Role Key' }, { status: 503 });
    }

    try {
        const body = await request.json();

        const theme = body.theme || 'both';
        const date = body.date || new Date().toISOString().split('T')[0].replace(/-/g, '.');

        let result;
        if (body.id) {
            // Update
            result = await supabaseAdmin
                .from('news')
                .update({
                    title: body.title,
                    content: body.content,
                    theme: theme,
                })
                .eq('id', body.id);
        } else {
            // Insert
            result = await supabaseAdmin
                .from('news')
                .insert({
                    date: date,
                    title: body.title,
                    content: body.content,
                    theme: theme
                });
        }

        if (result.error) throw result.error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save news' }, { status: 500 });
    }
}

export async function DELETE(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!supabaseAdmin) {
        return NextResponse.json({ error: 'Server configuration error: Missing Service Role Key' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const { error } = await supabaseAdmin
            .from('news')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
    }
}
