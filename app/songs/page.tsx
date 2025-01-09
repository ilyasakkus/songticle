'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { slugify } from '../lib/utils'
import { useDebounce } from '../hooks/useDebounce'

interface Song {
  id: number
  title: string
  preview_url: string | null
  albums: {
    id: number
    title: string
    cover_medium: string | null
  }
  artists: {
    id: number
    name: string
  }
  album: {
    id: number
    title: string
    cover_medium: string | null
  }
  artist: {
    id: number
    name: string
  }
}

const PAGE_SIZE = 40

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [songSearchTerm, setSongSearchTerm] = useState('')
  const [albumSearchTerm, setAlbumSearchTerm] = useState('')
  const [artistSearchTerm, setArtistSearchTerm] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const supabase = createClientComponentClient()

  const debouncedSongSearch = useDebounce(songSearchTerm, 300)
  const debouncedAlbumSearch = useDebounce(albumSearchTerm, 300)
  const debouncedArtistSearch = useDebounce(artistSearchTerm, 300)

  useEffect(() => {
    setSongs([])
    fetchSongs(0)
  }, [debouncedSongSearch, debouncedAlbumSearch, debouncedArtistSearch])

  const fetchSongs = async (start = 0) => {
    try {
      const isInitialFetch = start === 0
      isInitialFetch ? setLoading(true) : setLoadingMore(true)
      setError(null)

      let query = supabase
        .from('songs')
        .select(`
          id,
          title,
          preview_url,
          albums!songs_album_id_fkey (
            id,
            title,
            cover_medium
          ),
          artists!songs_artist_id_fkey (
            id,
            name
          )
        `)

      // Add search filters
      if (debouncedSongSearch) {
        query = query.ilike('title', `%${debouncedSongSearch}%`)
      }
      if (debouncedAlbumSearch) {
        query = query.ilike('album_name', `%${debouncedAlbumSearch}%`)
      }
      if (debouncedArtistSearch) {
        query = query.ilike('artist_name', `%${debouncedArtistSearch}%`)
      }

      // Add pagination
      query = query
        .order('title')
        .range(start, start + PAGE_SIZE - 1)

      const { data, error } = await query

      if (error) throw error

      const transformedData = data?.map(song => ({
        ...song,
        album: song.albums,
        artist: song.artists
      })) as Song[]

      if (isInitialFetch) {
        setSongs(transformedData)
      } else {
        setSongs(prev => [...prev, ...transformedData])
      }

      setHasMore((data?.length || 0) === PAGE_SIZE)
    } catch (err) {
      console.error('Error fetching songs:', err)
      setError('Failed to load songs')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchSongs(songs.length)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold">Songs</h1>
        
        {/* Search Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="input-group">
            <span className="btn btn-square btn-ghost">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="search"
              placeholder="Search songs..."
              value={songSearchTerm}
              onChange={(e) => setSongSearchTerm(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="input-group">
            <span className="btn btn-square btn-ghost">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="search"
              placeholder="Search by album..."
              value={albumSearchTerm}
              onChange={(e) => setAlbumSearchTerm(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="input-group">
            <span className="btn btn-square btn-ghost">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="search"
              placeholder="Search by artist..."
              value={artistSearchTerm}
              onChange={(e) => setArtistSearchTerm(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4 mt-8">
        {songs.map((song) => (
          <Link 
            key={song.id}
            href={`/songs/${song.id}/${slugify(song.title)}`}
            className="flex items-center gap-4 p-4 bg-base-100 rounded-lg shadow hover:shadow-md transition-shadow block"
          >
            <div className="shrink-0">
              {song.album.cover_medium ? (
                <Image
                  src={song.album.cover_medium}
                  alt={song.album.title}
                  width={64}
                  height={64}
                  className="rounded"
                />
              ) : (
                <div className="w-16 h-16 rounded bg-base-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-base-content opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold truncate">{song.title}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div 
                  onClick={(e) => {
                    e.preventDefault()
                    window.location.href = `/artists/${song.artist.id}/${slugify(song.artist.name)}`
                  }}
                  className="hover:text-primary hover:underline cursor-pointer"
                >
                  {song.artist.name}
                </div>
                <span>•</span>
                <div 
                  onClick={(e) => {
                    e.preventDefault()
                    window.location.href = `/albums/${song.album.id}/${slugify(song.album.title)}`
                  }}
                  className="hover:text-primary hover:underline truncate cursor-pointer"
                >
                  {song.album.title}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="btn btn-primary"
          >
            {loadingMore ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}
    </div>
  )
} 