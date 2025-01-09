'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface Artist {
  id: number
  name: string
  picture_medium: string | null
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const { data, error } = await supabase
          .from('artists')
          .select('*')
          .order('name')

        if (error) throw error

        setArtists(data || [])
      } catch (err) {
        console.error('Error fetching artists:', err)
        setError('Failed to load artists')
      } finally {
        setLoading(false)
      }
    }

    fetchArtists()
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
      <h1 className="text-2xl font-bold mb-6">Artists</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {artists.map((artist) => (
          <div key={artist.id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <figure className="px-4 pt-4">
              {artist.picture_medium ? (
                <img
                  src={artist.picture_medium}
                  alt={artist.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </figure>
            <div className="card-body items-center text-center p-4">
              <h2 className="card-title text-lg">{artist.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 