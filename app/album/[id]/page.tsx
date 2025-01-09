import { Metadata } from 'next'
import AlbumContent from './AlbumContent'

interface Props {
  params: { id: string }
  searchParams: Record<string, string | string[] | undefined>
}

export default function AlbumPage({ params }: Props) {
  return <AlbumContent id={params.id} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Album - ${params.id}`,
  }
} 