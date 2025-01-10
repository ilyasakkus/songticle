'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/app/lib/supabase'
import type { Album, Song, Artist } from '@/app/types/database.types'
import { formatDuration } from '@/app/lib/utils'

interface AlbumWithDetails extends Album {
  songs: Song[]
  artist: Artist
  cover_medium: string
}

interface Props {
  albumId: string
}

export default function AlbumClient({ albumId }: Props) {
  const [album, setAlbum] = useState<AlbumWithDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAlbum() {
      try {
        const { data, error } = await supabase
          .from('albums')
          .select(`
            *,
            cover_medium,
            songs (*),
            artist:artist_id (*)
          `)
          .eq('id', albumId)
          .single()

        if (error) throw error

        setAlbum(data)
      } catch (err) {
        console.error('Error fetching album:', err)
        setError('Albüm bilgileri yüklenirken bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    fetchAlbum()
  }, [albumId])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  if (error || !album) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="alert alert-error">
          <span>{error || 'Albüm bulunamadı'}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Album Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <div className="relative w-64 h-64 rounded-lg overflow-hidden">
          <Image
            src={album.cover_medium }
            alt={album.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex-1">
          <Link 
            href={`/artist/${album.artist.id}`}
            className="text-sm text-primary hover:underline mb-2 inline-block"
          >
            {album.artist.name}
          </Link>
          <h1 className="text-4xl font-bold mb-4">{album.title}</h1>
          {album.release_date && (
            <p className="text-gray-500">
              {new Date(album.release_date).getFullYear()}
            </p>
          )}
          <p className="text-gray-500">
            {album.songs.length} şarkı
          </p>
        </div>
      </div>

      {/* Songs List */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-16">#</th>
              <th>Başlık</th>
              <th className="w-24 text-right">Süre</th>
            </tr>
          </thead>
          <tbody>
            {album.songs.map((song, index) => (
              <tr key={song.id} className="hover">
                <td>{index + 1}</td>
                <td>
                  <div>
                    <div className="font-medium">{song.title}</div>
                    {song.title_version && (
                      <div className="text-sm text-gray-500">
                        {song.title_version}
                      </div>
                    )}
                  </div>
                </td>
                <td className="text-right">
                  {formatDuration(song.duration)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 