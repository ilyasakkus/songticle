import PlaylistDetail from './PlaylistDetail'

interface PlaylistPageProps {
  params: Promise<{
    id: string[]
  }>
}

export default async function PlaylistPage(props: PlaylistPageProps) {
  const params = await props.params;
  // Extract the numeric ID from the URL parameter
  const numericId = params.id[0]
  return <PlaylistDetail id={numericId} />
} 