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

interface Album {
  songs: Song[]
}

export function useArtistSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<{ artist: Artist | null, songs: Song[] }>({
    artist: null,
    songs: []
  });

  const searchArtist = async (query: string) => {
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
          songs: data.albums?.flatMap((album: Album) => album.songs) || []
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

type Story = {
  id: number
  content: string
  created_at: string
  song_id: number
  user_id: string
  songs: {
    id: number
    title: string
    artist_id: number
    cover_image: string | null
    artists: {
      name: string
    } | null
  } | null
  profiles: {
    full_name: string
  } | null
}

export const useStories = () => {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data: storiesData, error: storiesError } = await supabase
          .from('stories')
          .select(`
            id,
            content,
            created_at,
            song_id,
            user_id,
            songs!inner (
              id,
              title,
              artist_id,
              cover_image,
              artists!inner (
                name
              )
            ),
            profiles!inner (
              full_name
            )
          `)
          .order('created_at', { ascending: false })

        if (storiesError) {
          console.error('Stories error:', storiesError)
          throw storiesError
        }

        if (storiesData) {
          const transformedStories = storiesData.map(story => ({
            ...story,
            songs: {
              ...story.songs[0],
              artists: story.songs[0].artists[0]
            },
            profiles: story.profiles[0]
          }))
          setStories(transformedStories)
        }
      } catch (err) {
        console.error('Error fetching stories:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch stories')
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [])

  return { stories, loading, error }
}
