import { Artist, Album, Song } from '../types/database.types';
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

export async function searchDeezerArtist(query: string): Promise<Artist[]> {
  try {
    const data = await makeRequest(`/search/artist?q=${encodeURIComponent(query)}`);
    
    return data.data.map((artist: any) => ({
      id: artist.id,
      name: artist.name,
      picture_small: artist.picture_small,
      picture_medium: artist.picture_medium,
      picture_big: artist.picture_big,
      picture_xl: artist.picture_xl
    }));
  } catch (error) {
    console.error('Error searching Deezer artist:', error);
    throw new Error('Failed to search for artist');
  }
}

export async function getArtistAlbums(artistId: number): Promise<Album[]> {
  try {
    const data = await makeRequest(`/artist/${artistId}/albums`);
    
    return data.data.map((album: any) => ({
      id: album.id,
      artist_id: artistId,
      title: album.title,
      cover_small: album.cover_small,
      cover_medium: album.cover_medium,
      cover_big: album.cover_big,
      cover_xl: album.cover_xl,
      release_date: album.release_date
    }));
  } catch (error) {
    console.error('Error fetching artist albums:', error);
    throw new Error('Failed to fetch artist albums');
  }
}

export async function getAlbumTracks(albumId: number): Promise<Song[]> {
  try {
    const data = await makeRequest(`/album/${albumId}/tracks`);
    
    return data.data.map((track: any) => ({
      id: track.id,
      album_id: albumId,
      artist_id: track.artist.id,
      title: track.title,
      title_short: track.title_short || track.title,
      title_version: track.title_version || '',
      duration: track.duration,
      preview_url: track.preview,
      explicit_lyrics: track.explicit_lyrics,
      explicit_content_lyrics: track.explicit_content_lyrics || 0,
      explicit_content_cover: track.explicit_content_cover || 0,
      rank: track.rank || 0
    }));
  } catch (error) {
    console.error('Error fetching album tracks:', error);
    throw new Error('Failed to fetch album tracks');
  }
}
