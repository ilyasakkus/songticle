'use client';

import { useState } from 'react';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { useArtistSearch } from './hooks/useSupabaseData';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchArtist, isLoading, error } = useArtistSearch();
  const [searchResults, setSearchResults] = useState([]);

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Songticle - Share Your Music Stories
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <ThemeSwitcher />
        </div>
      </div>

      <div className="relative flex place-items-center">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for songs, artists, or albums..."
              className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="mt-4 w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {error && (
            <div className="text-red-500 mb-4">
              Error: {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {searchResults.map((result: any) => (
              <div
                key={result.id}
                className="p-4 border rounded-lg dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={result.picture_medium || '/placeholder.png'}
                    alt={result.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{result.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {/* Add your content here */}
      </div>
    </main>
  );
}
