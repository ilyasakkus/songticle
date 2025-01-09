import AlbumContent from './AlbumContent'

export default async function AlbumPage({ params }: { params: { id: string } }) {
  return <AlbumContent id={params.id} />
} 