import { Suspense, use } from 'react'
import AlbumClient from './components/AlbumClient'

export default function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
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