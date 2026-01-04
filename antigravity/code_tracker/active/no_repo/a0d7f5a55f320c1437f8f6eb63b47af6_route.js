†import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { supabase } from '../../../lib/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('videos')
            .select('*')
            .order('created_at', { ascending: false });

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
                url: body.url
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
§ *cascade08§•*cascade08•ß *cascade08ß®*cascade08®© *cascade08©¨*cascade08¨Ø *cascade08Ø∞*cascade08∞∑ *cascade08∑æ*cascade08æø *cascade08ø¡*cascade08¡¬ *cascade08¬ƒ*cascade08ƒ≈ *cascade08≈«*cascade08«» *cascade08»…*cascade08…À *cascade08ÀÃ*cascade08Ã” *cascade08”‘*cascade08‘◊ *cascade08◊ÿ*cascade08ÿË *cascade08ËÎ*cascade08ÎÑ *cascade08Ñà*cascade08àä *cascade08äå*cascade08åê *cascade08êë*cascade08ëí *cascade08íó*cascade08óö *cascade08öú*cascade08úù *cascade08ù†*cascade08†¢ *cascade08¢™*cascade08™¥ *cascade08¥∑*cascade08∑∏ *cascade08∏π*cascade08πª *cascade08ªΩ*cascade08Ωæ *cascade08æ¡*cascade08¡¬ *cascade08¬≈*cascade08≈’ *cascade08’÷*cascade08÷⁄ *cascade08⁄‹*cascade08‹› *cascade08›‡*cascade08‡Ô *cascade08Ô˜*cascade08˜¯ *cascade08¯˘*cascade08˘˙ *cascade08˙˚*cascade08˚˝ *cascade08˝Ä*cascade08ÄÅ *cascade08ÅÉ*cascade08ÉÑ *cascade08ÑÖ*cascade08Öà *cascade08àâ*cascade08âä *cascade08äã*cascade08ãç *cascade08çì*cascade08ìî *cascade08îï*cascade08ïñ *cascade08ñ©*cascade08©™ *cascade08™±*cascade08±≥ *cascade08≥∂*cascade08∂∑ *cascade08∑º*cascade08º‡ *cascade08‡·*cascade08·„ *cascade08„‰*cascade08‰Ë *cascade08ËÍ*cascade08Í¯ *cascade08¯˙*cascade08˙˚ *cascade08˚˝*cascade08˝˛ *cascade08˛Å*cascade08Åã *cascade08ãç*cascade08çé *cascade08éè*cascade08èê *cascade08êí*cascade08íü *cascade08ü†*cascade08†° *cascade08°¢*cascade08¢£ *cascade08£•*cascade08•¶ *cascade08¶®*cascade08®© *cascade08©™*cascade08™≠ *cascade08≠Æ*cascade08Æπ *cascade08πΩ*cascade08Ωæ *cascade08æø*cascade08ø¡ *cascade08¡√*cascade08√∆ *cascade08∆»*cascade08»… *cascade08…ﬂ*cascade08ﬂ„ *cascade08„È*cascade08ÈÍ *cascade08ÍÏ*cascade08ÏÌ *cascade08Ìˇ*cascade08ˇÅ *cascade08ÅÇ*cascade08ÇÉ *cascade08Éñ*cascade08ñ® *cascade08®©*cascade08©™ *cascade08™∞*cascade08∞≤ *cascade08≤≥*cascade08≥¥ *cascade08¥∂*cascade08∂∑ *cascade08∑º*cascade08ºΩ *cascade08Ωø*cascade08øé	 *cascade08é	≠	*cascade08≠	ﬂ *cascade08ﬂ·*cascade08·‚ *cascade08‚‰*cascade08‰Â *cascade08ÂË*cascade08ËÚ *cascade08ÚÙ*cascade08Ùı *cascade08ıˆ*cascade08ˆ˜ *cascade08˜˘*cascade08˘Ü *cascade08Üá*cascade08áà *cascade08àâ*cascade08âä *cascade08äå*cascade08åç *cascade08çè*cascade08èê *cascade08êë*cascade08ëî *cascade08îï*cascade08ï† *cascade08†°*cascade08°£ *cascade08£•*cascade08•¶ *cascade08¶ß*cascade08ß® *cascade08®©*cascade08©¨ *cascade08¨Ø*cascade08Ø∞ *cascade08∞±*cascade08±≤ *cascade08≤ª*cascade08ªº *cascade08º¿*cascade08¿¬ *cascade08¬ƒ*cascade08ƒ÷ *cascade08÷◊*cascade08◊ÿ *cascade08ÿ€*cascade08€‹ *cascade08‹‡*cascade08‡„ *cascade08„Â*cascade08ÂÊ *cascade08ÊÎ*cascade08ÎÏ *cascade08ÏÓ*cascade08Ó† *cascade082Efile:///c:/Users/kouki/.gemini/hifuu-kou-club/app/api/videos/route.js