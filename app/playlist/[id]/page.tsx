'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Music } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Song {
  id: number
  title: string
  cover_image: string
  preview_url: string | null
  artists: {
    id: number
    name: string
  }
}

interface Playlist {
  id: number
  title: string
  description: string
  user_id: string
  created_at: string
  songs: Song[]
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
    async function fetchPlaylist() {
      try {
        const { data: playlistData, error: playlistError } = await supabase
          .from('playlists')
          .select(`
            *,
            playlist_songs (
              songs (
                id,
                title,
                cover_image,
                preview_url,
                artists (
                  id,
                  name
                )
              )
            )
          `)
          .eq('id', params.id)
          .single()

        if (playlistError) throw new Error('Playlist not found')

        // Transform the data to match our interface
        const transformedPlaylist: Playlist = {
          ...playlistData,
          songs: playlistData.playlist_songs.map((ps: any) => ps.songs)
        }

        setPlaylist(transformedPlaylist)
      } catch (err) {
        console.error('Error fetching playlist:', err)
        setError('Failed to load playlist')
      } finally {
        setLoading(false)
      }
    }

    fetchPlaylist()
  }, [params.id, supabase])

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
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{playlist.title}</h1>
          {playlist.description && (
            <p className="text-base-content/70">{playlist.description}</p>
          )}
        </div>

        <div className="space-y-4">
          {playlist.songs.map((song) => (
            <div key={song.id} className="flex items-center gap-4 bg-base-100 p-4 rounded-lg">
              <div className="w-16 h-16 shrink-0">
                {song.cover_image ? (
                  <Image
                    src={song.cover_image}
                    alt={song.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-base-200 rounded">
                    <Music className="w-6 h-6" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">
                  <a href={`/song/${song.id}`} className="hover:text-primary">
                    {song.title}
                  </a>
                </h3>
                <p className="text-sm text-base-content/70 truncate">
                  <a href={`/artist/${song.artists.id}`} className="hover:text-primary">
                    {song.artists.name}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 