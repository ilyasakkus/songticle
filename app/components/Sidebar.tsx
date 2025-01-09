'use client';

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Search, History, Star, Clock, Music, ChevronRight, ChevronDown } from 'lucide-react'
import { slugify } from '../lib/utils'

interface Artist {
  id: number
  name: string
  picture_medium: string | null
}

interface Album {
  id: number
  title: string
  cover_medium: string | null
  artists: {
    id: number
    name: string
  }
}

interface SearchHistory {
  term: string
  type: 'artist' | 'album' | 'song'
  timestamp: number
}

export default function Sidebar() {
  const [popularArtists, setPopularArtists] = useState<Artist[]>([])
  const [recentAlbums, setRecentAlbums] = useState<Album[]>([])
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])
  const [expandedSections, setExpandedSections] = useState({
    artists: true,
    albums: true,
    history: true
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchData()
    loadSearchHistory()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch popular artists (for now, just getting first 5)
      const { data: artistsData, error: artistsError } = await supabase
        .from('artists')
        .select('id, name, picture_medium')
        .order('name')
        .limit(5)

      if (artistsError) throw artistsError

      // Fetch recent albums
      const { data: albumsData, error: albumsError } = await supabase
        .from('albums')
        .select(`
          id,
          title,
          cover_medium,
          artists!albums_artist_id_fkey (
            id,
            name
          )
        `)
        .order('id', { ascending: false })
        .limit(5)

      if (albumsError) throw albumsError

      setPopularArtists(artistsData || [])
      setRecentAlbums(albumsData || [])
    } catch (err) {
      console.error('Error fetching sidebar data:', err)
      setError('Failed to load sidebar data')
    } finally {
      setLoading(false)
    }
  }

  const loadSearchHistory = () => {
    const history = localStorage.getItem('searchHistory')
    if (history) {
      setSearchHistory(JSON.parse(history))
    }
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  if (loading) {
    return (
      <div className="p-4">
        <span className="loading loading-spinner loading-sm"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-error text-sm">
        <span>{error}</span>
      </div>
    )
  }

  return (
    <div className="w-64 bg-base-200 h-full p-4 flex flex-col gap-6">
      {/* Popular Artists Section */}
      <div>
        <button 
          onClick={() => toggleSection('artists')}
          className="flex items-center justify-between w-full mb-2 text-sm font-semibold"
        >
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span>Popular Artists</span>
          </div>
          {expandedSections.artists ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {expandedSections.artists && (
          <div className="space-y-2">
            {popularArtists.map((artist) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.id}/${slugify(artist.name)}`}
                className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-lg transition-colors"
              >
                {artist.picture_medium ? (
                  <Image
                    src={artist.picture_medium}
                    alt={artist.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center">
                    <Music className="h-4 w-4 opacity-50" />
                  </div>
                )}
                <span className="text-sm truncate">{artist.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Recent Albums Section */}
      <div>
        <button 
          onClick={() => toggleSection('albums')}
          className="flex items-center justify-between w-full mb-2 text-sm font-semibold"
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Recent Albums</span>
          </div>
          {expandedSections.albums ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {expandedSections.albums && (
          <div className="space-y-2">
            {recentAlbums.map((album) => (
              <Link
                key={album.id}
                href={`/albums/${album.id}/${slugify(album.title)}`}
                className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-lg transition-colors"
              >
                {album.cover_medium ? (
                  <Image
                    src={album.cover_medium}
                    alt={album.title}
                    width={32}
                    height={32}
                    className="rounded"
                  />
                ) : (
                  <div className="w-8 h-8 rounded bg-base-300 flex items-center justify-center">
                    <Music className="h-4 w-4 opacity-50" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-sm truncate">{album.title}</div>
                  <div className="text-xs text-gray-500 truncate">{album.artists.name}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Search History Section */}
      <div>
        <button 
          onClick={() => toggleSection('history')}
          className="flex items-center justify-between w-full mb-2 text-sm font-semibold"
        >
          <div className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>Recent Searches</span>
          </div>
          {expandedSections.history ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {expandedSections.history && (
          <div className="space-y-2">
            {searchHistory.length > 0 ? (
              searchHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-lg transition-colors text-sm"
                >
                  <Search className="h-4 w-4 opacity-50" />
                  <span className="truncate">{item.term}</span>
                  <span className="text-xs text-gray-500">{item.type}</span>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 p-2">No recent searches</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
