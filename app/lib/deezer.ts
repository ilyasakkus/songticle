import { Artist, Song } from '../types/database.types';
import https from 'https';

const RAPID_API_KEY = 'd0ae159158msh252d03370e660d8p125f2djsn4ba29578ca04';
const RAPID_API_HOST = 'deezerdevs-deezer.p.rapidapi.com';

interface DeezerError {
  type: string;
  message: string;
  code: number;
}

interface DeezerResponse<T> {
  data?: T;
  error?: DeezerError;
}

interface DeezerTrack {
  id: number;
  title: string;
  title_short: string;
  title_version: string;
  duration: string;
  preview: string;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  rank: string;
  artist: {
    id: number;
    name: string;
    picture_small: string;
    picture_medium: string;
  };
  album: {
    id: number;
    title: string;
    cover_medium: string;
  };
}

interface DeezerSearchResponse {
  data: DeezerTrack[];
  total: number;
  next?: string;
}

function makeRequest(path: string): Promise<DeezerSearchResponse> {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      hostname: RAPID_API_HOST,
      port: null,
      path: path,
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST
      }
    };

    const req = https.request(options, (res) => {
      const chunks: Buffer[] = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const body = Buffer.concat(chunks);
        try {
          const data = JSON.parse(body.toString());
          resolve(data);
        } catch (error) {
          reject(new Error('Failed to parse response'));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

export async function searchDeezerArtist(query: string): Promise<DeezerResponse<{ artist: Artist | null, songs: Song[] }>> {
  try {
    const data = await makeRequest(`/search?q=${encodeURIComponent(query)}`);
    
    if (!data || !data.data || data.data.length === 0) {
      return { data: { artist: null, songs: [] } };
    }

    // Get the first result's artist
    const firstResult = data.data[0];
    console.log('First result:', firstResult); // Debug log

    const artist: Artist = {
      id: firstResult.artist.id,
      name: firstResult.artist.name,
      picture_small: firstResult.artist.picture_small,
      picture_medium: firstResult.artist.picture_medium
    };

    // Transform all tracks to our Song type with all required fields
    const songs: Song[] = data.data.map((item: DeezerTrack) => {
      console.log('Processing song item:', item); // Debug log
      return {
        id: item.id,
        album_id: item.album.id,
        artist_id: artist.id,
        title: item.title?.substring(0, 255) || '',
        title_short: item.title_short?.substring(0, 255) || item.title?.substring(0, 255) || '',
        title_version: item.title_version?.substring(0, 255) || '',
        duration: parseInt(item.duration) || 0,
        preview_url: item.preview?.substring(0, 255) || '',
        explicit_lyrics: Boolean(item.explicit_lyrics),
        explicit_content_lyrics: parseInt(String(item.explicit_content_lyrics)) || 0,
        explicit_content_cover: parseInt(String(item.explicit_content_cover)) || 0,
        rank: parseInt(item.rank) || 0,
        album_name: item.album.title || '',
        artist_name: item.artist.name || '',
        cover_image: item.album.cover_medium || ''
      };
    });

    console.log('Processed songs:', songs[0]); // Debug log

    return { data: { artist, songs } };
  } catch (err) {
    if (err instanceof Error) {
      return { 
        error: {
          type: 'API_ERROR',
          message: err.message,
          code: 500
        }
      };
    }
    return { 
      error: {
        type: 'UNKNOWN_ERROR',
        message: 'An unknown error occurred',
        code: 500
      }
    };
  }
}
