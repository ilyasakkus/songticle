import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Music } from 'lucide-react'
import { Image } from '@/app/components/ui/image'

interface Album {
  id: number
  title: string
  cover_image: string
  songs_count: number
}

interface Artist {
  id: number
  name: string
  image_url: string
  albums: Album[]
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ArtistPage({ params }: PageProps) {
  const cookieStore = await cookies()
  const supabase = createServerComponentClient({ cookies: () => Promise.resolve(cookieStore) })
  const { id } = await params

  try {
    const { data: artist, error: artistError } = await supabase
      .from('artists')
      .select('*')
      .eq('id', id)
      .single()

    if (artistError) throw new Error('Artist not found')

    const { data: albums, error: albumsError } = await supabase
      .from('albums')
      .select(`
        id,
        title,
        cover_image,
        songs (count)
      `)
      .eq('artist_id', id)

    if (albumsError) throw new Error('Albums not found')

    const artistWithAlbums: Artist = {
      ...artist,
      albums: albums.map(album => ({
        id: album.id,
        title: album.title,
        cover_image: album.cover_image,
        songs_count: album.songs?.[0]?.count || 0
      }))
    }

    return (
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 space-y-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            {artistWithAlbums.image_url && (
              <Image
                src={artistWithAlbums.image_url}
                alt={artistWithAlbums.name}
                width={100}
                height={100}
                className="rounded-full"
              />
            )}
            <h1 className="text-3xl font-bold">{artistWithAlbums.name}</h1>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {artistWithAlbums.albums.map((album) => (
              <Link 
                key={album.id}
                href={`/albums/${album.id}`}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <figure className="relative aspect-square">
                  {album.cover_image ? (
                    <Image
                      src={album.cover_image}
                      alt={album.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-base-200">
                      <Music className="w-12 h-12" />
                    </div>
                  )}
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title hover:text-primary hover:underline">
                    {album.title}
                  </h2>
                  <p className="text-sm opacity-70">
                    {album.songs_count} songs
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return notFound()
  }
} 