import { useState } from 'react';
import { searchDeezerArtist } from '../lib/deezer';
import { supabase } from '../lib/supabase';
import type { Artist, Song, Album } from '../types/database.types';

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

      const result = await searchDeezerArtist(query);
      
      if (result.error) {
        throw new Error(result.error.message);
      }

      if (!result.data) {
        setSearchResults({ artist: null, songs: [] });
        return { artist: null, songs: [] };
      }

      const { artist, songs } = result.data;

      if (addToDb && artist) {
        console.log('Adding artist to database:', artist);
        
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
          throw new Error(`Sanatçı eklenirken hata oluştu: ${artistError.message}`);
        }

        // Group songs by album and create album objects
        const albumsMap = new Map<number, Album>();
        songs.forEach(song => {
          if (!albumsMap.has(song.album_id)) {
            albumsMap.set(song.album_id, {
              id: song.album_id,
              artist_id: artist.id,
              title: song.album_name || '',
              cover_medium: song.cover_image || '',
              release_date: null // If you have this data, add it here
            });
          }
        });

        const albums = Array.from(albumsMap.values());
        console.log('Adding albums to database:', albums);

        // Add albums to database
        const { error: albumsError } = await supabase
          .from('albums')
          .upsert(albums)
          .select();

        if (albumsError) {
          console.error('Albums insert error:', albumsError);
          throw new Error(`Albümler eklenirken hata oluştu: ${albumsError.message}`);
        }

        // Prepare songs with all required fields
        const songsToInsert = songs.map(song => ({
          id: song.id,
          album_id: song.album_id,
          artist_id: artist.id,
          title: song.title || '',
          title_short: song.title_short || song.title || '',
          title_version: song.title_version || '',
          duration: song.duration || 0,
          preview_url: song.preview_url || '',
          explicit_lyrics: song.explicit_lyrics || false,
          explicit_content_lyrics: song.explicit_content_lyrics || 0,
          explicit_content_cover: song.explicit_content_cover || 0,
          rank: song.rank || 0,
          album_name: song.album_name || '',
          artist_name: artist.name,
          cover_image: song.cover_image || ''
        }));

        console.log('Adding songs to database:', songsToInsert[0]); // Log first song as example

        // Add songs to database
        const { error: songsError } = await supabase
          .from('songs')
          .upsert(songsToInsert)
          .select();

        if (songsError) {
          console.error('Songs insert error:', songsError);
          throw new Error(`Şarkılar eklenirken hata oluştu: ${songsError.message}`);
        }
      }

      setSearchResults({ artist, songs });
      return { artist, songs };
    } catch (err) {
      console.error('Search error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Arama sırasında bir hata oluştu');
      }
      return { artist: null, songs: [] };
    } finally {
      setIsLoading(false);
    }
  };

  return { searchArtist, isLoading, error, searchResults };
} 