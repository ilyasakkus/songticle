import { SongClient } from '../SongClient'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

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

function compareSlug(slug1: string, slug2: string): boolean {
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