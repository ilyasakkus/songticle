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
          .upsert([artist])
          .select();

        if (artistError) throw artistError;

        // Add songs to database
        const { error: songsError } = await supabase
          .from('songs')
          .upsert(songs)
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
