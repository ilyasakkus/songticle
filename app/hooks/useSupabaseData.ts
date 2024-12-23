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

        if (artistError) throw artistError;

        // Group songs by album
        const albumsMap = new Map();
        songs.forEach(song => {
          if (!albumsMap.has(song.album_id)) {
            albumsMap.set(song.album_id, {
              id: song.album_id,
              artist_id: artist.id,
              title: song.album_name,
              cover_medium: song.cover_image
            });
          }
        });

        // Add albums to database
        const { error: albumsError } = await supabase
          .from('albums')
          .upsert(Array.from(albumsMap.values()))
          .select();

        if (albumsError) throw albumsError;

        // Add songs to database with only the required columns
        const songsToInsert = songs.map(song => ({
          id: song.id,
          album_id: song.album_id,
          artist_id: artist.id,
          title: song.title,
          preview_url: song.preview_url || '',
          duration: song.duration || 0,
          explicit_lyrics: song.explicit_lyrics || false
        }));

        const { error: songsError } = await supabase
          .from('songs')
          .upsert(songsToInsert)
          .select();

        if (songsError) throw songsError;

        return { artist, songs };
      }

      return { artist, songs };
    } catch (err) {
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
