'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface Playlist {
  id: number
  title: string
  description: string | null
  cover_image: string | null
  user_id: string
  created_at: string
  user: {
    full_name: string
  } | null
}

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const { data, error } = await supabase
          .from('playlists')
          .select(`
            *,
            user:profiles!playlists_user_id_fkey (
              full_name
            )
          `)
          .order('created_at', { ascending: false })

        if (error) throw error

        setPlaylists(data || [])
      } catch (err) {
        console.error('Error fetching playlists:', err)
        setError('Failed to load playlists')
      } finally {
        setLoading(false)
      }
    }

    fetchPlaylists()
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
      <h1 className="text-2xl font-bold mb-6">Playlists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <figure className="px-4 pt-4">
              {playlist.cover_image ? (
                <img
                  src={playlist.cover_image}
                  alt={playlist.title}
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
              <h2 className="card-title text-sm line-clamp-1">{playlist.title}</h2>
              {playlist.description && (
                <p className="text-xs text-gray-600 line-clamp-2">{playlist.description}</p>
              )}
              <div className="text-xs text-gray-500 mt-2">
                <p>Created by {playlist.user?.full_name || 'Anonymous'}</p>
                <p>{new Date(playlist.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 