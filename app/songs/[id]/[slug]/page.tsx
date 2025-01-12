import { SongClient } from '../SongClient'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

function slugify(text: string): string {
  if (!text) return 'null'

  // Türkçe karakterleri dönüştür
  const turkishToEnglish = {
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