'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface Album {
  id: number
  title: string
  cover_medium: string | null
  artist_id: number
  artists: {
    name: string
  } | null
}

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const { data, error } = await supabase
          .from('albums')
          .select(`
            id,
            title,
            cover_medium,
            artist_id,
            artists:artists!albums_artist_id_fkey (
              name
            )
          `)
          .order('title')

        if (error) throw error

        setAlbums(data || [])
      } catch (err) {
        console.error('Error fetching albums:', err)
        setError('Failed to load albums')
      } finally {
        setLoading(false)
      }
    }

    fetchAlbums()
  }, [])

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Albums</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {albums.map((album) => (
          <div key={album.id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <figure className="px-4 pt-4">
              {album.cover_medium ? (
                <img
                  src={album.cover_medium}
                  alt={album.title}
                  className="w-full aspect-square rounded-lg object-cover"
                />
              ) : (
                <div className="w-full aspect-square rounded-lg bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
              )}
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-sm line-clamp-1">{album.title}</h2>
              <p className="text-xs text-gray-500">{album.artists?.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 