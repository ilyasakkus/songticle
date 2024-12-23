'use client';

import { useState } from 'react';
import { useArtistSearch } from '../hooks/useSupabaseData';
import { Artist, Song } from '../types/database.types';

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchArtist, isLoading, error } = useArtistSearch();
  const [searchResults, setSearchResults] = useState<{ artist: Artist | null, songs: Song[] }>({ artist: null, songs: [] });

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const results = await searchArtist(searchQuery);
      setSearchResults(results);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleAddToDatabase = async () => {
    if (!searchResults.artist) return;
    
    try {
      await searchArtist(searchQuery, true);
      // Show success message or redirect
    } catch (err) {
      console.error('Error adding to database:', err);
    }
  };

  return (
    <main className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="navbar bg-base-100 shadow-lg px-4">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost normal-case text-xl gap-2 text-base-content">
            <span className="material-icons">arrow_back</span>
            Back to Home
          </a>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Search Section */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title mb-4">Search and Add Content</h2>
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for an artist..."
                className="input input-bordered flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <span className="material-icons">search</span>
                    Search
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="alert alert-error">
                <span className="material-icons">error</span>
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {searchResults.artist && (
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <div className="flex items-center gap-6 mb-6">
                <img
                  src={searchResults.artist.picture_medium}
                  alt={searchResults.artist.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold mb-2">{searchResults.artist.name}</h2>
                  <p className="text-base-content/60">{searchResults.songs.length} songs found</p>
                  <button
                    onClick={handleAddToDatabase}
                    className="btn btn-primary mt-4"
                  >
                    <span className="material-icons">add_circle</span>
                    Add All Songs to Database
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Cover</th>
                      <th>Title</th>
                      <th>Album</th>
                      <th>Preview</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.songs.map((song) => (
                      <tr key={song.id}>
                        <td>
                          <img
                            src={song.cover_image}
                            alt={song.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                        </td>
                        <td>{song.title}</td>
                        <td>{song.album_name}</td>
                        <td>
                          {song.preview_url && (
                            <audio controls className="w-48">
                              <source src={song.preview_url} type="audio/mpeg" />
                            </audio>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
