¸import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { supabase } from '../../../lib/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('characters')
            .select('*');

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load characters' }, { status: 500 });
    }
}

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();

        // Upsert character by ID
        const { error } = await supabase
            .from('characters')
            .upsert({
                id: body.id,
                name: body.name,
                role: body.role,
                description: body.description,
                color: body.color,
                image_url: body.image // matching table schema 'image_url' but body might be 'image'
            });

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save character' }, { status: 500 });
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
            .from('characters')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete character' }, { status: 500 });
    }
}
§ *cascade08§•*cascade08•ß *cascade08ß®*cascade08®© *cascade08©¨*cascade08¨Ø *cascade08Ø∞*cascade08∞∑ *cascade08∑æ*cascade08æø *cascade08ø¡*cascade08¡¬ *cascade08¬ƒ*cascade08ƒ≈ *cascade08≈«*cascade08«» *cascade08»…*cascade08…  *cascade08 À*cascade08Àä *cascade08äå*cascade08åê *cascade08êô*cascade08ô£ *cascade08£•*cascade08•¶ *cascade08¶©*cascade08©™ *cascade08™Ω*cascade08Ωæ *cascade08æ¡*cascade08¡¬ *cascade08¬√*cascade08√ƒ *cascade08ƒ≈*cascade08≈∆ *cascade08∆…*cascade08…  *cascade08 ﬂ*cascade08ﬂ‡ *cascade08‡„*cascade08„Ê *cascade08Êâ*cascade08âÄ *cascade08ÄÇ*cascade08ÇÖ *cascade08Öá*cascade08áà *cascade08àã*cascade08ãå *cascade08åè*cascade08è∏ *cascade08∏∫*cascade08∫¬ *cascade08¬»*cascade08»… *cascade08… *cascade08 Ã *cascade08Ã–*cascade08–— *cascade08—“*cascade08“” *cascade08”›*cascade08›ﬁ *cascade08ﬁ‡*cascade08‡· *cascade08·Ë*cascade08ËÈ *cascade08ÈÌ*cascade08ÌÓ *cascade08Ó˜*cascade08˜˛ *cascade08˛Ç*cascade08ÇÉ *cascade08ÉÑ*cascade08ÑÖ *cascade08Öò*cascade08òô *cascade08ôú*cascade08úù *cascade08ùû*cascade08ûü *cascade08ü†*cascade08†° *cascade08°§*cascade08§® *cascade08®Ω*cascade08Ω» *cascade08» *cascade08 œ *cascade08œ–*cascade08–— *cascade08—“*cascade08“” *cascade08”‘*cascade08‘’ *cascade08’ÿ*cascade08ÿ⁄ *cascade08⁄€*cascade08€Ê *cascade08ÊË*cascade08ËÌ *cascade08ÌÚ*cascade08Ú¯ *cascade08¯˝*cascade08˝à *cascade08àí*cascade08íì *cascade08ìó*cascade08óò *cascade08òù*cascade08ùû *cascade08û°*cascade08°∞ *cascade08∞±*cascade08±≥ *cascade08≥∂*cascade08∂∑ *cascade08∑∏*cascade08∏∫ *cascade08∫ª*cascade08ªº *cascade08ºΩ*cascade08Ωæ *cascade08æ¬*cascade08¬∆ *cascade08∆ *cascade08 Ã *cascade08ÃÕ*cascade08ÕŸ *cascade08Ÿ⁄*cascade08⁄€ *cascade08€„*cascade08„‰ *cascade08‰Á*cascade08ÁË *cascade08ËÛ*cascade08Ûı *cascade08ı˘*cascade08˘Ö	 *cascade08Ö	í	*cascade08í	ì	 *cascade08ì	ü	*cascade08ü	°	 *cascade08°	®	*cascade08®	©	 *cascade08©	≠	*cascade08≠	Æ	 *cascade08Æ	Ø	*cascade08Ø	∞	 *cascade08∞	ƒ	*cascade08ƒ	»	 *cascade08»	Ÿ	*cascade08Ÿ	„	 *cascade08„	Á	*cascade08Á	Ë	 *cascade08Ë	Í	*cascade08Í	¯	 *cascade08¯	˘	*cascade08˘	˙	 *cascade08˙	Ä
*cascade08Ä
Ç
 *cascade08Ç
É
*cascade08É
Ñ
 *cascade08Ñ
Ü
*cascade08Ü
á
 *cascade08á
å
*cascade08å
ç
 *cascade08ç
è
*cascade08è
Ê
 *cascade08Ê
Ö*cascade08Ö∑ *cascade08∑ª*cascade08ªº *cascade08ºΩ*cascade08Ωæ *cascade08æ¿*cascade08¿≠ *cascade08≠µ*cascade08µ∂ *cascade08∂∫*cascade08∫ª *cascade08ªº*cascade08º≈ *cascade08≈À*cascade08ÀÃ *cascade08Ã€*cascade08€‹ *cascade08‹›*cascade08›ﬁ *cascade08ﬁ‡*cascade08‡· *cascade08·‰*cascade08‰Â *cascade08ÂÊ*cascade08ÊÁ *cascade08ÁË*cascade08ËÈ *cascade08ÈÏ*cascade08Ï˙ *cascade08˙¸*cascade08¸˝ *cascade08˝ˇ*cascade08ˇÄ *cascade08ÄÅ*cascade08ÅÑ *cascade08Ñè*cascade08èë *cascade08ëì*cascade08ìî *cascade08îò*cascade08òö *cascade08öú*cascade08úØ *cascade08Ø∞*cascade08∞± *cascade08±∏*cascade08∏∫ *cascade08∫Ω*cascade08Ωæ *cascade08æ¬*cascade08¬ƒ *cascade08ƒ∆*cascade08∆— *cascade08—’*cascade08’÷ *cascade08÷◊*cascade08◊ÿ *cascade08ÿ⁄*cascade08⁄¸ *cascade082Ifile:///c:/Users/kouki/.gemini/hifuu-kou-club/app/api/characters/route.js