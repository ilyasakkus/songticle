const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;
const RAPID_API_HOST = 'deezerdevs-deezer.p.rapidapi.com';

interface DeezerTrack {
  id: number;
  title: string;
  title_short: string;
  title_version: string;
  duration: number;
  preview: string;
  artist: {
    id: number;
    name: string;
    picture: string;
    picture_small: string;
    picture_medium: string;
  };
  album: {
    id: number;
    title: string;
    cover: string;
    cover_small: string;
    cover_medium: string;
    cover_big: string;
    cover_xl: string;
  };
}

export async function searchDeezerArtist(query: string) {
  try {
    const response = await fetch(`https://${RAPID_API_HOST}/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY || '',
        'X-RapidAPI-Host': RAPID_API_HOST
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching Deezer:', error);
    throw error;
  }
}

export async function getTrackPreview(trackId: number): Promise<string | null> {
  try {
    const response = await fetch(`https://${RAPID_API_HOST}/track/${trackId}`, {
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY || '',
        'X-RapidAPI-Host': RAPID_API_HOST
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch track: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.preview || null;
  } catch (error) {
    console.error('Error getting track preview:', error);
    return null;
  }
}
