import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';
import type { Artist, Song } from '../types/database.types';

export function useSupabaseData<T>(
  table: keyof Database['public']['Tables']
) {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: result, error } = await supabase
          .from(table)
          .select('*');

        if (error) throw error;

        setData(result as T[]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred while fetching data');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [table]);

  return { data, isLoading, error };
}

export function useArtistSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<{ artist: Artist | null, songs: Song[] }>({
    artist: null,
    songs: []
  });

  const searchArtist = async (query: string, addToDb: boolean = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: searchError } = await supabase
        .from('artists')
        .select(`
          *,
          albums (
            *,
            songs (*)
          )
        `)
        .ilike('name', `%${query}%`)
        .single();

      if (searchError) throw searchError;

      if (data) {
        setSearchResults({
          artist: data,
          songs: data.albums?.flatMap(album => album.songs) || []
        });
      } else {
        setSearchResults({ artist: null, songs: [] });
      }

      return searchResults;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during search');
      }
      return { artist: null, songs: [] };
    } finally {
      setIsLoading(false);
    }
  };

  return { searchArtist, isLoading, error, searchResults };
}
