'use client'

import { useEffect, useState, use } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/app/lib/supabase'
import type { Artist, Album, Song } from '@/app/types/database.types'

interface ArtistWithAlbums extends Artist {
  albums: (Album & { songs: Song[] })[]
}

interface Album {
  id: string
  title: string
  cover_medium: string
  songs: Song[]
}

export default function ArtistPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [artist, setArtist] = useState<ArtistWithAlbums | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArtist() {
      try {
        const { data, error } = await supabase
          .from('artists')
          .select(`
            *,
            albums (
              *,
              cover_medium,
              songs (*)
            )
          `)
          .eq('id', params.id)
          .single()

        if (error) throw error

        setArtist(data)
      } catch (err) {
        console.error('Error fetching artist:', err)
        setError('Sanatçı bilgileri yüklenirken bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    fetchArtist()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  if (error || !artist) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="alert alert-error">
          <span>{error || 'Sanatçı bulunamadı'}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Artist Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <div className="relative w-64 h-64 rounded-lg overflow-hidden">
          <Image
            src={artist.picture_medium || '/placeholder-artist.jpg'}
            alt={artist.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{artist.name}</h1>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artist.albums?.map((album) => (
          <Link 
            key={album.id} 
            href={`/album/${album.id}`}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200"
          >
            <figure className="relative w-full pt-[100%]">
              <Image
                src={album.cover_medium || '/placeholder-album.jpg'}
                alt={album.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{album.title}</h2>
              <p className="text-sm text-gray-500">
                {album.songs?.length || 0} şarkı
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 