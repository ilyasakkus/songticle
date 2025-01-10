import { Suspense } from 'react'
import AlbumClient from './components/AlbumClient'

type Props = {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AlbumPage({ params }: Props) {
  const resolvedParams = await params
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }>
      <AlbumClient albumId={resolvedParams.id} />
    </Suspense>
  )
} 