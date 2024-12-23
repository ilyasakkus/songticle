import React from 'react';
import { useArtistHierarchy } from '../hooks/useArtistHierarchy';
import { ChevronDown, ChevronRight, Music, Disc, User } from 'lucide-react';

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
      <div className="w-60 h-full bg-gray-100 p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-60 h-full bg-gray-100 p-4">
        <div className="text-red-500">Error loading artists: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-60 h-full bg-gray-100 p-4 overflow-y-auto">
      <div className="space-y-2">
        {artists.map(artist => (
          <div key={artist.id} className="space-y-1">
            <div
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-1 rounded"
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
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-1 rounded"
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
                            className="flex items-center space-x-2 hover:bg-gray-200 p-1 rounded cursor-pointer"
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
    </div>
  );
}
