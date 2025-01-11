import { Suspense } from 'react'
import AlbumsList from './AlbumsList'

export default function AlbumsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold">Albums</h1>
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-[200px]">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        }>
          <AlbumsList />
        </Suspense>
      </div>
    </div>
  )
} 