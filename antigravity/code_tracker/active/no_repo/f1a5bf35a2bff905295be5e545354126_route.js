ÿ
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { supabase } from '../../../lib/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('created_at', { ascending: false });

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

    try {
        const body = await request.json();
        const date = new Date().toISOString().split('T')[0].replace(/-/g, '.');

        const { error } = await supabase
            .from('news')
            .insert({
                date: date,
                title: body.title,
                content: body.content
            });

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save news' }, { status: 500 });
    }
}
¤ *cascade08¤¥*cascade08¥§ *cascade08§¨*cascade08¨© *cascade08©¬*cascade08¬¯ *cascade08¯°*cascade08°· *cascade08·¾*cascade08¾¿ *cascade08¿Á*cascade08ÁÂ *cascade08ÂÆ*cascade08ÆÈ *cascade08ÈÉ*cascade08ÉÊ *cascade08ÊË*cascade08ËŠ *cascade08ŠŒ*cascade08Œ *cascade08™*cascade08™¢ *cascade08¢¹*cascade08¹º *cascade08ºÂ*cascade08ÂÃ *cascade08ÃÓ*cascade08ÓÔ *cascade08ÔÕ*cascade08ÕØ *cascade08ØÚ*cascade08ÚÛ *cascade08Ûğ*cascade08ğñ *cascade08ñø*cascade08øú *cascade08úı*cascade08ıÿ *cascade08ÿ€*cascade08€‚ *cascade08‚*cascade08 *cascade08–*cascade08–š *cascade08š¿*cascade08¿´ *cascade08´¶*cascade08¶¹ *cascade08¹½*cascade08½÷ *cascade08÷ø*cascade08øû *cascade08û‰*cascade08‰‹ *cascade08‹*cascade08 *cascade08‘*cascade08‘’ *cascade08’—*cascade08—™ *cascade08™¡*cascade08¡¤ *cascade08¤¥*cascade08¥¦ *cascade08¦¨*cascade08¨ª *cascade08ª®*cascade08®± *cascade08±²*cascade08²Ç *cascade08ÇÉ*cascade08ÉÊ *cascade08ÊĞ*cascade08ĞÓ *cascade08Óá*cascade08áğ *cascade08ğö*cascade08ö÷ *cascade08÷ø*cascade08øù *cascade08ùû*cascade08ûŠ *cascade08ŠŒ*cascade08Œ *cascade08*cascade08 *cascade08*cascade08’ *cascade08’Ÿ*cascade08Ÿ§ *cascade08§©*cascade08©­ *cascade08­®*cascade08®² *cascade08²¶*cascade08¶â *cascade08âæ*cascade08æ…	 *cascade08…	‰	*cascade08‰	Š	 *cascade08Š	‹	*cascade08‹	š	 *cascade08š	›	*cascade08›		 *cascade08	¡	*cascade08¡	¤	 *cascade08¤	¦	*cascade08¦	ª	 *cascade08ª	­	*cascade08­	ˆ
 *cascade08ˆ
§
*cascade08§
Ù
 *cascade08Ù
İ
*cascade08İ
ÿ
 *cascade082Cfile:///c:/Users/kouki/.gemini/hifuu-kou-club/app/api/news/route.js