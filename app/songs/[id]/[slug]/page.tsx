import { SongClient } from '../SongClient'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

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
  params: {
    id: string
    slug: string
  }
}

export default async function SongPage({ params }: Props) {
  // Await params
  const { id, slug } = await Promise.resolve(params)
  
  // Validate id parameter
  if (!id || typeof id !== 'string') {
    return notFound()
  }
  
  // Await cookies
  const cookieStore = await cookies()
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
    
    // Eğer slug 'null' ise veya doğru slug ile eşleşiyorsa devam et
    if (slug === 'null' || compareSlug(slug, correctSlug)) {
      // Devam et, redirect yapma
    } else {
      // Slug yanlışsa redirect yap
      return redirect(`/songs/${id}/${correctSlug}`)
    }

    return (
      <div className="space-y-6">
        <SongClient song={song} />
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    return notFound()
  }
} 