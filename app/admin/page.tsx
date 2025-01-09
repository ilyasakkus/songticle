'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { searchDeezerArtist } from '../lib/deezer';
import Image from 'next/image';

interface DeezerResponse {
  data: DeezerItem[]
  total: number
  next?: string
}

interface DeezerItem {
  id: number
  title: string
  preview: string
  duration?: number
  artist: {
    id: number
    name: string
    picture_small?: string
    picture_medium?: string
  }
  album: {
    id: number
    title: string
    cover_small?: string
    cover_medium?: string
    cover_big?: string
    cover_xl?: string
  }
}

interface SearchResults {
  songs: DeezerItem[]
  artists: DeezerItem[]
  albums: DeezerItem[]
}

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'track' | 'artist' | 'album'>('track');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResults>({ songs: [], artists: [], albums: [] });

  const handleSearch = async (query: string, type: 'track' | 'artist' | 'album') => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await searchDeezerArtist(query);
      console.log('Deezer response:', response);
      
      if (response && Array.isArray(response.data) && response.data.length > 0) {
        // Transform the data to ensure we have all required fields
        const transformedData = response.data.map((item: any) => ({
          id: item.id,
          title: item.name || item.title,
          preview: item.preview,
          duration: item.duration || 0,
          artist: {
            id: item.artist?.id || item.id,
            name: item.artist?.name || item.name,
            picture_small: item.artist?.picture_small || item.picture_small,
            picture_medium: item.artist?.picture_medium || item.picture_medium
          },
          album: {
            id: item.album?.id || 0,
            title: item.album?.title || '',
            cover_small: item.album?.cover_small,
            cover_medium: item.album?.cover_medium,
            cover_big: item.album?.cover_big,
            cover_xl: item.album?.cover_xl
          }
        }));
        
        setResults(prev => ({ 
          ...prev, 
          [type === 'track' ? 'songs' : type === 'artist' ? 'artists' : 'albums']: transformedData 
        }));
        console.log('Setting transformed results:', transformedData);
      } else {
        setError('No results found');
        setResults(prev => ({ 
          ...prev, 
          [type === 'track' ? 'songs' : type === 'artist' ? 'artists' : 'albums']: [] 
        }));
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search');
      setResults(prev => ({ 
        ...prev, 
        [type === 'track' ? 'songs' : type === 'artist' ? 'artists' : 'albums']: [] 
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleAddToSupabase = async (item: DeezerItem) => {
    try {
      setLoading(true);
      console.log('Adding to Supabase:', item);
      
      // Check if artist already exists
      const { data: existingArtist, error: checkArtistError } = await supabase
        .from('artists')
        .select('*')
        .eq('id', item.artist.id)
        .single();
      
      if (checkArtistError && checkArtistError.code !== 'PGRST116') {
        console.error('Error checking artist:', JSON.stringify(checkArtistError, null, 2));
        return;
      }

      // Insert artist if not exists
      if (!existingArtist) {
        const artistData = {
          id: item.artist.id,
          name: item.artist.name,
          picture_small: item.artist.picture_small,
          picture_medium: item.artist.picture_medium
        };
        
        console.log('Inserting artist data:', JSON.stringify(artistData, null, 2));
        
        const { error: artistError } = await supabase
          .from('artists')
          .insert(artistData);
        
        if (artistError) {
          console.error('Error inserting artist:', JSON.stringify(artistError, null, 2));
          return;
        }
      }
      
      // Check if album already exists
      const { data: existingAlbum, error: checkAlbumError } = await supabase
        .from('albums')
        .select('*')
        .eq('id', item.album.id)
        .single();
      
      if (checkAlbumError && checkAlbumError.code !== 'PGRST116') {
        console.error('Error checking album:', JSON.stringify(checkAlbumError, null, 2));
        return;
      }

      // Insert album if not exists
      if (!existingAlbum) {
        const albumData = {
          id: item.album.id,
          title: item.album.title,
          artist_id: item.artist.id,
          cover_small: item.album.cover_small,
          cover_medium: item.album.cover_medium,
          cover_big: item.album.cover_big,
          cover_xl: item.album.cover_xl,
          release_date: new Date().toISOString().split('T')[0]
        };
        
        console.log('Inserting album data:', JSON.stringify(albumData, null, 2));
        
        const { error: albumError } = await supabase
          .from('albums')
          .insert(albumData);
        
        if (albumError) {
          console.error('Error inserting album:', JSON.stringify(albumError, null, 2));
          return;
        }
      }
      
      // Check if song already exists
      const { data: existingSong, error: checkSongError } = await supabase
        .from('songs')
        .select('*')
        .eq('id', item.id)
        .single();
      
      if (checkSongError && checkSongError.code !== 'PGRST116') {
        console.error('Error checking song:', JSON.stringify(checkSongError, null, 2));
        return;
      }

      // Insert song if not exists
      if (!existingSong) {
        const songData = {
          id: item.id,
          album_id: item.album.id,
          artist_id: item.artist.id,
          title: item.title?.substring(0, 255) || '',
          preview_url: item.preview?.substring(0, 255) || '',
          duration: item.duration,
          album_name: item.album.title?.substring(0, 255) || '',
          artist_name: item.artist.name?.substring(0, 255) || '',
          cover_image: item.album.cover_medium?.substring(0, 255) || ''
        };
        
        console.log('Inserting song data:', JSON.stringify(songData, null, 2));
        
        const { error: songError } = await supabase
          .from('songs')
          .insert(songData);
        
        if (songError) {
          console.error('Error inserting song:', JSON.stringify(songError, null, 2));
          return;
        }
      }
      
      setError(null);
    } catch (err: any) {
      console.error('Error adding to Supabase:', JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      
      <div className="flex gap-2 mb-4">
        <select 
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as 'track' | 'artist' | 'album')}
          className="select select-bordered"
        >
          <option value="track">Songs</option>
          <option value="artist">Artists</option>
          <option value="album">Albums</option>
        </select>
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search ${searchType}s...`}
          className="input input-bordered flex-1"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm, searchType)}
        />
        <button 
          onClick={() => handleSearch(searchTerm, searchType)}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="flex justify-center my-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {!loading && results.songs.length > 0 && searchType === 'track' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.songs.map((item) => (
            <div key={item.id} className="card bg-base-200">
              <div className="card-body">
                <div className="flex items-center gap-4">
                  {item.album.cover_medium && (
                    <Image
                      src={item.album.cover_medium}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm">{item.artist.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToSupabase(item)}
                  className="btn btn-primary btn-sm mt-2"
                >
                  Add to Database
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && results.artists.length > 0 && searchType === 'artist' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.artists.map((item) => (
            <div key={item.id} className="card bg-base-200">
              <div className="card-body">
                <div className="flex items-center gap-4">
                  {item.artist.picture_medium && (
                    <Image
                      src={item.artist.picture_medium}
                      alt={item.artist.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="font-bold">{item.artist.name}</h3>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToSupabase(item)}
                  className="btn btn-primary btn-sm mt-2"
                >
                  Add to Database
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
