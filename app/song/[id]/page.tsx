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
  artist_id: number
  artist_name: string
  album_id: number
  album_title: string
}

interface SongPageProps {
  params: {
    id: string
  }
}

export default function SongPage({ params }: SongPageProps) {
  const [song, setSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchSong() {
      try {
        const { data: songData, error: songError } = await supabase
          .from('songs')
          .select(`
            *,
            artists (
              id,
              name
            ),
            albums (
              id,
              title
            )
          `)
          .eq('id', params.id)
          .single()

        if (songError) throw new Error('Song not found')

        setSong({
          ...songData,
          artist_id: songData.artists?.id || 0,
          artist_name: songData.artists?.name || '',
          album_id: songData.albums?.id || 0,
          album_title: songData.albums?.title || ''
        })
      } catch (err) {
        console.error('Error fetching song:', err)
        setError('Failed to load song')
      } finally {
        setLoading(false)
      }
    }

    fetchSong()
  }, [params.id, supabase])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error || !song) {
    return notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0">
          {song.cover_image ? (
            <Image
              src={song.cover_image}
              alt={song.title}
              width={256}
              height={256}
              className="w-full aspect-square object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full aspect-square flex items-center justify-center bg-base-200 rounded-lg">
              <Music className="w-12 h-12" />
            </div>
          )}
        </div>
        
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{song.title}</h1>
          <div className="space-y-2">
            <p className="text-lg">
              Artist: <a href={`/artist/${song.artist_id}`} className="link link-primary">{song.artist_name}</a>
            </p>
            <p className="text-lg">
              Album: <a href={`/albums/${song.album_id}`} className="link link-primary">{song.album_title}</a>
            </p>
          </div>
          
          {song.preview_url && (
            <div className="mt-4">
              <audio controls className="w-full">
                <source src={song.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 