'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

// Slugify fonksiyonu
function slugify(text: string): string {
  if (!text) return 'null'

  // Türkçe karakterleri değiştir
  const turkishMap: { [key: string]: string } = {
    'ı': 'i', 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c',
    'İ': 'i', 'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'Ö': 'o', 'Ç': 'c'
  }

  // Önce Türkçe karakterleri değiştir
  const textWithoutTurkish = text.replace(/[ıİğĞüÜşŞöÖçÇ]/g, letter => turkishMap[letter] || letter)

  // Sonra normal slugify işlemini yap
  const cleanText = textWithoutTurkish
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Sadece harfler, rakamlar, boşluklar ve tire kalır
    .trim()
    .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
    .replace(/-+/g, '-') // Birden fazla tireyi tek tireye indir
    .replace(/^-+|-+$/g, '') // Baştaki ve sondaki tireleri kaldır

  // İlk karakter harf veya rakam değilse ve metin boş değilse, 'x' ekle
  const firstChar = cleanText.charAt(0)
  if (cleanText.length > 0 && !firstChar.match(/[a-z0-9]/)) {
    return 'x' + cleanText
  }

  // Eğer temizlenmiş metin boşsa 'null' dön
  return cleanText.length > 0 ? cleanText : 'null'
}

interface Artist {
  id: number
  name: string
  picture_medium: string | null
}

interface Album {
  id: number
  title: string
  cover_medium: string | null
  songs: Song[]
}

interface Song {
  id: number
  title: string
  preview_url: string | null
}

interface Props {
  artist: Artist
}

export function ArtistClient({ artist }: Props) {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAlbums()
  }, [artist.id])

  const fetchAlbums = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch albums with songs in a single query
      const { data: albumsData, error: albumsError } = await supabase
        .from('albums')
        .select(`
          id,
          title,
          cover_medium,
          songs!songs_album_id_fkey (
            id,
            title,
            preview_url,
            album_id,
            artist_id
          )
        `)
        .eq('artist_id', artist.id)
        .order('title')

      if (albumsError) {
        console.error('Supabase error:', albumsError)
        throw new Error(albumsError.message)
      }

      // Transform the data to match our interface
      const transformedAlbums = albumsData?.map(album => ({
        id: album.id,
        title: album.title,
        cover_medium: album.cover_medium,
        songs: album.songs || []
      })) || []

      setAlbums(transformedAlbums)
    } catch (err) {
      console.error('Error fetching albums:', err)
      setError(err instanceof Error ? err.message : 'Failed to load albums')
    } finally {
      setLoading(false)
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
      {/* Artist Header */}
      <div className="flex items-center gap-8 mb-12">
        {artist.picture_medium && (
          <Image
            src={artist.picture_medium}
            alt={artist.name}
            width={200}
            height={200}
            className="rounded-full shadow-lg"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold mb-2">{artist.name}</h1>
          <p className="text-gray-500">{albums.length} albums</p>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {albums.map((album) => (
          <div key={album.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
            <Link href={`/albums/${album.id}/${slugify(album.title)}`}>
              <figure className="px-6 pt-6">
                {album.cover_medium ? (
                  <Image
                    src={album.cover_medium}
                    alt={album.title}
                    width={300}
                    height={300}
                    className="rounded-xl"
                  />
                ) : (
                  <div className="w-[300px] h-[300px] rounded-xl bg-base-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-base-content opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                )}
              </figure>
              <div className="card-body">
                <h2 className="card-title hover:text-primary transition-colors">{album.title}</h2>
              </div>
            </Link>
            
            {/* Songs List */}
            <div className="px-6 pb-6">
              <div className="space-y-2">
                {album.songs.map((song) => (
                  <div 
                    key={song.id}
                    className="flex items-center justify-between p-2 hover:bg-base-200 rounded-lg transition-colors"
                  >
                    <Link 
                      href={`/songs/${song.id}/${slugify(song.title)}`}
                      className="text-sm hover:text-primary transition-colors"
                    >
                      {song.title}
                    </Link>
                    {song.preview_url && (
                      <button className="btn btn-ghost btn-sm btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 