'use client'

import React, { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { useDebounce } from '../hooks/useDebounce'
import { SearchInput } from './SearchInput'

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

interface SongListProps {
  songSearch: string
  albumSearch: string
  artistSearch: string
}

function slugify(text: string): string {
  if (!text) return 'null'

  // Türkçe karakterleri dönüştür
  const turkishToEnglish: { [key: string]: string } = {
    'Ş': 'S', 'ş': 's',
    'Ğ': 'G', 'ğ': 'g',
    'Ü': 'U', 'ü': 'u',
    'Ö': 'O', 'ö': 'o',
    'Ç': 'C', 'ç': 'c',
    'İ': 'I', 'ı': 'i', 'I': 'i', 'i': 'i'
  }

  // Metni dönüştür
  let cleanText = text
    // Her karakteri kontrol et ve dönüştür
    .split('')
    .map(char => turkishToEnglish[char] || char)
    .join('')
    .toLowerCase()
    .trim()

  // Özel karakterleri ve boşlukları temizle
  cleanText = cleanText
    // Noktalama işaretlerini ve özel karakterleri boşluğa çevir (sayılar hariç)
    .replace(/[^\w\s0-9-]/g, ' ')
    // Birden fazla boşluğu tek boşluğa indir
    .replace(/\s+/g, ' ')
    .trim()
    // Boşlukları tire ile değiştir
    .replace(/\s/g, '-')
    // Birden fazla tireyi tek tireye indir
    .replace(/-+/g, '-')
    // Baştaki ve sondaki tireleri kaldır
    .replace(/^-+|-+$/g, '')

  // Eğer metin boşsa 'null' dön
  if (cleanText.length === 0) return 'null'

  // İlk karakter harf veya rakam değilse 'x' ekle
  const firstChar = cleanText.charAt(0)
  if (!firstChar.match(/[a-z0-9]/)) {
    cleanText = 'x' + cleanText
  }

  return cleanText
}

export function SongList({ songSearch, albumSearch, artistSearch }: SongListProps) {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const supabase = createClientComponentClient()

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  useEffect(() => {
    setCurrentPage(1)
    void fetchSongs(1)
  }, [songSearch, albumSearch, artistSearch])

  useEffect(() => {
    void fetchSongs(currentPage)
  }, [currentPage])

  const fetchSongs = async (page: number) => {
    try {
      setLoading(true)
      setError(null)

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

      if (songSearch) {
        query = query.ilike('title', `%${songSearch}%`)
      }
      if (albumSearch) {
        query = query.ilike('album_name', `%${albumSearch}%`)
      }
      if (artistSearch) {
        query = query.ilike('artist_name', `%${artistSearch}%`)
      }

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
    <div className="space-y-6">
      {/* Songs List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {songs.map((song) => (
          <div 
            key={song.id}
            className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-3">
              <div className="flex gap-3">
                <div className="shrink-0">
                  {song.album.cover_medium ? (
                    <Image
                      src={song.album.cover_medium}
                      alt={song.album.title}
                      width={64}
                      height={64}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-base-300 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-base-content opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link 
                    href={`/songs/${song.id}/${slugify(song.title)}`}
                    className="block"
                  >
                    <h2 className="font-semibold text-base line-clamp-1 hover:text-primary transition-colors">
                      {song.title}
                    </h2>
                  </Link>
                  <div className="flex flex-col gap-1 mt-1">
                    <div className="text-sm text-base-content/70 hover:text-primary hover:underline truncate">
                      <Link href={`/artists/${song.artist.id}/${slugify(song.artist.name)}`}>
                        {song.artist.name}
                      </Link>
                    </div>
                    <div className="text-sm text-base-content/60 hover:text-primary hover:underline truncate">
                      <Link href={`/albums/${song.album.id}/${slugify(song.album.title)}`}>
                        {song.album.title}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 sm:gap-2 mt-6 flex-wrap">
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