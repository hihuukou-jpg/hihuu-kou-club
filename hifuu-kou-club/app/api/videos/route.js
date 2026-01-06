import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { supabase } from '../../../lib/supabase';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const theme = searchParams.get('theme');

        let query = supabase
            .from('videos')
            .select('*')
            .order('created_at', { ascending: false });

        if (theme) {
            query = query.in('theme', [theme, 'both']);
        }

        const { data, error } = await query;

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load videos' }, { status: 500 });
    }
}

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();

        const { error } = await supabase
            .from('videos')
            .insert({
                title: body.title,
                url: body.url,
                theme: body.theme || 'both'
            });

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save video' }, { status: 500 });
    }
}

export async function DELETE(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const { error } = await supabase
            .from('videos')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
    }
}
