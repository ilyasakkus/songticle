import PlaylistDetail from './PlaylistDetail'

interface PlaylistPageProps {
  params: {
    id: string[]
  }
}

export default function PlaylistPage({ params }: PlaylistPageProps) {
  // Extract the numeric ID from the URL parameter
  const numericId = params.id[0]
  return <PlaylistDetail id={numericId} />
} 