'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/app/components/Breadcrumb'
import { useEffect, useState } from 'react'

interface Playlist {
  id: number
  title: string
  user_id: string
  created_at: string
}

interface PlaylistPageProps {
  params: {
    id: string
  }
}

export default function PlaylistPage({ params }: PlaylistPageProps) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (!params?.id) return

    async function fetchPlaylist() {
      try {
        const { data, error } = await supabase
          .from('playlists')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) throw error
        setPlaylist(data)
      } catch (err) {
        console.error('Error fetching playlist:', err)
        setError('Failed to load playlist')
      } finally {
        setLoading(false)
      }
    }

    fetchPlaylist()
  }, [params?.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error || !playlist) {
    return notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 space-y-6">
      <Breadcrumb 
        items={[
          { label: 'Playlists', href: '/playlists' },
          { label: playlist.title }
        ]} 
      />
      
      {/* Playlist Content */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">{playlist.title}</h1>
        </div>
        
        {/* Playlist songs will be rendered here */}
      </div>
    </div>
  )
} 