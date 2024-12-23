import { Artist, Song } from '../types/database.types';
import https from 'https';

const RAPID_API_KEY = 'd0ae159158msh252d03370e660d8p125f2djsn4ba29578ca04';
const RAPID_API_HOST = 'deezerdevs-deezer.p.rapidapi.com';

function makeRequest(path: string): Promise<any> {
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

export async function searchDeezerArtist(query: string): Promise<{ artist: Artist, songs: Song[] }> {
  try {
    const data = await makeRequest(`/search?q=${encodeURIComponent(query)}`);
    
    if (!data || !data.data || data.data.length === 0) {
      return { artist: null, songs: [] };
    }

    // Get the first result's artist
    const firstResult = data.data[0];
    const artist: Artist = {
      id: firstResult.artist.id,
      name: firstResult.artist.name,
      picture: firstResult.artist.picture_medium
    };

    // Transform all tracks to our Song type
    const songs: Song[] = data.data.map((item: any) => ({
      id: item.id,
      artist_id: item.artist.id,
      artist_name: item.artist.name,
      title: item.title,
      album_name: item.album.title,
      preview_url: item.preview,
      cover_image: item.album.cover_medium
    }));

    return { artist, songs };
  } catch (error) {
    console.error('Error searching Deezer:', error);
    throw new Error('Failed to search for artist and songs');
  }
}
