'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Play, Pause } from 'lucide-react'

interface Song {
  id: number
  title: string
  cover_image: string | null
  preview_url: string | null
  artists: {
    name: string
  } | null
}

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [playingSongId, setPlayingSongId] = useState<number | null>(null)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const { data, error } = await supabase
          .from('songs')
          .select(`
            *,
            artists!songs_artist_id_fkey (
              name
            )
          `)
          .order('title')

        if (error) throw error

        setSongs(data || [])
      } catch (err) {
        console.error('Error fetching songs:', err)
        setError('Failed to load songs')
      } finally {
        setLoading(false)
      }
    }

    fetchSongs()
  }, [])

  const handlePlayPause = async (songId: number, previewUrl: string) => {
    if (playingSongId === songId) {
      audio?.pause()
      setPlayingSongId(null)
      setAudio(null)
    } else {
      audio?.pause()
      const newAudio = new Audio(previewUrl)
      await newAudio.play()
      setPlayingSongId(songId)
      setAudio(newAudio)

      newAudio.onended = () => {
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Songs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {songs.map((song) => (
          <div key={song.id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center p-4 gap-4">
              <div className="relative w-16 h-16">
                {song.cover_image ? (
                  <img
                    src={song.cover_image}
                    alt={song.title}
                    className="w-full h-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-lg bg-gray-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                )}
                {song.preview_url && (
                  <button
                    onClick={() => handlePlayPause(song.id, song.preview_url!)}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg"
                  >
                    {playingSongId === song.id ? (
                      <Pause className="h-6 w-6 text-white" />
                    ) : (
                      <Play className="h-6 w-6 text-white" />
                    )}
                  </button>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-medium text-sm line-clamp-1">{song.title}</h2>
                <p className="text-xs text-gray-500">{song.artists?.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 