'use client'

import React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { slugify } from '../lib/utils'
import { useDebounce } from '../hooks/useDebounce'

interface Album {
  id: number
  title: string
  cover_medium: string | null
}

interface Artist {
  id: number
  name: string
}

interface DatabaseSong {
  id: number
  title: string
  preview_url: string | null
  albums: Album
  artists: Artist
}

interface Song extends Omit<DatabaseSong, 'albums' | 'artists'> {
  album: Album
  artist: Artist
}

const PAGE_SIZE = 20

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [songSearchTerm, setSongSearchTerm] = useState('')
  const [albumSearchTerm, setAlbumSearchTerm] = useState('')
  const [artistSearchTerm, setArtistSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const supabase = createClientComponentClient()

  const debouncedSongSearch = useDebounce(songSearchTerm, 300)
  const debouncedAlbumSearch = useDebounce(albumSearchTerm, 300)
  const debouncedArtistSearch = useDebounce(artistSearchTerm, 300)

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  useEffect(() => {
    setCurrentPage(1)
    void fetchSongs(1)
  }, [debouncedSongSearch, debouncedAlbumSearch, debouncedArtistSearch])

  useEffect(() => {
    void fetchSongs(currentPage)
  }, [currentPage])

  const fetchSongs = async (page: number) => {
    try {
      setLoading(true)
      setError(null)

      // Calculate range
      const from = (page - 1) * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

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
        `, { count: 'exact' })

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
        .range(from, to)

      const { data, error, count } = await query

      if (error) throw error

      const transformedData: Song[] = (data as unknown as DatabaseSong[])?.map(song => ({
        id: song.id,
        title: song.title,
        preview_url: song.preview_url,
        album: song.albums,
        artist: song.artists
      }))

      setSongs(transformedData)
      if (count !== null) {
        setTotalCount(count)
      }
    } catch (err) {
      console.error('Error fetching songs:', err)
      setError('Failed to load songs')
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getPageNumbers = () => {
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

  if (loading && songs.length === 0) {
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSongSearchTerm(e.target.value)}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAlbumSearchTerm(e.target.value)}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArtistSearchTerm(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </div>
      
      {/* Songs List */}
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
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.preventDefault()
                    window.location.href = `/artists/${song.artist.id}/${slugify(song.artist.name)}`
                  }}
                  className="hover:text-primary hover:underline cursor-pointer"
                >
                  {song.artist.name}
                </div>
                <span>•</span>
                <div 
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
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