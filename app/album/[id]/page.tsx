import { Suspense } from 'react'
import AlbumClient from './components/AlbumClient'

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
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