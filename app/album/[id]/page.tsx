import { Suspense } from 'react'
import AlbumClient from '../../albums/AlbumClient'

const AlbumPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }>
      <AlbumClient albumId={id} />
    </Suspense>
  )
}

export default AlbumPage 