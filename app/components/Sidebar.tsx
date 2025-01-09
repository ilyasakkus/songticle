'use client'

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
  artist_id: number
  artist_name: string
}

interface Song {
  id: number
  title: string
  cover_image: string | null
  artist_id: number
  artist_name: string
}

export function Sidebar() {
  const [popularArtists, setPopularArtists] = useState<Artist[]>([])
  const [recentAlbums, setRecentAlbums] = useState<Album[]>([])
  const [popularSongs, setPopularSongs] = useState<Song[]>([])
  const [expandedSections, setExpandedSections] = useState({
    artists: true,
    albums: true,
    songs: true
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Artists
      const { data: artists } = await supabase
        .from('artists')
        .select('*')
        .order('id', { ascending: false })
        .limit(5)

      // Albums
      const { data: albums } = await supabase
        .from('albums')
        .select('*')
        .order('id', { ascending: false })
        .limit(5)

      // Songs
      const { data: songs } = await supabase
        .from('songs')
        .select('*')
        .order('id', { ascending: false })
        .limit(5)

      console.log('Artists:', artists)
      console.log('Albums:', albums)
      console.log('Songs:', songs)

      setPopularArtists(artists || [])
      setRecentAlbums(albums || [])
      setPopularSongs(songs || [])
      
    } catch (err) {
      console.error('Error:', err)
      setError('Failed to load data')
    } finally {
      setLoading(false)
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

      {/* Random Albums Section */}
      <div>
        <button 
          onClick={() => toggleSection('albums')}
          className="flex items-center justify-between w-full mb-2 text-sm font-semibold"
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Random Albums</span>
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
                  <div className="text-xs text-gray-500 truncate">{album.artist_name}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Popular Songs Section */}
      <div>
        <button 
          onClick={() => toggleSection('songs')}
          className="flex items-center justify-between w-full mb-2 text-sm font-semibold"
        >
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            <span>Popular Songs</span>
          </div>
          {expandedSections.songs ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {expandedSections.songs && (
          <div className="space-y-2">
            {popularSongs.map((song) => (
              <Link
                key={song.id}
                href={`/songs/${song.id}`}
                className="flex items-center gap-2 p-2 hover:bg-base-200 rounded-lg transition-colors"
              >
                {song.cover_image ? (
                  <Image
                    src={song.cover_image}
                    alt={song.title}
                    width={32}
                    height={32}
                    className="rounded"
                  />
                ) : (
                  <div className="w-8 h-8 rounded bg-base-200 flex items-center justify-center">
                    <Music className="h-4 w-4 opacity-50" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-sm truncate">{song.title}</div>
                  <div className="text-xs text-gray-500 truncate">{song.artist_name}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
