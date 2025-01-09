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
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const supabase = createClientComponentClient()

  useEffect(() => {
    setCurrentPage(1)
    void fetchArtists(1)
  }, [searchTerm])

  useEffect(() => {
    void fetchArtists(currentPage)
  }, [currentPage])

  const fetchArtists = async (page: number) => {
    try {
      setLoading(true)
      setError(null)

      // Calculate range
      const from = (page - 1) * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      let query = supabase
        .from('artists')
        .select('*', { count: 'exact' })

      // Add search filter
      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`)
      }

      // Add pagination
      query = query
        .order('name')
        .range(from, to)

      const { data, error, count } = await query

      if (error) throw error

      setArtists(data || [])
      if (count !== null) {
        setTotalCount(count)
      }
    } catch (err) {
      console.error('Error fetching artists:', err)
      setError('Failed to load artists')
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

  if (loading && artists.length === 0) {
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
        {artists.map((artist) => (
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
    </div>
  )
} 