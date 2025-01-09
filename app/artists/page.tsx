'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { slugify } from '../lib/utils'

interface Artist {
  id: number
  name: string
  picture_medium: string | null
}

const PAGE_SIZE = 40

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchArtists()
  }, [])

  const fetchArtists = async (start = 0) => {
    try {
      const isInitialFetch = start === 0
      isInitialFetch ? setLoading(true) : setLoadingMore(true)
      setError(null)

      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .order('name')
        .range(start, start + PAGE_SIZE - 1)

      if (error) throw error

      if (isInitialFetch) {
        setArtists(data || [])
      } else {
        setArtists(prev => [...prev, ...(data || [])])
      }

      setHasMore((data?.length || 0) === PAGE_SIZE)
    } catch (err) {
      console.error('Error fetching artists:', err)
      setError('Failed to load artists')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchArtists(artists.length)
    }
  }

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        <h1 className="text-3xl font-bold">Artists</h1>
        
        {/* Search Bar */}
        <div className="w-full max-w-md">
          <div className="input-group">
            <span className="btn btn-square btn-ghost">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="search"
              placeholder="Search artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mt-8">
        {filteredArtists.map((artist) => (
          <Link 
            key={artist.id}
            href={`/artists/${artist.id}/${slugify(artist.name)}`}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <figure className="px-3 pt-3">
              {artist.picture_medium ? (
                <Image
                  src={artist.picture_medium}
                  alt={artist.name}
                  width={150}
                  height={150}
                  className="rounded-full"
                />
              ) : (
                <div className="w-[150px] h-[150px] rounded-full bg-base-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-base-content opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </figure>
            <div className="card-body p-3 items-center text-center">
              <h2 className="card-title text-sm">{artist.name}</h2>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && !searchTerm && (
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