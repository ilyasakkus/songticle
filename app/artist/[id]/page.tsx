'use client'

import Image from 'next/image'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/app/components/Breadcrumb'
import { useEffect, useState } from 'react'

interface Album {
  id: number
  title: string
  cover_medium: string | null
  songs: { count: number }
}

interface Artist {
  id: number
  name: string
  picture_medium: string | null
  albums?: Album[]
}

interface ArtistPageProps {
  params: {
    id: string
  }
}

export default function ArtistPage({ params }: ArtistPageProps) {
  const [artist, setArtist] = useState<Artist | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (!params?.id) return

    async function fetchArtist() {
      try {
        const { data, error } = await supabase
          .from('artists')
          .select(`
            *,
            albums (
              id,
              title,
              cover_medium,
              songs (count)
            )
          `)
          .eq('id', params.id)
          .single()

        if (error) throw error
        setArtist(data)
      } catch (err) {
        console.error('Error fetching artist:', err)
        setError('Failed to load artist')
      } finally {
        setLoading(false)
      }
    }

    fetchArtist()
  }, [params?.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error || !artist) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: 'Artists', href: '/artists' },
          { label: artist.name }
        ]} 
      />

      {/* Artist Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <div className="w-48 h-48 relative rounded-full overflow-hidden">
          <Image
            src={artist.picture_medium || '/placeholder-artist.jpg'}
            alt={artist.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">{artist.name}</h1>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artist.albums?.map((album, index) => (
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
                  priority={index < 4}
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
                {album.songs.count} songs
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 