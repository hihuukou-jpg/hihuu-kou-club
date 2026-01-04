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
¤ *cascade08¤¥*cascade08¥§ *cascade08§¨*cascade08¨© *cascade08©¬*cascade08¬® *cascade08®½½¾ *cascade08¾¿*cascade08¿Æ *cascade08ÆÕ*cascade08Õ× *cascade08×Û*cascade08Ûà *cascade08àá*cascade08áñ *cascade08ñò*cascade08òÚ *cascade08Úİ*cascade08İê *cascade08êë*cascade08ëí *cascade08íï*cascade08ïñ *cascade08ñò*cascade08òó *cascade08óù*cascade08ù‹ *cascade08‹*cascade08 *cascade08*cascade08‘ *cascade08‘“*cascade08“– *cascade08–š*cascade08šœ *cascade08œ*cascade08 *cascade08Ÿ*cascade08Ÿ  *cascade08 ¡*cascade08¡¢ *cascade08¢¬*cascade08¬­ *cascade08­°*cascade08°± *cascade08±´*cascade08´µ *cascade08µ½*cascade08½¾ *cascade08¾À*cascade08ÀÁ *cascade08ÁÃ*cascade08ÃÅ *cascade08ÅÆ*cascade08ÆÈ *cascade08ÈÍ*cascade08ÍÎ *cascade08ÎÛ*cascade08Û÷ *cascade08÷ú*cascade08úş *cascade08şÿ*cascade08ÿ‚ *cascade08‚„*cascade08„‰ *cascade08‰××ß *cascade08ßá*cascade08áã *cascade08ãæ*cascade08æè *cascade08èé*cascade08éê *cascade08êğ*cascade08ğò *cascade08òö*cascade08ö÷ *cascade08÷ú*cascade08úı *cascade08ı€	€		 *cascade08	ƒ	ƒ		 *cascade08	“	*cascade08“	”	 *cascade08”	•	*cascade08•	–	 *cascade08–	™	*cascade08™	§	 *cascade08§	¨	*cascade08¨	©	 *cascade08©	¬	*cascade08¬	­	 *cascade08­	®	*cascade08®	´	 *cascade08´	¶	*cascade08¶	Á	 *cascade08Á	Ã	*cascade08Ã	Ä	 *cascade08Ä	Ò	*cascade08Ò	Õ	 *cascade08Õ	Ş	*cascade08Ş	î	 *cascade08î	õ	*cascade08õ	ö	 *cascade08ö	ş	*cascade08ş	‚
 *cascade08‚
ˆ
*cascade08ˆ
‰
 *cascade08‰
‹
*cascade08‹

 *cascade08
›
*cascade08›
œ
 *cascade08œ

*cascade08
Ÿ
 *cascade08Ÿ
¡
*cascade08¡
£
 *cascade08£
§
*cascade08§
¨
 *cascade08¨
µ
*cascade08µ
»
 *cascade08»
Ó
 *cascade08Ó
‘‘« *cascade08«À *cascade08ÀÉ*cascade08ÉÊ *cascade08ÊË*cascade08ËÌ *cascade08ÌÔ*cascade08ÔÕ *cascade08Õø*cascade08øù *cascade08ù€*cascade08€ *cascade08*cascade08 *cascade08™*cascade08™š *cascade08šª*cascade08ª« *cascade08«¬*cascade08¬­ *cascade08­²*cascade08²³ *cascade08³¶*cascade08¶ê *cascade08êì*cascade08ìî *cascade08îï*cascade08ïğ *cascade08ğñ*cascade08ñò *cascade08òó*cascade08óô *cascade08ôõ*cascade08õ” *cascade08”ÊÊƒ *cascade08ƒ››¼ *cascade082Efile:///c:/Users/kouki/.gemini/hifuu-kou-club/app/api/upload/route.js