import { SongClient } from '../SongClient'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

// Slugify fonksiyonu
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

interface Props {
  params: Promise<{
    id: string
    slug: string
  }>
}

export default async function SongPage(props: Props) {
  const { id, slug } = await props.params
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

    if (songError || !song) {
      console.error('Error fetching song:', songError)
      return notFound()
    }

    // Slug kontrolü
    const correctSlug = slugify(song.title)
    if (slug !== correctSlug) {
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