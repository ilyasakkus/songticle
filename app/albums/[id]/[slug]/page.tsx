import { AlbumClient } from '../AlbumClient'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { slugify } from '../../../lib/utils'

interface Props {
  params: {
    id: string
    slug: string
  }
}

export default async function AlbumPage({ params }: Props) {
  const supabase = createServerComponentClient({ cookies })

  // Fetch album data with artist info
  const { data: album, error: albumError } = await supabase
    .from('albums')
    .select(`
      *,
      artists!albums_artist_id_fkey (
        id,
        name,
        picture_medium
      )
    `)
    .eq('id', params.id)
    .single()

  if (albumError) {
    console.error('Error fetching album:', albumError)
    return <div>Error loading album</div>
  }

  if (!album) {
    return notFound()
  }

  // Verify slug matches album title
  const expectedSlug = slugify(album.title)
  if (params.slug !== expectedSlug) {
    return notFound()
  }

  return <AlbumClient album={album} />
} 