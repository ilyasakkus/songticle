import { Artist, Album, Song } from '../types/database.types';

const RAPID_API_KEY = 'd0ae159158msh252d03370e660d8p125f2djsn4ba29578ca04';
const RAPID_API_HOST = 'deezerdevs-deezer.p.rapidapi.com';

interface DeezerTrack {
  id: number;
  title: string;
  duration: number;
  preview: string;
  artist: {
    id: number;
    name: string;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    nb_fan: number;
  };
  album: {
    id: number;
    title: string;
    cover_small: string;
    cover_medium: string;
    cover_big: string;
    release_date: string;
  };
}

interface DeezerSearchResponse {
  data: DeezerTrack[];
  total: number;
  next?: string;
}

export async function searchDeezer(query: string): Promise<{
  artists: Artist[];
  albums: Album[];
  songs: Song[];
}> {
  try {
    const response = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          'x-rapidapi-key': RAPID_API_KEY,
          'x-rapidapi-host': RAPID_API_HOST,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Deezer API');
    }

    const data: DeezerSearchResponse = await response.json();

    // Create maps to store unique artists and albums
    const artistsMap = new Map<number, Artist>();
    const albumsMap = new Map<number, Album>();
    const songs: Song[] = [];

    // Process each track
    data.data.forEach((track) => {
      // Add artist if not already added
      if (!artistsMap.has(track.artist.id)) {
        artistsMap.set(track.artist.id, {
          id: track.artist.id,
          name: track.artist.name,
          picture_small: track.artist.picture_small,
          picture_medium: track.artist.picture_medium,
          picture_big: track.artist.picture_big,
          nb_fan: track.artist.nb_fan,
          created_at: new Date().toISOString(),
        });
      }

      // Add album if not already added
      if (!albumsMap.has(track.album.id)) {
        albumsMap.set(track.album.id, {
          id: track.album.id,
          artist_id: track.artist.id,
          title: track.album.title,
          cover_small: track.album.cover_small,
          cover_medium: track.album.cover_medium,
          cover_big: track.album.cover_big,
          release_date: track.album.release_date,
          created_at: new Date().toISOString(),
        });
      }

      // Add song
      songs.push({
        id: track.id,
        album_id: track.album.id,
        artist_id: track.artist.id,
        title: track.title,
        duration: track.duration,
        preview_url: track.preview,
        created_at: new Date().toISOString(),
      });
    });

    return {
      artists: Array.from(artistsMap.values()),
      albums: Array.from(albumsMap.values()),
      songs: songs,
    };
  } catch (error) {
    console.error('Error fetching from Deezer:', error);
    throw error;
  }
}
