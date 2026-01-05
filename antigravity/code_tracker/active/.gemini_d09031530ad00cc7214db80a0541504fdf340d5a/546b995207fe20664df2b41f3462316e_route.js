™import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { supabase } from '../../../lib/supabase';

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

        // Simplified: Use standard client (requires RLS policy change)
        const { data, error } = await supabase
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
Ö Öá*cascade08
áà àâ*cascade08
âã ãç*cascade08
çè èê*cascade08
êë ëî*cascade08
îñ ñó*cascade08
óò òö*cascade08
öõ õú*cascade08
úû û†*cascade08
†° °¢*cascade08
¢£ £§*cascade08
§¶ ¶ß*cascade08
ß® ®™*cascade08
™´ ´¨*cascade08
¨≠ ≠Æ*cascade08
ÆØ Ø≤*cascade08
≤¥ ¥µ*cascade08
µ∏ ∏π*cascade08
πæ æø*cascade08
ø¿ ¿¡*cascade08
¡È È*cascade08
™ "(d09031530ad00cc7214db80a0541504fdf340d5a2Efile:///C:/Users/kouki/.gemini/hifuu-kou-club/app/api/upload/route.js:file:///C:/Users/kouki/.gemini