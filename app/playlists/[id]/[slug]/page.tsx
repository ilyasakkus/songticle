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

interface PageProps {
  params: Promise<{ 
    id: string
    slug: string 
  }>
}

export default async function PlaylistPage({ params }: PageProps) {
  const { id, slug } = await params
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

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
          songs (
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
    const songs = playlist.playlist_songs
      .sort((a, b) => (a.position || 0) - (b.position || 0))
      .map(ps => ({
        ...ps.songs,
        artists: ps.songs.artists
      }))

    // Şarkı kartı HTML'ini oluştur
    const songCardHtml = (song: any, index: number) => `
      <div class="flex items-center gap-4 bg-base-100 p-4 rounded-lg mb-4">
        <span class="w-8 text-center text-gray-500">${index + 1}</span>
        <div class="w-16 h-16 shrink-0">
          ${song.cover_image 
            ? `<img src="${song.cover_image}" alt="${song.title}" class="w-full h-full object-cover rounded" />`
            : `<div class="w-full h-full flex items-center justify-center bg-base-200 rounded">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18V5l12-2v13" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="6" cy="18" r="3"/>
                  <circle cx="21" cy="16" r="3"/>
                </svg>
              </div>`
          }
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold truncate">
            <a href="/songs/${song.id}/${slugify(song.title)}" class="hover:text-primary">${song.title}</a>
          </h3>
          <p class="text-sm text-base-content/70 truncate">
            <a href="/artist/${song.artists.id}" class="hover:text-primary">${song.artists.name}</a>
          </p>
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
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 space-y-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{playlist.title}</h1>
            {playlist.description && (
              <p className="text-base-content/70 text-lg leading-relaxed">{playlist.description}</p>
            )}
            {playlist.content && (
              <div 
                className="mt-8 prose prose-lg max-w-none text-justify"
                dangerouslySetInnerHTML={{ 
                  __html: content
                }}
              />
            )}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    return notFound()
  }
} 