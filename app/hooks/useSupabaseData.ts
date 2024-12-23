import { useState } from 'react';
import { searchDeezerArtist, getArtistAlbums, getAlbumTracks } from '../lib/deezer';
import { supabase } from '../lib/supabase';
import { Artist, Album, Song } from '../types/database.types';

export const useStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select(`
          *,
          profiles:user_id(*),
          songs(*),
          likes:story_likes(count),
          comments:story_comments(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { stories, loading, error };
};

export const useArtistSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchArtist = async (query: string, addToDatabase = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const artists = await searchDeezerArtist(query);

      if (addToDatabase && artists && artists.length > 0) {
        const artist = artists[0];
        await addArtistToDatabase(artist);
      }

      return artists;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const addArtistToDatabase = async (artist: Artist) => {
    try {
      // Insert artist
      const { error: artistError } = await supabase
        .from('artists')
        .upsert({
          id: artist.id,
          name: artist.name,
          picture_small: artist.picture_small,
          picture_medium: artist.picture_medium,
          picture_big: artist.picture_big,
          picture_xl: artist.picture_xl
        });

      if (artistError) throw artistError;

      // Get and insert albums
      const albums = await getArtistAlbums(artist.id);
      for (const album of albums) {
        const { error: albumError } = await supabase
          .from('albums')
          .upsert({
            id: album.id,
            artist_id: artist.id,
            title: album.title,
            cover_small: album.cover_small,
            cover_medium: album.cover_medium,
            cover_big: album.cover_big,
            cover_xl: album.cover_xl,
            release_date: album.release_date
          });

        if (albumError) throw albumError;

        // Get and insert tracks for each album
        const tracks = await getAlbumTracks(album.id);
        for (const track of tracks) {
          const { error: trackError } = await supabase
            .from('songs')
            .upsert({
              id: track.id,
              album_id: album.id,
              artist_id: artist.id,
              title: track.title,
              title_short: track.title_short,
              title_version: track.title_version,
              duration: track.duration,
              preview_url: track.preview,
              explicit_lyrics: track.explicit_lyrics,
              explicit_content_lyrics: track.explicit_content_lyrics,
              explicit_content_cover: track.explicit_content_cover,
              rank: track.rank
            });

          if (trackError) throw trackError;
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to database');
      throw err;
    }
  };

  return {
    searchArtist,
    isLoading,
    error
  };
};
