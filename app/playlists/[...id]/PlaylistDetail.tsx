'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Pause, ArrowLeft } from 'lucide-react'

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

interface PlaylistDetailProps {
  id: string
}

export default function PlaylistDetail({ id }: PlaylistDetailProps) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [playingSongId, setPlayingSongId] = useState<number | null>(null)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const supabase = createClientComponentClient()

  const fetchPlaylist = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('playlists')
        .select(`
          *,
          artists:artist_id(*),
          songs:playlist_songs(
            songs(*)
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error

      // Transform the nested songs data
      const transformedPlaylist = {
        ...data,
        songs: data.songs.map((item: any) => item.songs)
      }

      setPlaylist(transformedPlaylist)
    } catch (err: any) {
      console.error('Error fetching playlist:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [id, supabase])

  useEffect(() => {
    fetchPlaylist()
  }, [fetchPlaylist])

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause()
        audio.src = ''
      }
    }
  }, [audio])

  const handlePlayPause = (songId: number, previewUrl: string) => {
    if (playingSongId === songId) {
      audio?.pause()
      setPlayingSongId(null)
      return
    }

    if (audio) {
      audio.pause()
    }

    const newAudio = new Audio(previewUrl)
    newAudio.play()
    setAudio(newAudio)
    setPlayingSongId(songId)

    newAudio.addEventListener('ended', () => {
      setPlayingSongId(null)
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error || !playlist) {
    return (
      <div className="alert alert-error">
        <span>{error || 'Playlist not found'}</span>
      </div>
    )
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Link 
        href="/playlists" 
        className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Playlists
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-6 mb-6">
          {playlist.artists?.picture_medium && (
            <Image
              src={playlist.artists.picture_medium}
              alt={playlist.artists.name}
              width={96}
              height={96}
              className="rounded-full"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold mb-2">{playlist.title}</h1>
            <p className="text-xl text-gray-500 mb-2">{playlist.description}</p>
            <p className="text-sm text-gray-400">
              Created on {new Date(playlist.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </header>

      <div className="prose prose-lg max-w-none mb-12">
        {playlist.content.split('\n').map((line, index) => {
          // Clean the line from any markdown or special characters
          const cleanLine = line.trim()
            .replace(/\*\*/g, '')    // Remove bold markers
            .replace(/\*/g, '')      // Remove italic markers
            .replace(/`/g, '')       // Remove code markers
            .replace(/•/g, '')       // Remove bullet points
            .replace(/###/g, '')     // Remove h3 markers
            .replace(/##/g, '')      // Remove h2 markers
            .replace(/#/g, '')       // Remove h1 markers

          if (line.trim().startsWith('h2 ')) {
            // Convert to h2 and clean the title
            return (
              <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                {cleanLine.replace('h2 ', '')}
              </h2>
            )
          } else if (cleanLine && !cleanLine.startsWith('-')) {
            return (
              <p key={index} className="text-gray-600 mb-4">
                {cleanLine}
              </p>
            )
          }
          return null
        })}
      </div>

      <div className="bg-base-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Featured Songs</h2>
        <div className="space-y-3">
          {playlist.songs.map((song, index) => (
            <div
              key={song.id}
              className="flex items-center gap-4 p-3 bg-base-100 rounded-lg hover:bg-base-300 transition-colors"
            >
              <span className="w-8 text-center text-gray-500">{index + 1}</span>
              {song.cover_image && (
                <Image
                  src={song.cover_image}
                  alt={song.title}
                  width={48}
                  height={48}
                  className="rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="font-medium">{song.title}</h3>
              </div>
              {song.preview_url && (
                <button
                  onClick={() => handlePlayPause(song.id, song.preview_url)}
                  className="btn btn-ghost btn-circle"
                >
                  {playingSongId === song.id ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  )
} 