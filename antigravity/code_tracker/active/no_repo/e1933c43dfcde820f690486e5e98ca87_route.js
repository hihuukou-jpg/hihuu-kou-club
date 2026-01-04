’import { NextResponse } from 'next/server';
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

        const { data, error } = await supabase
            .storage
            .from('uploads')
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            throw error;
        }

        const { data: { publicUrl } } = supabase
            .storage
            .from('uploads')
            .getPublicUrl(filePath);

        return NextResponse.json({ url: publicUrl });
    } catch (error) {
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
§ *cascade08§•*cascade08•ß *cascade08ß®*cascade08®© *cascade08©¨*cascade08¨Ø *cascade08Ø∞*cascade08∞∑ *cascade08∑∆*cascade08∆» *cascade08»Ã*cascade08Ã— *cascade08—“*cascade08“‚ *cascade08‚„*cascade08„À *cascade08ÀŒ*cascade08Œ€ *cascade08€‹*cascade08‹ﬁ *cascade08ﬁ‡*cascade08‡‚ *cascade08‚„*cascade08„‰ *cascade08‰Í*cascade08Í¸ *cascade08¸˛*cascade08˛ˇ *cascade08ˇÅ*cascade08ÅÇ *cascade08ÇÑ*cascade08Ñá *cascade08áã*cascade08ãç *cascade08çé*cascade08éè *cascade08èê*cascade08êë *cascade08ëí*cascade08íì *cascade08ìù*cascade08ùû *cascade08û°*cascade08°¢ *cascade08¢•*cascade08•¶ *cascade08¶Æ*cascade08ÆØ *cascade08Ø±*cascade08±≤ *cascade08≤¥*cascade08¥∂ *cascade08∂∑*cascade08∑π *cascade08πæ*cascade08æø *cascade08øÃ*cascade08ÃË *cascade08ËÎ*cascade08ÎÔ *cascade08Ô*cascade08Û *cascade08Ûı*cascade08ıÇ *cascade08ÇÑ*cascade08ÑÜ *cascade08Üâ*cascade08âã *cascade08ãå*cascade08åç *cascade08çì*cascade08ìï *cascade08ïô*cascade08ôö *cascade08öù*cascade08ù† *cascade08†°*cascade08°¢ *cascade08¢£*cascade08£§ *cascade08§¶*cascade08¶≤ *cascade08≤∏*cascade08∏π *cascade08π∫*cascade08∫ª *cascade08ªæ*cascade08æÃ *cascade08ÃÕ*cascade08ÕŒ *cascade08Œ—*cascade08—“ *cascade08“”*cascade08”Ÿ *cascade08Ÿ€*cascade08€Ê *cascade08ÊË*cascade08ËÈ *cascade08È˜*cascade08˜˙ *cascade08˙É*cascade08Éì *cascade08ìö*cascade08öõ *cascade08õ£*cascade08£ß *cascade08ß≠*cascade08≠Æ *cascade08Æ∞*cascade08∞≤ *cascade08≤¿*cascade08¿¡ *cascade08¡¬*cascade08¬ƒ *cascade08ƒ∆*cascade08∆» *cascade08»Ã*cascade08ÃÕ *cascade08Õ⁄*cascade08⁄‡ *cascade08‡í	*cascade08í	ß	 *cascade08ß	∞	*cascade08∞	±	 *cascade08±	≤	*cascade08≤	≥	 *cascade08≥	ª	*cascade08ª	º	 *cascade08º	ﬂ	*cascade08ﬂ	‡	 *cascade08‡	Á	*cascade08Á	Ë	 *cascade08Ë	Ù	*cascade08Ù	ı	 *cascade08ı	Ä
*cascade08Ä
Å
 *cascade08Å
ë
*cascade08ë
í
 *cascade08í
ì
*cascade08ì
î
 *cascade08î
ô
*cascade08ô
ö
 *cascade08ö
ù
*cascade08ù
—
 *cascade08—
”
*cascade08”
’
 *cascade08’
÷
*cascade08÷
◊
 *cascade08◊
ÿ
*cascade08ÿ
Ÿ
 *cascade08Ÿ
⁄
*cascade08⁄
€
 *cascade08€
‹
*cascade08‹
’ *cascade082Efile:///c:/Users/kouki/.gemini/hifuu-kou-club/app/api/upload/route.js