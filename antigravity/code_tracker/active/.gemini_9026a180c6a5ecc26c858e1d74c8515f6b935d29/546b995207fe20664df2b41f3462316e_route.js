¼import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { supabase, supabaseAdmin } from '../../../lib/supabase';

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        // Use Admin client to bypass RLS for uploads
        // If supabaseAdmin is missing (no service key), fall back to public client (might fail)
        const client = supabaseAdmin || supabase;

        const { data, error } = await client
            .storage
            .from('uploads')
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            console.error("Supabase Storage Error:", error);
            throw error;
        }

        const { data: { publicUrl } } = supabase
            .storage
            .from('uploads')
            .getPublicUrl(filePath);

        return NextResponse.json({ url: publicUrl });
    } catch (error) {
        console.error("Upload Route Error:", error);
        return NextResponse.json({ error: 'Upload failed', details: error.message }, { status: 500 });
    }
}
¼*cascade08"(9026a180c6a5ecc26c858e1d74c8515f6b935d292Efile:///C:/Users/kouki/.gemini/hifuu-kou-club/app/api/upload/route.js:file:///C:/Users/kouki/.gemini