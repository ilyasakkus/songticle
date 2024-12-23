import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface ArtistNode {
  id: number;
  name: string;
  picture_small: string;
  picture_medium: string;
  albums?: AlbumNode[];
}

interface AlbumNode {
  id: number;
  title: string;
  cover_medium: string;
  songs?: SongNode[];
}

interface SongNode {
  id: number;
  title: string;
  preview_url: string;
}

export function useArtistHierarchy() {
  const [artists, setArtists] = useState<ArtistNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtistHierarchy = async () => {
    try {
      // Fetch artists
      const { data: artistsData, error: artistsError } = await supabase
        .from('artists')
        .select('*')
        .order('name');

      if (artistsError) throw artistsError;

      // For each artist, fetch their albums
      const artistsWithAlbums = await Promise.all(
        artistsData.map(async (artist) => {
          const { data: albumsData, error: albumsError } = await supabase
            .from('albums')
            .select('*')
            .eq('artist_id', artist.id)
            .order('title');

          if (albumsError) throw albumsError;

          // For each album, fetch its songs
          const albumsWithSongs = await Promise.all(
            albumsData.map(async (album) => {
              const { data: songsData, error: songsError } = await supabase
                .from('songs')
                .select('id, title, preview_url')
                .eq('album_id', album.id)
                .order('title');

              if (songsError) throw songsError;

              return {
                ...album,
                songs: songsData
              };
            })
          );

          return {
            ...artist,
            albums: albumsWithSongs
          };
        })
      );

      setArtists(artistsWithAlbums);
    } catch (err) {
      console.error('Error fetching artist hierarchy:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtistHierarchy();
  }, []);

  return { artists, loading, error, refetch: fetchArtistHierarchy };
}
