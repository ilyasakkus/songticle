import { Suspense } from 'react'
import { AlbumClient } from './AlbumClient'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

const AlbumsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
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
    .eq('id', id)
    .single()

  if (albumError || !album) {
    console.error('Error fetching album:', albumError)
    return notFound()
  }

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }>
      <AlbumClient album={album} />
    </Suspense>
  )
}

export default AlbumsPage 