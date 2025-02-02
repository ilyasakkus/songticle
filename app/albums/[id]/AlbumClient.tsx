'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { slugify } from '../../lib/utils'
import { Image } from '@/app/components/ui/image'

interface Song {
  id: number
  title: string
  preview_url: string | null
}

interface Artist {
  id: number
  name: string
  picture_medium: string | null
}

interface Album {
  id: number
  title: string
  cover_medium: string | null
  artists: Artist
}

interface Props {
  album: Album
}

export function AlbumClient({ album }: Props) {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchSongs()
  }, [album.id])

  const fetchSongs = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: songsData, error: songsError } = await supabase
        .from('songs')
        .select('id, title, preview_url')
        .eq('album_id', album.id)
        .order('id')

      if (songsError) throw songsError
      setSongs(songsData || [])
    } catch (err) {
      console.error('Error fetching songs:', err)
      setError('Failed to load songs')
    } finally {
      setLoading(false)
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
      {/* Album Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
        <div className="relative w-64 h-64 shrink-0">
          {album.cover_medium && (
            <Image
              src={album.cover_medium}
              alt={album.title}
              fill
              className="rounded-lg shadow-lg object-cover"
            />
          )}
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{album.title}</h1>
          <Link 
            href={`/artists/${album.artists.id}/${slugify(album.artists.name)}`}
            className="text-xl text-primary hover:underline mb-2 inline-block"
          >
            {album.artists.name}
          </Link>
          <p className="text-gray-500">{songs.length} songs</p>
        </div>
      </div>

      {/* Songs List */}
      <div className="space-y-2">
        {songs.map((song, index) => (
          <div 
            key={song.id}
            className="flex items-center justify-between p-4 hover:bg-base-200 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-gray-500 w-8">{index + 1}</span>
              <span>{song.title}</span>
            </div>
            {song.preview_url && (
              <button className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 