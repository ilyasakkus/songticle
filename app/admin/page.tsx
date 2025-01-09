'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { searchDeezerArtist } from '../lib/deezer';

interface DeezerItem {
  id: number
  title: string
  preview?: string
  duration: number
  artist: {
    id: number
    name: string
    picture?: string
    picture_small?: string
    picture_medium?: string
  }
  album: {
    id: number
    title: string
    cover?: string
    cover_small?: string
    cover_medium?: string
    cover_big?: string
    cover_xl?: string
  }
}

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<DeezerItem[]>([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await searchDeezerArtist(searchTerm);
      console.log('Deezer response:', response);
      
      if (response && Array.isArray(response.data)) {
        // Transform the data to ensure we have all required fields
        const transformedData = response.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          preview: item.preview,
          duration: item.duration || 0,
          artist: {
            id: item.artist?.id,
            name: item.artist?.name,
            picture: item.artist?.picture,
            picture_small: item.artist?.picture_small,
            picture_medium: item.artist?.picture_medium
          },
          album: {
            id: item.album?.id,
            title: item.album?.title,
            cover: item.album?.cover,
            cover_small: item.album?.cover_small,
            cover_medium: item.album?.cover_medium,
            cover_big: item.album?.cover_big,
            cover_xl: item.album?.cover_xl
          }
        }));
        
        setResults(transformedData);
        console.log('Setting transformed results:', transformedData);
      } else {
        setError('No results found');
        setResults([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search');
      setResults([]);
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search songs..."
          className="input input-bordered flex-1"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch}
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

      {!loading && results.length > 0 && (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => results.forEach(handleAddToSupabase)}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Adding All...' : 'Add All to Database'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((item) => (
              <div key={item.id} className="card bg-base-100 shadow-md">
                <figure className="px-4 pt-4">
                  <img
                    src={item.artist.picture_medium || item.artist.picture}
                    alt={item.artist.name}
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-lg">{item.artist.name}</h2>
                  <div className="flex items-center gap-2">
                    <img
                      src={item.album.cover_small || item.album.cover}
                      alt={item.album.title}
                      className="w-10 h-10 rounded"
                    />
                    <div>
                      <p className="text-sm font-medium">Album: {item.album.title}</p>
                      <p className="text-sm">Track: {item.title}</p>
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => handleAddToSupabase(item)}
                      disabled={loading}
                      className="btn btn-primary btn-sm"
                    >
                      {loading ? 'Adding...' : 'Add to Database'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && results.length === 0 && searchTerm && (
        <div className="alert alert-info">
          <span>No results found for "{searchTerm}"</span>
        </div>
      )}
    </div>
  );
}
