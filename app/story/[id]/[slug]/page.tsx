import { Suspense } from 'react'
import StoryClient from '../StoryClient'
import { Metadata } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

interface Props {
  params: Promise<{
    id: string
    slug: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const supabase = createServerComponentClient({ cookies })

  // Fetch story data
  const { data: story } = await supabase
    .from('stories')
    .select(`
      title,
      content,
      profiles (
        full_name
      ),
      songs (
        title,
        artists (
          name
        )
      )
    `)
    .eq('id', params.id)
    .single()

  if (!story) {
    return {
      title: 'Story Not Found',
      description: 'The requested story could not be found.'
    }
  }

  const artistName = story.songs?.[0]?.artists?.[0]?.name || 'Unknown Artist'
  const songTitle = story.songs?.[0]?.title || 'Unknown Song'
  const full_name = story.profiles?.[0]?.full_name || 'Anonymous'

  // Get first paragraph of content for description
  const description = story.content
    ?.split('\n')
    .find((line: string) => line.trim() && !line.startsWith('#')) || ''

  return {
    title: `${story.title} - A Story about ${songTitle} by ${artistName}`,
    description: description.slice(0, 160) + '...',
    openGraph: {
      title: `${story.title} - A Story about ${songTitle} by ${artistName}`,
      description: description.slice(0, 160) + '...',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${story.title} - A Story about ${songTitle}`,
      description: description.slice(0, 160) + '...',
    }
  }
}

export default async function StoryPage(props: Props) {
  const params = await props.params;
  const { id, slug } = params;
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }>
      <StoryClient storyId={id} />
    </Suspense>
  )
} 