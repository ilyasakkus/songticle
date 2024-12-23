'use client';

import React from 'react';
import { useArtistHierarchy } from '../hooks/useArtistHierarchy';
import { ChevronDown, ChevronRight, Music, Disc, User } from 'lucide-react';
import { cn } from '../lib/utils';

export function Sidebar() {
  const { artists, loading, error } = useArtistHierarchy();
  const [expandedArtists, setExpandedArtists] = React.useState<Record<number, boolean>>({});
  const [expandedAlbums, setExpandedAlbums] = React.useState<Record<number, boolean>>({});

  const toggleArtist = (artistId: number) => {
    setExpandedArtists(prev => ({
      ...prev,
      [artistId]: !prev[artistId]
    }));
  };

  const toggleAlbum = (albumId: number) => {
    setExpandedAlbums(prev => ({
      ...prev,
      [albumId]: !prev[albumId]
    }));
  };

  if (loading) {
    return (
      <aside className="w-60 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="w-60 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4">
        <div className="text-red-500 dark:text-red-400">Error loading artists: {error}</div>
      </aside>
    );
  }

  return (
    <aside className="w-60 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4">
      <div className="space-y-2">
        {artists.map(artist => (
          <div key={artist.id} className="space-y-1">
            <div
              className={cn(
                "flex items-center space-x-2 cursor-pointer rounded-md p-2",
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                "text-gray-900 dark:text-gray-100"
              )}
              onClick={() => toggleArtist(artist.id)}
            >
              {expandedArtists[artist.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <User size={16} />
              <span className="text-sm truncate">{artist.name}</span>
            </div>
            
            {expandedArtists[artist.id] && artist.albums && (
              <div className="ml-6 space-y-1">
                {artist.albums.map(album => (
                  <div key={album.id}>
                    <div
                      className={cn(
                        "flex items-center space-x-2 cursor-pointer rounded-md p-2",
                        "hover:bg-gray-100 dark:hover:bg-gray-800",
                        "text-gray-900 dark:text-gray-100"
                      )}
                      onClick={() => toggleAlbum(album.id)}
                    >
                      {expandedAlbums[album.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      <Disc size={16} />
                      <span className="text-sm truncate">{album.title}</span>
                    </div>
                    
                    {expandedAlbums[album.id] && album.songs && (
                      <div className="ml-6 space-y-1">
                        {album.songs.map(song => (
                          <div
                            key={song.id}
                            className={cn(
                              "flex items-center space-x-2 rounded-md p-2",
                              "hover:bg-gray-100 dark:hover:bg-gray-800",
                              "text-gray-900 dark:text-gray-100"
                            )}
                          >
                            <Music size={16} />
                            <span className="text-sm truncate">{song.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
