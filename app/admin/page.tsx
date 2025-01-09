'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { searchDeezerArtist } from '../lib/deezer';
import { generatePlaylistContent } from '../lib/deepseek'

interface Artist {
  id: number;
  name: string;
}

interface DeezerItem {
  id: number;
  title: string;
  preview: string;
  duration?: number;
  artist: {
    id: number;
    name: string;
    picture?: string;
    picture_small?: string;
    picture_medium?: string;
  };
  album: {
    id: number;
    title: string;
    cover?: string;
    cover_small?: string;
    cover_medium: string;
    cover_big?: string;
    cover_xl?: string;
  };
}

interface SearchResults {
  songs: DeezerItem[];
  artists: DeezerItem[];
  albums: DeezerItem[];
}

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'track' | 'artist' | 'album'>('track');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResults>({ songs: [], artists: [], albums: [] });
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setArtists(data || []);
    } catch (err) {
      console.error('Error fetching artists:', err);
    }
  };

  const handleSearch = async (query: string, type: 'track' | 'artist' | 'album') => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await searchDeezerArtist(query);
      console.log('Deezer response:', response);
      
      if (response && Array.isArray(response.data)) {
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
        
        setResults({ ...results, [type]: transformedData });
        console.log('Setting transformed results:', transformedData);
      } else {
        setError('No results found');
        setResults({ ...results, [type]: [] });
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search');
      setResults({ ...results, [type]: [] });
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

  const handleGeneratePlaylist = async () => {
    if (!selectedArtist) return

    try {
      setGenerating(true)
      const selectedArtistData = artists.find(a => a.id === selectedArtist)
      if (!selectedArtistData) return

      // Fetch all artist's songs
      const { data: allSongs, error: songsError } = await supabase
        .from('songs')
        .select('id, title, album_name')
        .eq('artist_id', selectedArtist)

      if (songsError) throw songsError

      // Randomly select 10 songs or use all if less than 10
      const selectedSongs = allSongs.length > 10 
        ? allSongs.sort(() => 0.5 - Math.random()).slice(0, 10)
        : allSongs

      // Generate content using Deepseek AI
      const content = await generatePlaylistContent(
        selectedArtistData.name,
        selectedSongs,
        process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || ''
      )

      if (!content) throw new Error('Failed to generate content')

      // Create playlist
      const { data: playlist, error: playlistError } = await supabase
        .from('playlists')
        .insert({
          title: `Best Songs of ${selectedArtistData.name} of All-time`,
          description: `A curated collection of the best songs by ${selectedArtistData.name}.`,
          artist_id: selectedArtist,
          is_generated: true,
          content: content
        })
        .select()
        .single()

      if (playlistError) throw playlistError

      // Add songs to playlist
      const playlistSongs = selectedSongs.map((song, index) => ({
        playlist_id: playlist.id,
        song_id: song.id,
        position: index + 1
      }))

      const { error: playlistSongsError } = await supabase
        .from('playlist_songs')
        .insert(playlistSongs)

      if (playlistSongsError) {
        console.error('Error adding songs to playlist:', playlistSongsError)
        // Cleanup: Delete the created playlist if songs couldn't be added
        await supabase.from('playlists').delete().eq('id', playlist.id)
        throw new Error('Failed to add songs to playlist')
      }

      // Success message
      alert('Playlist generated successfully!')
    } catch (err) {
      console.error('Error generating playlist:', err)
      alert(err instanceof Error ? err.message : 'Failed to generate playlist')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      
      <div className="flex gap-4 mb-8">
        <select
          value={selectedArtist || ''}
          onChange={(e) => setSelectedArtist(Number(e.target.value))}
          className="select select-bordered flex-1"
        >
          <option value="">Select an artist...</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleGeneratePlaylist}
          disabled={!selectedArtist || generating}
          className="btn btn-primary"
        >
          {generating ? 'Generating...' : 'Generate Playlist'}
        </button>
      </div>

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
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => results.songs.forEach(handleAddToSupabase)}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Adding All...' : 'Add All to Database'}
            </button>
          </div>

          <div className="mt-4">
            {results.songs.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-base-100 rounded-lg shadow mb-4">
                <Image
                  src={item.album.cover_medium}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="rounded"
                />
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

      {!loading && results.artists.length > 0 && searchType === 'artist' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.artists.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-base-100 rounded-lg shadow mb-4">
              {item.artist.picture_medium && (
                <Image
                  src={item.artist.picture_medium}
                  alt={item.artist.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              )}
              <div className="flex-1">
                <h2 className="card-title text-lg">{item.artist.name}</h2>
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
      )}

      {!loading && results.albums.length > 0 && searchType === 'album' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.albums.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-base-100 rounded-lg shadow mb-4">
              {item.album.cover_medium && (
                <Image
                  src={item.album.cover_medium}
                  alt={item.album.title}
                  width={64}
                  height={64}
                  className="rounded"
                />
              )}
              <div className="flex-1">
                <h2 className="card-title text-lg">{item.album.title}</h2>
                <p className="text-sm">{item.artist.name}</p>
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
      )}

      {!loading && (
        (searchType === 'track' && results.songs.length === 0) ||
        (searchType === 'artist' && results.artists.length === 0) ||
        (searchType === 'album' && results.albums.length === 0)
      ) && searchTerm && (
        <div className="alert alert-info">
          <span>No results found for "{searchTerm}"</span>
        </div>
      )}

      <div className="mt-8">
        <p>Note: Items marked with &ldquo;Added&rdquo; have already been imported to the database.</p>
      </div>
    </div>
  );
}
