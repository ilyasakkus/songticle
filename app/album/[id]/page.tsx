import AlbumContent from './AlbumContent'

export default function AlbumPage({
  params,
}: {
  params: { id: string }
}) {
  return <AlbumContent id={params.id} />
} 