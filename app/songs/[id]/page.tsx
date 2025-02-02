import { SongClient } from './SongClient'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Image } from '@/app/components/ui/image'
import Link from 'next/link'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function SongPage(props: Props) {
  const params = await props.params;
  const supabase = createServerComponentClient({ cookies })

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
    .eq('id', params.id)
    .single()

  if (songError || !song) {
    console.error('Error fetching song:', songError)
    return notFound()
  }

  return (
    <div className="space-y-6">
      
      {/* Song Header */}
      <SongClient song={song} />
    </div>
  )
} 