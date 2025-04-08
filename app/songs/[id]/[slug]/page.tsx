import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { Music } from 'lucide-react'
import React from 'react'
import { PreviewButton } from '@/app/components/PreviewButton'
import { LikeButton } from '@/app/components/LikeButton'
import { CommentSection } from '@/app/components/CommentSection'
import { Image } from '@/app/components/ui/image'
import { Metadata } from 'next'

function slugify(text: string): string {
  if (!text) return 'null'

  // Türkçe karakterleri dönüştür
  const turkishToEnglish: { [key: string]: string } = {
    'Ş': 'S', 'ş': 's',
    'Ğ': 'G', 'ğ': 'g',
    'Ü': 'U', 'ü': 'u',
    'Ö': 'O', 'ö': 'o',
    'Ç': 'C', 'ç': 'c',
    'İ': 'I', 'ı': 'i', 'I': 'i', 'i': 'i'
  }

  // Metni dönüştür
  let cleanText = text
    // Her karakteri kontrol et ve dönüştür
    .split('')
    .map(char => turkishToEnglish[char] || char)
    .join('')
    .toLowerCase()
    .trim()

  // Özel karakterleri ve boşlukları temizle
  cleanText = cleanText
    // Noktalama işaretlerini ve özel karakterleri boşluğa çevir (sayılar hariç)
    .replace(/[^\w\s0-9-]/g, ' ')
    // Birden fazla boşluğu tek boşluğa indir
    .replace(/\s+/g, ' ')
    .trim()
    // Boşlukları tire ile değiştir
    .replace(/\s/g, '-')
    // Birden fazla tireyi tek tireye indir
    .replace(/-+/g, '-')
    // Baştaki ve sondaki tireleri kaldır
    .replace(/^-+|-+$/g, '')

  // Eğer metin boşsa 'null' dön
  if (cleanText.length === 0) return 'null'

  // İlk karakter harf veya rakam değilse 'x' ekle
  const firstChar = cleanText.charAt(0)
  if (!firstChar.match(/[a-z0-9]/)) {
    cleanText = 'x' + cleanText
  }

  return cleanText
}

interface Props {
  params: Promise<{
    id: string
    slug: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const SongPage = async (props: Props) => {
  const params = await props.params
  const { id, slug } = params
  
  // Validate id parameter
  if (!id || typeof id !== 'string') {
    return notFound()
  }

  // Create Supabase client
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  try {
    // Fetch song data with album and artist info
    const { data: song, error: songError } = await supabase
      .from('songs')
      .select(`
        *,
        albums!songs_album_id_fkey (
          id,
          title,
          cover_medium
        ),
        artists!songs_artist_id_fkey (
          id,
          name
        )
      `)
      .eq('id', id)
      .single()

    if (songError) {
      console.error('Error fetching song:', songError)
      return notFound()
    }

    if (!song) {
      return notFound()
    }

    // Slug kontrolü
    const correctSlug = slugify(song.title)
    
    // Gelen slug'ı decode edelim
    let decodedSlug
    try {
      decodedSlug = decodeURIComponent(slug)
    } catch {
      decodedSlug = slug
    }

    // Eğer slug 'null' ise veya doğru slug ile eşleşmiyorsa redirect yapalım
    if (decodedSlug !== correctSlug && decodedSlug !== 'null') {
      const redirectUrl = `/songs/${id}/${encodeURIComponent(correctSlug)}`
      return redirect(redirectUrl)
    }

    // Fetch preview URL from Deezer API
    const searchQuery = encodeURIComponent(`${song.title} ${song.artists.name}`)
    const deezerResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/deezer?q=${searchQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    const deezerData = await deezerResponse.json()
    const previewUrl = deezerData.data?.[0]?.preview || null

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Song Cover */}
          <div className="shrink-0">
            {song.albums?.cover_medium ? (
              <Image
                src={song.albums.cover_medium}
                alt={song.title}
                width={240}
                height={240}
                className="rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-60 h-60 rounded-lg bg-base-300 flex items-center justify-center">
                <Music className="w-20 h-20 text-base-content opacity-20" />
              </div>
            )}
          </div>

          {/* Song Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{song.title}</h1>
            
            {/* Artist Link */}
            {song.artists && (
              <div className="mb-4">
                <Link 
                  href={`/artists/${song.artists.id}/${slugify(song.artists.name)}`}
                  className="text-xl text-base-content/70 hover:text-primary"
                >
                  {song.artists.name}
                </Link>
              </div>
            )}

            {/* Album Link */}
            {song.albums && (
              <div className="mb-4">
                <span className="text-base-content/60">From the album </span>
                <Link 
                  href={`/albums/${song.albums.id}/${slugify(song.albums.title)}`}
                  className="text-base-content/70 hover:text-primary"
                >
                  {song.albums.title}
                </Link>
              </div>
            )}

            {/* Preview Button */}
            <PreviewButton previewUrl={previewUrl} />

            {/* Like Button */}
            <div className="mt-4">
              <LikeButton songId={song.id} />
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <CommentSection songId={song.id} />
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    return notFound()
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug } = await params
  const supabase = createServerComponentClient({ cookies })

  const { data: song } = await supabase
    .from('songs')
    .select(`
      title,
      artists!songs_artist_id_fkey (
        name
      ),
      albums!songs_album_id_fkey (
        title
      )
    `)
    .eq('id', id)
    .single()

  if (!song) {
    return {
      title: 'Song Not Found',
      description: 'The requested song could not be found.'
    }
  }

  const title = `${song.title} by ${song.artists.name} `
  const description = `Listen to ${song.title} by ${song.artists.name}${song.albums ? ` from the album ${song.albums.title}` : ''}. Discover and share your favorite music on Songticle.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'music.song',
      url: `https://songticle.com/songs/${id}/${slug}`,
      images: song.albums?.cover_medium ? [
        {
          url: song.albums.cover_medium,
          width: 500,
          height: 500,
          alt: `${song.title} album cover`
        }
      ] : [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: song.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: song.albums?.cover_medium ? [song.albums.cover_medium] : ['/og-image.jpg']
    }
  }
}

export default SongPage 