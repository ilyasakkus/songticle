'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { Play, Pause, ArrowRight } from 'lucide-react'
import { Image } from '@/app/components/ui/image'

interface Artist {
  id: number
  name: string
  picture_medium: string | null
}

interface Song {
  id: number
  title: string
  preview_url: string | null
  cover_image: string | null
}

interface Playlist {
  id: number
  title: string
  description: string
  content: string
  created_at: string
  artists: Artist
  songs: Song[]
}

function getExcerpt(content: string, maxLength: number = 300) {
  const firstParagraphs = content
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('##'))
    .slice(0, 2)
    .join('\n')
    .trim()

  if (firstParagraphs.length <= maxLength) return firstParagraphs

  return firstParagraphs.slice(0, maxLength) + '...'
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [playingSongId, setPlayingSongId] = useState<number | null>(null)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchPlaylists()
  }, [])

  const fetchPlaylists = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('playlists')
        .select(`
          *,
          artists!playlists_artist_id_fkey (
            id,
            name,
            picture_medium
          ),
          playlist_songs (
            position,
            songs (
              id,
              title,
              preview_url,
              cover_image
            )
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Transform the data to flatten the playlist_songs structure
      const transformedData = data.map(playlist => ({
        ...playlist,
        songs: playlist.playlist_songs
          .sort((a: any, b: any) => a.position - b.position)
          .map((ps: any) => ps.songs)
      }))

      setPlaylists(transformedData)
    } catch (err) {
      console.error('Error fetching playlists:', err)
      setError('Failed to load playlists')
    } finally {
      setLoading(false)
    }
  }

  const handlePlayPause = async (songId: number, previewUrl: string | null) => {
    if (!previewUrl) return

    if (playingSongId === songId) {
      // Pause current song
      audio?.pause()
      setPlayingSongId(null)
      setAudio(null)
    } else {
      // Stop current song if any
      audio?.pause()
      
      try {
        // Play new song
        const newAudio = new Audio(previewUrl)
        await newAudio.play()
        setPlayingSongId(songId)
        setAudio(newAudio)
        
        // Handle song end
        newAudio.onended = () => {
          setPlayingSongId(null)
          setAudio(null)
        }
      } catch (err) {
        console.error('Error playing audio:', err)
        setPlayingSongId(null)
        setAudio(null)
      }
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
      <h1 className="text-3xl font-bold mb-8">Playlists</h1>

      <div className="grid gap-6">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="card bg-base-100 shadow-xl">
            <div className="card-body p-6">
              <div className="flex items-center gap-4">
                {playlist.artists?.picture_medium && (
                  <Image
                    src={playlist.artists.picture_medium}
                    alt={playlist.artists.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                )}
                <div>
                  <Link 
                    href={`/playlists/${playlist.id}/${slugify(playlist.title)}`} 
                    className="hover:underline"
                  >
                    <h2 className="card-title">{playlist.title}</h2>
                  </Link>
                  <p className="text-gray-500">{playlist.description}</p>
                  <p className="text-sm text-gray-400">
                    Created on {new Date(playlist.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {playlist.content && (
                <div className="mt-4 prose max-w-none">
                  <p className="text-gray-600">{getExcerpt(playlist.content)}</p>
                </div>
              )}

              {playlist.songs.length > 0 && (
                <div className="mt-4">
                  <div
                    key={playlist.songs[0].id}
                    className="flex items-center gap-4 p-2 hover:bg-base-200 rounded-lg transition-colors"
                  >
                    <span className="w-8 text-center text-gray-500">1</span>
                    {playlist.songs[0].cover_image && (
                      <Image
                        src={playlist.songs[0].cover_image}
                        alt={playlist.songs[0].title}
                        width={40}
                        height={40}
                        className="rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{playlist.songs[0].title}</h3>
                    </div>
                    {playlist.songs[0].preview_url && (
                      <button
                        onClick={() => handlePlayPause(playlist.songs[0].id, playlist.songs[0].preview_url)}
                        className="btn btn-ghost btn-circle"
                      >
                        {playingSongId === playlist.songs[0].id ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6" />
                        )}
                      </button>
                    )}
                  </div>
                  {playlist.songs.length > 1 && (
                    <div className="text-center mt-2">
                      <Link 
                        href={`/playlists/${playlist.id}/${slugify(playlist.title)}`}
                        className="text-sm text-gray-500 hover:underline inline-flex items-center gap-2"
                      >
                        View all {playlist.songs.length} songs <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 