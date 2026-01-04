import { supabase } from '../../lib/supabase';
import CharacterClient from './CharacterClient';

export const revalidate = 0; // Disable static caching for dynamic data

async function getCharacters() {
    const { data: characters, error } = await supabase
        .from('characters')
        .select('*');

    if (error) {
        console.error('Error fetching characters:', error);
        return [];
    }
    return characters;
}

export default async function CharactersPage() {
    const characters = await getCharacters();
    return <CharacterClient characters={characters} />;
}
