import { Suspense } from 'react'
import AlbumClient from './AlbumClient.tsx'

interface PageProps {
  params: {
    id: string
  }
}

export default function AlbumPage({ params }: PageProps) {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }>
      <AlbumClient albumId={params.id} />
    </Suspense>
  )
} 