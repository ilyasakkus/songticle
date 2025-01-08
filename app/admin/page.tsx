'use client';

import { useState } from 'react';
import { useArtistSearch } from '../hooks/useSupabaseData';
import { supabase, uploadAlbumCover, uploadArtistImage } from '../lib/supabase';
import { searchDeezerArtist } from '../lib/deezer';

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await searchDeezerArtist(searchTerm);
      console.log('Deezer response:', response);
      
      if (response && Array.isArray(response.data)) {
        setResults(response.data);
        console.log('Setting results:', response.data);
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

  const handleAddToSupabase = async (item: any) => {
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
        .eq('id', item.track.id)
        .single();
      
      if (checkSongError && checkSongError.code !== 'PGRST116') {
        console.error('Error checking song:', JSON.stringify(checkSongError, null, 2));
        return;
      }

      // Insert song if not exists
      if (!existingSong) {
        const songData = {
          id: item.track.id,
          album_id: item.album.id,
          artist_id: item.artist.id,
          title: item.track.title,
          title_short: item.track.title_short,
          title_version: item.track.title_version || '',
          duration: parseInt(item.track.duration),
          preview_url: item.track.preview,
          explicit_lyrics: item.track.explicit_lyrics,
          explicit_content_lyrics: item.track.explicit_content_lyrics || 0,
          explicit_content_cover: item.track.explicit_content_cover || 0,
          rank: parseInt(item.track.rank),
          album_name: item.album.title,
          artist_name: item.artist.name,
          cover_image: item.album.cover_medium
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

  const handleAddAllToSupabase = async () => {
    try {
      setLoading(true);
      for (const item of results) {
        await handleAddToSupabase(item);
      }
      console.log('Finished processing all items');
    } catch (err: any) {
      console.error('Error adding all items:', err);
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
          placeholder="Search artists..."
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
              onClick={handleAddAllToSupabase}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Adding All...' : 'Add All to Database'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((item) => (
              <div key={item.track.id} className="card bg-base-100 shadow-md">
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
                      <p className="text-sm">Track: {item.track.title}</p>
                    </div>
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
