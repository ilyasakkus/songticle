import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Music } from 'lucide-react'

function slugify(text: string): string {
  if (!text) return 'null'

  // Türkçe karakterleri dönüştür
  const replacements = {
    'ş': 's', 'Ş': 's',
    'ı': 'i', 'İ': 'i', 'ı': 'i',
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ü': 'u', 'Ü': 'u',
    'ö': 'o', 'Ö': 'o'
  }

  // Metni dönüştür
  let cleanText = text.toLowerCase()

  // Her bir Türkçe karakteri değiştir
  for (let [key, value] of Object.entries(replacements)) {
    cleanText = cleanText.replace(new RegExp(key, 'g'), value)
  }

  // Metni temizle
  cleanText = cleanText
    .trim()
    // Virgülleri ve noktalı virgülleri boşluğa çevir
    .replace(/[,;]/g, ' ')
    // Sayıları koru ama aralarına tire ekle
    .replace(/(\d)[,.](\d)/g, '$1-$2') // 1.2 -> 1-2
    .replace(/(\d)\s+(\d)/g, '$1-$2')   // 1 2 -> 1-2
    // Diğer özel karakterleri temizle
    .replace(/[^a-z0-9\s-]/g, '') // Sadece harfler, rakamlar, boşluklar ve tire kalır
    .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
    .replace(/-+/g, '-') // Birden fazla tireyi tek tireye indir
    .replace(/^-+|-+$/g, '') // Baştaki ve sondaki tireleri kaldır

  // Eğer metin boşsa 'null' dön
  if (cleanText.length === 0) return 'null'

  // İlk karakter harf veya rakam değilse 'x' ekle
  const firstChar = cleanText.charAt(0)
  if (!firstChar.match(/[a-z0-9]/)) {
    cleanText = 'x' + cleanText
  }

  return cleanText
}

function compareSlug(slug1: string, slug2: string): boolean {
  if (!slug1 || !slug2) return false
  
  // URL decode yap ve karşılaştır
  try {
    const decodedSlug1 = decodeURIComponent(slug1).toLowerCase()
    const decodedSlug2 = decodeURIComponent(slug2).toLowerCase()
    return decodedSlug1 === decodedSlug2
  } catch {
    // Decode hatası olursa normal karşılaştır
    return slug1.toLowerCase() === slug2.toLowerCase()
  }
}

interface Props {
  params: Promise<{
    id: string
    slug: string
  }>
}

export default async function AlbumPage(props: Props) {
  // Await params
  const { id, slug } = await props.params
  
  // Validate id parameter
  if (!id || typeof id !== 'string') {
    return notFound()
  }
  
  // Await cookies
  const cookieStore = await cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  try {
    const { data: album, error: albumError } = await supabase
      .from('albums')
      .select(`
        *,
        artists!albums_artist_id_fkey (
          id,
          name,
          picture_medium
        ),
        songs!songs_album_id_fkey (
          id,
          title,
          preview_url,
          cover_image
        )
      `)
      .eq('id', id)
      .single()

    if (albumError) {
      console.error('Error fetching album:', albumError)
      return notFound()
    }

    if (!album) {
      return notFound()
    }

    // Slug kontrolü
    const correctSlug = slugify(album.title)
    
    // Eğer slug 'null' ise veya doğru slug ile eşleşiyorsa devam et
    if (slug === 'null' || compareSlug(slug, correctSlug)) {
      // Devam et, redirect yapma
    } else {
      // Slug yanlışsa redirect yap
      return redirect(`/albums/${id}/${correctSlug}`)
    }

    return (
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6">
        {/* Album Header */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
          <div className="shrink-0">
            {album.cover_medium ? (
              <Image
                src={album.cover_medium}
                alt={album.title}
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
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{album.title}</h1>
            {album.artists && (
              <Link 
                href={`/artists/${album.artists.id}`}
                className="text-xl text-base-content/70 hover:text-primary"
              >
                {album.artists.name}
              </Link>
            )}
            {album.release_date && (
              <p className="mt-2 text-base-content/60">
                Released {new Date(album.release_date).getFullYear()}
              </p>
            )}
          </div>
        </div>

        {/* Songs List */}
        <div className="space-y-2">
          {album.songs && album.songs.length > 0 ? (
            album.songs.map((song, index) => (
              <div 
                key={song.id}
                className="flex items-center gap-4 p-4 bg-base-100 rounded-lg hover:bg-base-200 transition-colors"
              >
                <span className="w-8 text-center text-base-content/50">{index + 1}</span>
                <div className="flex-1 min-w-0">
                  <Link 
                    href={`/songs/${song.id}/${slugify(song.title)}`}
                    className="font-medium hover:text-primary block truncate"
                  >
                    {song.title}
                  </Link>
                </div>
                {song.preview_url && (
                  <button
                    className="btn btn-ghost btn-circle btn-sm"
                    title="Preview unavailable"
                    disabled
                  >
                    <Music className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-base-content/60">
              No songs available in this album
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    return notFound()
  }
} 