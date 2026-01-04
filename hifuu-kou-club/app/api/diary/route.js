
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { supabase } from '../../../lib/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('diary')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load diary' }, { status: 500 });
    }
}

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();

        const entry = {
            date: body.date,
            title: body.title,
            content: body.content,
            progress: body.progress
        };

        let result;
        if (body.id) {
            // Update
            result = await supabase
                .from('diary')
                .update(entry)
                .eq('id', body.id);
        } else {
            // Insert
            result = await supabase
                .from('diary')
                .insert(entry);
        }

        if (result.error) throw result.error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save diary' }, { status: 500 });
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
            .from('diary')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete diary' }, { status: 500 });
    }
}

