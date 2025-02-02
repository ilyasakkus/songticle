'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { slugify } from '../lib/utils'
import { Image } from '../components/ui/image'

interface Song {
  id: number
  title: string
}

interface Album {
  id: number
  title: string
  cover_medium: string | null
  artists: {
    id: number
    name: string
  }[]
  songs?: Song[]
}

const PAGE_SIZE = 36

export default function AlbumsList() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [artistSearchTerm, setArtistSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const supabase = createClientComponentClient()

  useEffect(() => {
    setCurrentPage(1)
    void fetchAlbums(1)
  }, [searchTerm, artistSearchTerm])

  useEffect(() => {
    void fetchAlbums(currentPage)
  }, [currentPage])

  const fetchAlbums = async (page: number) => {
    try {
      setLoading(true)
      setError(null)

      const from = (page - 1) * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      let query = supabase
        .from('albums')
        .select(`
          id,
          title,
          cover_medium,
          artists!albums_artist_id_fkey (
            id,
            name
          )
        `, { count: 'exact' })

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`)
      }
      if (artistSearchTerm) {
        query = query.ilike('artist_name', `%${artistSearchTerm}%`)
      }

      query = query
        .order('title')
        .range(from, to)

      const { data, error, count } = await query

      if (error) throw error

      const transformedData = data?.map(album => ({
        id: album.id,
        title: album.title,
        cover_medium: album.cover_medium,
        artists: Array.isArray(album.artists) ? album.artists.map(artist => ({
          id: artist.id,
          name: artist.name
        })) : []
      })) || []

      setAlbums(transformedData)
      if (count !== null) {
        setTotalCount(count)
      }
    } catch (err) {
      console.error('Error fetching albums:', err)
      setError('Failed to load albums')
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getPageNumbers = () => {
    const totalPages = Math.ceil(totalCount / PAGE_SIZE)
    const pageNumbers: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)

      let start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 2)
      let end = Math.min(start + maxVisiblePages - 3, totalPages - 1)

      if (end === totalPages - 1) {
        start = Math.max(end - maxVisiblePages + 3, 2)
      }

      if (start > 2) {
        pageNumbers.push('...')
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }

      if (end < totalPages - 1) {
        pageNumbers.push('...')
      }

      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  if (loading && albums.length === 0) {
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

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <>
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

      {/* Albums Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-8">
        {albums.map((album) => (
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
              <p className="text-sm text-gray-500">
                {album.artists.map(artist => artist.name).join(', ')}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="btn btn-circle btn-sm"
          >
            ←
          </button>
          
          {getPageNumbers().map((pageNumber, index) => (
            <button
              key={index}
              onClick={() => typeof pageNumber === 'number' ? handlePageChange(pageNumber) : null}
              disabled={loading || pageNumber === '...'}
              className={`btn btn-circle btn-sm ${
                pageNumber === currentPage ? 'btn-primary' : 
                pageNumber === '...' ? 'btn-disabled' : ''
              }`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="btn btn-circle btn-sm"
          >
            →
          </button>
        </div>
      )}
    </>
  )
} 