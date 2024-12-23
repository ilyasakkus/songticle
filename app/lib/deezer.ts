import axios from 'axios';
import { Artist, Album, Song } from '../types/database.types';

const DEEZER_API_BASE = 'https://api.deezer.com';

export async function searchDeezerArtist(query: string): Promise<Artist[]> {
  try {
    const response = await axios.get(`${DEEZER_API_BASE}/search/artist`, {
      params: {
        q: query,
        limit: 10
      }
    });

    return response.data.data.map((artist: any) => ({
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
    const response = await axios.get(`${DEEZER_API_BASE}/artist/${artistId}/albums`);

    return response.data.data.map((album: any) => ({
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
    const response = await axios.get(`${DEEZER_API_BASE}/album/${albumId}/tracks`);

    return response.data.data.map((track: any) => ({
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
