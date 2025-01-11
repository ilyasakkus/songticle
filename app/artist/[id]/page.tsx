'use client'

import { useEffect, useState, use } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/app/lib/supabase'
import type { Artist, Song } from '@/app/types/database.types'

interface Album {
  id: number
  title: string
  cover_medium: string | null
  artist_id: number
  artist_name: string
  songs?: Song[]
  songs_count?: number
}

interface ArtistWithAlbums extends Artist {
  albums: Album[]
}

export default function ArtistPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [artist, setArtist] = useState<ArtistWithAlbums | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArtist() {
      try {
        // First fetch artist details
        const { data: artistData, error: artistError } = await supabase
          .from('artists')
          .select('*')
          .eq('id', params.id)
          .single()

        if (artistError) throw artistError

        // Then fetch albums with songs count
        const { data: albumsData, error: albumsError } = await supabase
          .from('albums')
          .select(`
            id,
            title,
            cover_medium,
            artist_id,
            artist_name,
            songs (count)
          `)
          .eq('artist_id', params.id)

        if (albumsError) throw albumsError

        // Transform albums data to include songs count
        const albumsWithCount = albumsData.map(album => ({
          ...album,
          songs_count: album.songs?.[0]?.count || 0
        }))

        // Combine artist and albums data
        const artistWithAlbums = {
          ...artistData,
          albums: albumsWithCount
        }

        console.log('Artist with albums:', artistWithAlbums)
        setArtist(artistWithAlbums)
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
            src={artist.picture_medium}
            alt={artist.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{artist.name}</h1>
          <p className="text-lg text-gray-500">
            {artist.albums?.length || 0} albüm
          </p>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artist.albums?.map((album) => (
          <div 
            key={album.id} 
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200"
          >
            <Link href={`/albums/${album.id}`}>
              <figure className="relative w-full pt-[100%]">
                <Image
                  src={album.cover_medium || '/placeholder-album.jpg'}
                  alt={album.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </figure>
            </Link>
            <div className="card-body">
              <Link 
                href={`/albums/${album.id}`}
                className="card-title hover:text-primary hover:underline"
              >
                {album.title}
              </Link>
              <p className="text-sm text-gray-500">
                {album.songs_count} şarkı
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 