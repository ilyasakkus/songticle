import { Suspense } from 'react'
import AlbumClient from './components/AlbumClient'

type Props = {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function AlbumPage({ params }: Props) {
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