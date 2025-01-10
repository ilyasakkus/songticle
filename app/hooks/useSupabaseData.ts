import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';
import type { Artist, Song } from '../types/database.types';

type TableNames = keyof Database['public']['Tables'] | 'songs';

export function useSupabaseData<T>(
  table: TableNames
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

type StoryWithRelations = {
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
    preview_url: string | null
    artists: {
      name: string
    }
  }
  author: {
    id: string
    full_name: string
  } | null
}

export const useStories = (following?: boolean) => {
  const [stories, setStories] = useState<StoryWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        let query = supabase
          .from('stories')
          .select(`
            id,
            content,
            created_at,
            song_id,
            user_id,
            songs!stories_song_id_fkey (
              id,
              title,
              artist_id,
              cover_image,
              preview_url,
              artists!songs_artist_id_fkey (
                name
              )
            )
          `)
          .order('created_at', { ascending: false })

        // If following is true, we'll return an empty array since there's no following system
        if (following) {
          setStories([])
          setLoading(false)
          return
        }

        const { data: storiesData, error: storiesError } = await query as { 
          data: StoryWithRelations[] | null
          error: any 
        }

        if (storiesError) {
          throw storiesError
        }

        if (storiesData) {
          // Get all unique user_ids
          const userIds = [...new Set(storiesData.map(story => story.user_id))]
          
          // Fetch profiles for these users
          const { data: profilesData } = await supabase
            .from('profiles')
            .select('id, full_name')
            .in('id', userIds)

          // Create a map of user_id to profile
          const profileMap = new Map(profilesData?.map(profile => [profile.id, profile]))

          // Transform stories with profile data
          const transformedStories = storiesData.map(story => ({
            id: story.id,
            content: story.content,
            created_at: story.created_at,
            song_id: story.song_id,
            user_id: story.user_id,
            songs: {
              id: story.songs.id,
              title: story.songs.title,
              artist_id: story.songs.artist_id,
              cover_image: story.songs.cover_image,
              preview_url: story.songs.preview_url,
              artists: story.songs.artists
            },
            author: profileMap.get(story.user_id) || null
          }))
          
          setStories(transformedStories)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stories')
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [])

  return { stories, loading, error }
}

export function useArtists() {
  const [artists, setArtists] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchArtists()
  }, [])

  const fetchArtists = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: artistsData, error: artistsError } = await supabase
        .from('artists')
        .select(`
          id,
          name,
          picture_medium,
          albums!albums_artist_id_fkey (
            id,
            title,
            cover_medium
          )
        `)
        .order('name')

      if (artistsError) {
        console.error('Supabase error:', artistsError)
        throw new Error(artistsError.message)
      }

      setArtists(artistsData || [])
    } catch (err) {
      console.error('Error fetching artists:', err)
      setError(err instanceof Error ? err.message : 'Failed to load artists')
    } finally {
      setLoading(false)
    }
  }

  return { artists, loading, error }
}
