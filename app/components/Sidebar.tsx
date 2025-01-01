'use client';

import React, { useState } from 'react';
import { useArtistHierarchy } from '../hooks/useArtistHierarchy';
import { Music, Disc, User, Search } from 'lucide-react';

export function Sidebar() {
  const { artists, loading, error } = useArtistHierarchy();
  const [expandedArtists, setExpandedArtists] = React.useState<Record<number, boolean>>({});
  const [expandedAlbums, setExpandedAlbums] = React.useState<Record<number, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');

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

  const isArtistExpanded = (artistId: number): boolean => {
    return expandedArtists[artistId] || false;
  };

  const isAlbumExpanded = (albumId: number): boolean => {
    return expandedAlbums[albumId] || false;
  };

  const filteredArtists = React.useMemo(() => {
    if (!searchTerm) return artists;
    
    return artists?.filter(artist => 
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.albums?.some(album => 
        album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.songs?.some(song => 
          song.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    ) || [];
  }, [artists, searchTerm]);

  if (loading) {
    return (
      <aside className="w-60 h-full bg-base-100 border-r border-base-300 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-base-300 rounded w-3/4"></div>
          <div className="h-4 bg-base-300 rounded w-1/2"></div>
          <div className="h-4 bg-base-300 rounded w-2/3"></div>
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="w-60 h-full bg-base-100 border-r border-base-300 p-4">
        <div className="text-error">Error loading artists: {error}</div>
      </aside>
    );
  }

  return (
    <aside className="w-60 h-full bg-base-100 border-r border-base-300 p-4">
      <div className="space-y-4 mb-4">
        <div className="form-control">
          <div className="input-group">
            <span className="btn btn-square btn-ghost">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="search"
              placeholder="Search artists, albums, songs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
        {filteredArtists?.map(artist => (
          <div key={artist.id} className="collapse collapse-arrow bg-base-200">
            <input 
              type="checkbox" 
              checked={isArtistExpanded(artist.id)}
              onChange={() => toggleArtist(artist.id)}
            />
            <div className="collapse-title flex items-center gap-2 text-sm">
              <User size={16} />
              <span className="truncate">{artist.name}</span>
            </div>
            
            {isArtistExpanded(artist.id) && artist.albums && (
              <div className="collapse-content">
                {artist.albums.map(album => (
                  <div key={album.id} className="collapse collapse-arrow bg-base-100 my-1">
                    <input 
                      type="checkbox" 
                      checked={isAlbumExpanded(album.id)}
                      onChange={() => toggleAlbum(album.id)}
                    />
                    <div className="collapse-title flex items-center gap-2 text-sm py-2">
                      <Disc size={16} />
                      <span className="truncate">{album.title}</span>
                    </div>
                    
                    {isAlbumExpanded(album.id) && album.songs && (
                      <div className="collapse-content">
                        {album.songs.map(song => (
                          <div
                            key={song.id}
                            className="flex items-center gap-2 p-2 hover:bg-base-200 rounded-btn cursor-pointer"
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
