import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import Image from 'next/image'
import { Music } from 'lucide-react'

// Slugify fonksiyonu
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function formatContent(content: string) {
  if (!content) return ''

  const lines = content.split('\n')
  let formattedContent = ''
  let currentParagraph = ''
  let songIndex = 0

  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine) {
      if (currentParagraph) {
        formattedContent += `<p class="mb-4 leading-relaxed text-gray-600">${currentParagraph}</p>`
        currentParagraph = ''
      }
      continue
    }

    // h2 ile başlayan satırları H3 olarak formatla ve altına şarkıyı ekle
    if (trimmedLine.toLowerCase().startsWith('h2')) {
      if (currentParagraph) {
        formattedContent += `<p class="mb-4 leading-relaxed text-gray-600">${currentParagraph}</p>`
        currentParagraph = ''
      }
      const headingText = trimmedLine.replace(/^h2\s*/i, '').trim()
      formattedContent += `<h3 class="text-xl font-semibold mt-6 mb-3">${headingText}</h3>`
      
      // Şarkı kartını ekle
      formattedContent += `<div class="song-card-placeholder" data-index="${songIndex}"></div>`
      songIndex++
    } else {
      // Normal paragraf
      if (currentParagraph) currentParagraph += ' '
      currentParagraph += trimmedLine
    }
  }

  // Son paragrafı ekle
  if (currentParagraph) {
    formattedContent += `<p class="mb-4 leading-relaxed text-gray-600">${currentParagraph}</p>`
  }

  return formattedContent
}

interface Artist {
  id: number
  name: string
}

interface Song {
  id: number
  title: string
  cover_image: string | null
  preview_url: string | null
  artists: Artist
}

interface PlaylistSong {
  position: number
  created_at: string
  song_id: number
  songs: Song
}

interface Playlist {
  id: number
  title: string
  description: string | null
  content: string | null
  user_id: string
  created_at: string
  playlist_songs: PlaylistSong[]
}

interface TransformedSong {
  id: number
  title: string
  cover_image: string | null
  preview_url: string | null
  artists: Artist
  position: number
  created_at: string
}

interface PageProps {
  params: Promise<{ 
    id: string
    slug: string 
  }>
}

interface PlaylistSongResponse {
  song_id: number
  songs: {
    title: string
    cover_image: string | null
    preview_url: string | null
    artists: Artist
  }
}

export default async function PlaylistPage({ params }: PageProps) {
  const { id, slug } = await params
  const supabase = createServerComponentClient({ 
    cookies
  })

  try {
    const { data: playlist, error } = await supabase
      .from('playlists')
      .select(`
        id,
        title,
        description,
        content,
        user_id,
        created_at,
        playlist_songs (
          position,
          created_at,
          song_id,
          songs!playlist_songs_song_id_fkey (
            id,
            title,
            cover_image,
            preview_url,
            artists:artists!songs_artist_id_fkey (
              id,
              name
            )
          )
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching playlist:', error)
      return notFound()
    }

    if (!playlist) {
      console.error('No playlist found')
      return notFound()
    }

    // Slug kontrolü
    const correctSlug = slugify(playlist.title)
    if (slug !== correctSlug) {
      return redirect(`/playlists/${id}/${correctSlug}`)
    }

    // Transform and sort songs
    const { data: playlistSongs, error: playlistError } = await supabase
      .from('playlist_songs')
      .select(`
        song_id,
        songs (
          title,
          cover_image,
          preview_url,
          artists:artists!songs_artist_id_fkey (
            id,
            name
          )
        )
      `)
      .eq('playlist_id', playlist.id)

    if (playlistError) {
      console.error('Error fetching playlist songs:', playlistError)
      return
    }

    const songs = (playlistSongs as any[]).map(ps => ({
      id: ps.song_id,
      title: ps.songs.title,
      cover_image: ps.songs.cover_image,
      preview_url: ps.songs.preview_url,
      artists: ps.songs.artists || { id: 'unknown', name: 'Unknown Artist' }
    }))

    // Şarkı kartı HTML'ini oluştur
    const songCardHtml = (song: any, index: number) => `
      <div class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div class="p-3">
          <div class="flex gap-3">
            <span class="w-6 text-center text-base-content/60 text-sm shrink-0">${index + 1}</span>
            <div class="w-14 h-14 shrink-0">
              ${song.cover_image 
                ? `<img src="${song.cover_image}" alt="${song.title}" class="w-full h-full object-cover rounded-lg" />`
                : `<div class="w-full h-full flex items-center justify-center bg-base-200 rounded-lg">
                    <svg class="w-6 h-6 text-base-content/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 18V5l12-2v13" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="6" cy="18" r="3"/>
                      <circle cx="21" cy="16" r="3"/>
                    </svg>
                  </div>`
              }
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold truncate text-base mb-1">
                <a href="/songs/${song.id}/${slugify(song.title)}" class="hover:text-primary transition-colors">${song.title}</a>
              </h3>
              <p class="text-sm text-base-content/70 truncate">
                <a href="/artists/${song.artists.id}/${slugify(song.artists.name)}" class="hover:text-primary transition-colors">${song.artists.name}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `

    // İçeriği oluştur ve şarkı kartlarını yerleştir
    let content = formatContent(playlist.content || '')
    songs.forEach((song, index) => {
      content = content.replace(
        `<div class="song-card-placeholder" data-index="${index}"></div>`,
        songCardHtml(song, index)
      )
    })

    return (
      <div className="w-full min-h-screen overflow-hidden">
        <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-xl sm:text-3xl font-bold mb-3">{playlist.title}</h1>
              {playlist.description && (
                <p className="text-base-content/70 text-base sm:text-xl leading-relaxed">{playlist.description}</p>
              )}
              {playlist.content && (
                <div 
                  className="mt-6 pb-2 prose prose-sm sm:prose-base max-w-none "
                  dangerouslySetInnerHTML={{ 
                    __html: content
                  }}
                  style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    width: '100%',
                    maxWidth: '100%'
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    return notFound()
  }
} 