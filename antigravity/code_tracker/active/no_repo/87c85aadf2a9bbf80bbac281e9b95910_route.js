“
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

 *cascade086 *cascade086¦*cascade08¦§*cascade08§¨ *cascade08¨© *cascade08©ª*cascade08ª« *cascade08«®*cascade08®° *cascade08°± *cascade08±²*cascade08²¹ *cascade08¹À*cascade08ÀÁ *cascade08ÁÃ*cascade08ÃÄ *cascade08ÄÆ*cascade08ÆÇ *cascade08ÇÉ*cascade08ÉÊ *cascade08ÊË*cascade08ËÍ *cascade08ÍÎ*cascade08ÎŒ *cascade08Œ*cascade08‘ *cascade08‘”*cascade08”• *cascade08•›*cascade08› *cascade08¤*cascade08¤ª*cascade08ª« *cascade08«º*cascade08º» *cascade08»¼*cascade08¼½ *cascade08½Á*cascade08ÁÃ *cascade08ÃÙ*cascade08ÙÛ *cascade08Ûİ*cascade08İŞ *cascade08Şó*cascade08óô *cascade08ôû*cascade08ûı *cascade08ı€*cascade08€‚ *cascade08‚ƒ*cascade08ƒ… *cascade08…¨*cascade08¨© *cascade08©°*cascade08°± *cascade08±½*cascade08½á *cascade08áâ*cascade08âä *cascade08äå*cascade08åì *cascade08ìï *cascade08ïè *cascade08èê*cascade08êò *cascade08òö*cascade08öø *cascade08øú*cascade08úû *cascade08ûı*cascade08ı€ *cascade08€*cascade08’ *cascade08’”*cascade08”• *cascade08•—*cascade08—˜ *cascade08˜š*cascade08š *cascade08*cascade08Ÿ *cascade08Ÿ© *cascade08©®*cascade08®¯ *cascade08¯³*cascade08³¹ *cascade08¹º*cascade08º» *cascade08»¿*cascade08¿Í *cascade08ÍÕ*cascade08ÕÖ *cascade08ÖØ*cascade08ØÙ *cascade08ÙŞ*cascade08Şà *cascade08àã*cascade08ãé *cascade08éñ *cascade08ñó*cascade08óô *cascade08ôø*cascade08øù *cascade08ùú*cascade08úû *cascade08ûı*cascade08ış *cascade08ş…*cascade08…† *cascade08†Š*cascade08ŠŒ *cascade08Œ *cascade08 *cascade08“*cascade08“” *cascade08”–*cascade08–  *cascade08 ±*cascade08±¹ *cascade08¹¾*cascade08¾Ñ *cascade08ÑÓ*cascade08ÓÔ *cascade08ÔÖ*cascade08ÖÚ *cascade08Úî*cascade08îò *cascade08òó*cascade08óõ *cascade08õö*cascade08ö÷ *cascade08÷û*cascade08ûü *cascade08üÿ*cascade08ÿ	 *cascade08		*cascade08	‘	 *cascade08‘	Ÿ	*cascade08Ÿ	³	 *cascade08³	´	*cascade08´	¸	 *cascade08¸	º	*cascade08º	»	 *cascade08»	¾	*cascade08¾	¿	 *cascade08¿	Á	*cascade08Á	Ñ	 *cascade08Ñ	Ú	*cascade08Ú	Û	 *cascade08Û	ä	*cascade08ä	‡
 *cascade08‡
Š
*cascade08Š
‹
 *cascade08‹

*cascade08
›
 *cascade08›
¤
*cascade08¤
¥
 *cascade08¥
¦
*cascade08¦
ª
 *cascade08ª
®
*cascade08®
¯
 *cascade08¯
Ç
*cascade08Ç
È
 *cascade08È
Ë
*cascade08Ë
Ì
 *cascade08Ì
Ï
*cascade08Ï
Ğ
 *cascade08Ğ
Ô
*cascade08Ô
Õ
 *cascade08Õ
Ù
*cascade08Ù
Ú
 *cascade08Ú
ä
*cascade08ä
å
 *cascade08å
æ
*cascade08æ
ç
 *cascade08ç
ë
*cascade08ë
ì
 *cascade08ì
ñ
*cascade08ñ
‹ *cascade08‹Œ*cascade08Œ *cascade08*cascade08 *cascade08’*cascade08’” *cascade08”œ*cascade08œ *cascade08¡*cascade08¡¢ *cascade08¢¤*cascade08¤¥ *cascade08¥§*cascade08§¨ *cascade08¨ª*cascade08ª« *cascade08«®*cascade08®¯ *cascade08¯±*cascade08±É *cascade08ÉÊ *cascade08Êğ*cascade08ğñ *cascade08ñø*cascade08øù *cascade08ù‹*cascade08‹Œ *cascade08Œ*cascade08 *cascade08•*cascade08•– *cascade08–Ì*cascade08ÌÏ *cascade08ÏÒ*cascade08ÒÓ *cascade08ÓŒ*cascade08Œ *cascade08“*cascade08“” *cascade08” *cascade08 ¡ *cascade08¡±*cascade08±² *cascade08²³*cascade08³´ *cascade08´à*cascade08àé *cascade08éş*cascade08ş› *cascade08›°*cascade08°± *cascade08±º*cascade08º¼ *cascade08¼ï*cascade08ïğ *cascade08ğË *cascade08ËÏ*cascade08ÏÑ *cascade08ÑÚ*cascade08Úã *cascade08ãé*cascade08éê *cascade08êù*cascade08ùú *cascade08úû*cascade08ûü *cascade08ü€*cascade08€ƒ *cascade08ƒ…*cascade08…“ *cascade08“•*cascade08•– *cascade08–˜*cascade08˜™ *cascade08™š*cascade08š *cascade08 *cascade08 ¡ *cascade08¡¢*cascade08¢£ *cascade08£¬*cascade08¬­ *cascade08­±*cascade08±³ *cascade08³µ*cascade08µÇ *cascade08ÇÈ*cascade08ÈÉ *cascade08ÉÌ*cascade08ÌÍ *cascade08ÍÑ*cascade08ÑÔ *cascade08ÔÖ*cascade08Ö× *cascade08×Ü*cascade08Üİ *cascade08İß*cascade08ß“ *cascade08“ä *cascade08äé*cascade08é *cascade08‘ *cascade08‘“ *cascade082Dfile:///c:/Users/kouki/.gemini/hifuu-kou-club/app/api/diary/route.js