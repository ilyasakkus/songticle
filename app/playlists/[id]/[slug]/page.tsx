import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Music } from 'lucide-react'

interface Song {
  id: number
  title: string
  cover_image: string
  artist_name: string
  artist_id: number
  album_id: number
  album_title: string
}

interface PlaylistSong {
  songs: {
    id: number
    title: string
    cover_image: string
    artists: {
      id: number
      name: string
    } | null
    albums: {
      id: number
      title: string
    } | null
  } | null
}

interface Playlist {
  id: number
  title: string
  user_id: string
  created_at: string
  songs: Song[]
}

interface PlaylistPageProps {
  params: Promise<{
    id: string
    slug: string
  }>
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
  const cookieStore = cookies()
  const { id } = await params
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  try {
    const { data: playlistData, error: playlistError } = await supabase
      .from('playlists')
      .select('*')
      .eq('id', id)
      .single()

    if (playlistError) throw new Error('Playlist not found')

    const { data: songsData, error: songsError } = await supabase
      .from('playlist_songs')
      .select(`
        songs (
          id,
          title,
          cover_image,
          artists (
            id,
            name
          ),
          albums (
            id,
            title
          )
        )
      `)
      .eq('playlist_id', id)
      .order('created_at', { ascending: false })

    if (songsError) throw new Error('Songs not found')

    const transformedSongs = songsData.map(item => ({
      id: item.songs?.id || 0,
      title: item.songs?.title || 'Unknown Title',
      cover_image: item.songs?.cover_image || '',
      artist_name: item.songs?.artists?.name || 'Unknown Artist',
      artist_id: item.songs?.artists?.id || 0,
      album_id: item.songs?.albums?.id || 0,
      album_title: item.songs?.albums?.title || 'Unknown Album'
    }))

    const playlist: Playlist = {
      ...playlistData,
      songs: transformedSongs
    }

    return (
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 space-y-6">
   
        
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">{playlist.title}</h1>
          </div>
          
          <div className="grid gap-4">
            {playlist.songs.map((song) => (
              <div key={song.id} className="card card-side bg-base-100 shadow-xl">
                <figure className="w-24 h-24 relative">
                  {song.cover_image ? (
                    <Image
                      src={song.cover_image}
                      alt={song.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-base-200">
                      <Music className="w-8 h-8" />
                    </div>
                  )}
                </figure>
                <div className="card-body py-4">
                  <h2 className="card-title">
                    <Link 
                      href={`/songs/${song.id}`}
                      className="hover:text-primary hover:underline"
                    >
                      {song.title}
                    </Link>
                  </h2>
                  <div className="flex gap-2 text-sm">
                    <Link 
                      href={`/artist/${song.artist_id}`}
                      className="hover:text-primary hover:underline"
                    >
                      {song.artist_name}
                    </Link>
                    {song.album_title && (
                      <>
                        <span>•</span>
                        <Link 
                          href={`/albums/${song.album_id}`}
                          className="hover:text-primary hover:underline"
                        >
                          {song.album_title}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return notFound()
  }
} 