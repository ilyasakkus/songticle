'use client';

import { useState } from 'react';
import { useArtistSearch } from '../hooks/useSupabaseData';
import { Artist } from '../types/database.types';

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchArtist, isLoading, error } = useArtistSearch();
  const [searchResults, setSearchResults] = useState<Artist[]>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const results = await searchArtist(searchQuery);
      setSearchResults(results || []);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Search Section */}
      <div className="mb-8">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for an artist..."
            className="flex-1 p-2 border rounded-lg"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && (
          <div className="text-red-500 mb-4">
            Error: {error}
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((artist) => (
          <div
            key={artist.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <img
              src={artist.picture_medium || '/placeholder.png'}
              alt={artist.name}
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">{artist.name}</h3>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => searchArtist(artist.id.toString(), true)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add to Database
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
