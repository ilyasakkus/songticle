import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { searchDeezerArtist } from '../lib/deezer';
import { Artist, Song } from '../types/database.types';

export function useArtistSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchArtist = async (query: string, addToDb: boolean = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const { artist, songs } = await searchDeezerArtist(query);

      if (addToDb && artist) {
        // Add artist to database
        const { error: artistError } = await supabase
          .from('artists')
          .upsert({
            id: artist.id,
            name: artist.name,
            picture_small: artist.picture_small,
            picture_medium: artist.picture_medium
          })
          .select();

        if (artistError) {
          console.error('Artist insert error:', artistError);
          throw artistError;
        }

        // Group songs by album
        const albumsMap = new Map();
        songs.forEach(song => {
          if (!albumsMap.has(song.album_id)) {
            albumsMap.set(song.album_id, {
              id: song.album_id,
              artist_id: artist.id,
              title: song.album_name?.substring(0, 255) || '',
              cover_medium: song.cover_image?.substring(0, 255) || ''
            });
          }
        });

        // Add albums to database
        const { error: albumsError } = await supabase
          .from('albums')
          .upsert(Array.from(albumsMap.values()))
          .select();

        if (albumsError) {
          console.error('Albums insert error:', albumsError);
          throw albumsError;
        }

        // Add songs to database with all required fields
        const songsToInsert = songs.map(song => {
          // Log each song before insertion
          console.log('Preparing song for insert:', song);
          
          return {
            id: song.id,
            album_id: song.album_id,
            artist_id: artist.id,
            title: song.title?.substring(0, 255) || '',
            title_short: song.title_short?.substring(0, 255) || '',
            title_version: song.title_version?.substring(0, 255) || '',
            duration: song.duration,
            preview_url: song.preview_url?.substring(0, 255) || '',
            explicit_lyrics: Boolean(song.explicit_lyrics),
            explicit_content_lyrics: song.explicit_content_lyrics || 0,
            explicit_content_cover: song.explicit_content_cover || 0,
            rank: song.rank || 0,
            album_name: song.album_name || '',
            artist_name: song.artist_name || '',
            cover_image: song.cover_image || ''
          };
        });

        const { error: songsError } = await supabase
          .from('songs')
          .upsert(songsToInsert)
          .select();

        if (songsError) {
          console.error('Songs insert error:', songsError);
          throw songsError;
        }

        return { artist, songs };
      }

      return { artist, songs };
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message);
      return { artist: null, songs: [] };
    } finally {
      setIsLoading(false);
    }
  };

  return { searchArtist, isLoading, error };
}

export function useStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStories = async () => {
    try {
      const { data, error: err } = await supabase
        .from('stories')
        .select('*, profiles(*), songs(*), likes(count), comments(count)')
        .order('created_at', { ascending: false });

      if (err) throw err;
      setStories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return { stories, loading, error };
}
