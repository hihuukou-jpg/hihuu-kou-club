import { supabase } from '../../lib/supabase';
import DiaryClient from './DiaryClient';

export const revalidate = 0; // Disable static caching for dynamic data

async function getDiary() {
    const { data: diary, error } = await supabase
        .from('diary')
        .select('*')
        .order('date', { ascending: false }); // Using 'date' as per JSON structure

    if (error) {
        console.error('Error fetching diary:', error);
        return [];
    }
    return diary;
}

export default async function DiaryPage() {
    const diary = await getDiary();
    return <DiaryClient diary={diary} />;
}
