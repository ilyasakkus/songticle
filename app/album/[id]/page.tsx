import { Suspense } from 'react'
import AlbumClient from '../../albums/AlbumClient'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

const AlbumPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  const supabase = createServerComponentClient({ cookies })

  const { data: album, error } = await supabase
    .from('albums')
    .select(`
      *,
      artists (*)
    `)
    .eq('id', id)
    .single()

  if (error || !album) {
    console.error('Error fetching album:', error)
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

export default AlbumPage 