'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { slugify } from '../lib/utils'

interface Album {
  id: number
  title: string
  cover_medium: string | null
  artists: {
    id: number
    name: string
  }
}

const PAGE_SIZE = 40

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [artistSearchTerm, setArtistSearchTerm] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchAlbums()
  }, [])

  const fetchAlbums = async (start = 0) => {
    try {
      const isInitialFetch = start === 0
      isInitialFetch ? setLoading(true) : setLoadingMore(true)
      setError(null)

      const { data, error } = await supabase
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
        .order('title')
        .range(start, start + PAGE_SIZE - 1)

      if (error) throw error

      const transformedData = data?.map(album => ({
        ...album,
        artists: album.artists
      })) || []

      if (isInitialFetch) {
        setAlbums(transformedData)
      } else {
        setAlbums(prev => [...prev, ...transformedData])
      }

      setHasMore((data?.length || 0) === PAGE_SIZE)
    } catch (err) {
      console.error('Error fetching albums:', err)
      setError('Failed to load albums')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchAlbums(albums.length)
    }
  }

  const filteredAlbums = albums.filter(album => {
    const titleMatch = album.title.toLowerCase().includes(searchTerm.toLowerCase())
    const artistMatch = album.artists.name.toLowerCase().includes(artistSearchTerm.toLowerCase())
    return titleMatch && artistMatch
  })

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
        <h1 className="text-3xl font-bold">Albums</h1>
        
        {/* Search Bars */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="input-group">
              <span className="btn btn-square btn-ghost">
                <Search className="h-5 w-5" />
              </span>
              <input
                type="search"
                placeholder="Search albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="flex-1">
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
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-8">
        {filteredAlbums.map((album) => (
          <Link 
            key={album.id}
            href={`/albums/${album.id}/${slugify(album.title)}`}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <figure className="px-4 pt-4">
              {album.cover_medium ? (
                <Image
                  src={album.cover_medium}
                  alt={album.title}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-[200px] h-[200px] rounded-lg bg-base-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-base-content opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
              )}
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-sm">{album.title}</h2>
              <p className="text-sm text-gray-500">{album.artists.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && !searchTerm && !artistSearchTerm && (
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