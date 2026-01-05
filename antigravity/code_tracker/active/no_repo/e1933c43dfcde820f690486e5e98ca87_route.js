import { NextResponse } from 'next/server';
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

        // Use admin client if available to bypass RLS, otherwise try standard client
        const supabaseClient = supabaseAdmin || supabase;

        const { data, error } = await supabaseClient
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

        const { data: { publicUrl } } = supabaseClient
            .storage
            .from('uploads')
            .getPublicUrl(filePath);

        return NextResponse.json({ url: publicUrl });
    } catch (error) {
        console.error("Upload Route Error:", error);
        return NextResponse.json({ error: 'Upload failed', details: error.message }, { status: 500 });
    }
}
¤ *cascade08¤¥*cascade08¥§ *cascade08§¨*cascade08¨© *cascade08©¬*cascade08¬® *cascade08®½*cascade08½¾ *cascade08¾¿*cascade08¿Æ *cascade08ÆÕ*cascade08Õ× *cascade08×Û*cascade08Ûà *cascade08àá*cascade08áñ *cascade08ñò*cascade08òÚ *cascade08Úİ*cascade08İê *cascade08êë*cascade08ëí *cascade08íï*cascade08ïñ *cascade08ñò*cascade08òó *cascade08óù*cascade08ù‹ *cascade08‹*cascade08 *cascade08*cascade08‘ *cascade08‘“*cascade08“– *cascade08–š*cascade08šœ *cascade08œ*cascade08 *cascade08Ÿ*cascade08Ÿ  *cascade08 ¡*cascade08¡¢ *cascade08¢¬*cascade08¬­ *cascade08­°*cascade08°± *cascade08±´*cascade08´µ *cascade08µ½*cascade08½¾ *cascade08¾À*cascade08ÀÁ *cascade08ÁÃ*cascade08ÃÅ *cascade08ÅÆ*cascade08ÆÈ *cascade08ÈÍ*cascade08ÍÎ *cascade08ÎÛ*cascade08Û÷ *cascade08÷ú*cascade08úş *cascade08şÿ*cascade08ÿ‚ *cascade08‚„*cascade08„‰ *cascade08
‰” ”›*cascade08
›œ œŸ*cascade08
Ÿ¡ ¡¦*cascade08
¦§ §«*cascade08
«¬ ¬°*cascade08
°± ±»*cascade08
»¼ ¼È*cascade08
ÈÊ ÊÎ*cascade08
ÎĞ ĞÑ
ÑÒ ÒÔ
ÔÕ ÕÖ
ÖØ ØÚ
ÚÛ ÛÜ
Üİ İŞŞà*cascade08
àá áï*cascade08
ïğ ğø*cascade08
øú úü*cascade08
üı ış*cascade08
şÿ ÿ*cascade08
‚ ‚Š*cascade08
Š‹ ‹Œ*cascade08
Œ “*cascade08
“” ”—*cascade08
—˜ ˜›*cascade08
› ¥ *cascade08¥§*cascade08§© *cascade08©¬*cascade08¬® *cascade08®¯*cascade08¯° *cascade08°¶*cascade08¶¸ *cascade08¸¼*cascade08¼½ *cascade08½À*cascade08ÀÃ *cascade08ÃÊÊË *cascade08ËÑ*cascade08ÑÛ *cascade08Ûá*cascade08áâ *cascade08âã*cascade08ãä *cascade08äç*cascade08çõ *cascade08õö*cascade08ö÷ *cascade08÷ú*cascade08úû *cascade08ûü*cascade08ü‚	 *cascade08‚	„	*cascade08„		 *cascade08	‘	*cascade08‘	’	 *cascade08’	 	*cascade08 	£	 *cascade08£	¬	*cascade08¬	¼	 *cascade08¼	Ã	*cascade08Ã	Ä	 *cascade08Ä	Ì	*cascade08Ì	Ğ	 *cascade08Ğ	Ö	*cascade08Ö	×	 *cascade08×	Ù	*cascade08Ù	Û	 *cascade08Û	é	*cascade08é	ê	 *cascade08ê	ë	*cascade08ë	í	 *cascade08í	ï	*cascade08ï	ñ	 *cascade08ñ	õ	*cascade08õ	ö	 *cascade08ö	ƒ
*cascade08ƒ
‰
 *cascade08‰
¡
 *cascade08¡
ß
ß
ù
 *cascade08ù
 *cascade08—*cascade08—˜ *cascade08˜™*cascade08™š *cascade08š¢*cascade08¢£ *cascade08£¶ *cascade08¶¼*cascade08¼Ì *cascade08ÌÍ *cascade08ÍÔ*cascade08ÔÕ *cascade08Õá*cascade08áâ *cascade08âí*cascade08íî *cascade08îş*cascade08şÿ *cascade08ÿ€*cascade08€ *cascade08†*cascade08†‡ *cascade08‡Š*cascade08Š¾ *cascade08¾À*cascade08ÀÂ *cascade08ÂÃ*cascade08ÃÄ *cascade08ÄÅ*cascade08ÅÆ *cascade08ÆÇ*cascade08ÇÈ *cascade08ÈÉ*cascade08Éè *cascade08è× *cascade08×ïï *cascade082Efile:///c:/Users/kouki/.gemini/hifuu-kou-club/app/api/upload/route.js