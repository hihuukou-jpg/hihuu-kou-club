import { supabase } from '../../lib/supabase';
import NewsClient from './NewsClient';

export const revalidate = 0; // Disable static caching for dynamic data

async function getNews() {
    const { data: news, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false }); // Assuming 'created_at' or 'date' for sorting

    if (error) {
        console.error('Error fetching news:', error);
        return [];
    }
    return news;
}

export default async function NewsPage() {
    const news = await getNews();
    return <NewsClient news={news} />;
}
