import { Suspense } from 'react'
import StoryClient from '../StoryClient'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ 
    id: string
    slug: string 
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug } = await params
  const supabase = createServerComponentClient({ cookies })

  // Fetch story data with song and author info
  const { data: story, error: storyError } = await supabase
    .from('stories')
    .select(`
      content,
      created_at,
      songs!stories_song_id_fkey (
        title,
        cover_image,
        artists!songs_artist_id_fkey (
          name
        )
      ),
      profiles!stories_user_id_fkey (
        full_name
      )
    `)
    .eq('id', id)
    .single()

  if (!story) {
    return {
      title: 'Story Not Found',
      description: 'The requested story could not be found.'
    }
  }

  // Truncate content for meta description
  const truncatedContent = story.content.length > 150 
    ? story.content.substring(0, 150) + '...' 
    : story.content

  const authorName = story.profiles?.[0]?.full_name || 'Someone'
  const songTitle = story.songs?.[0]?.title || ''
  const artistName = story.songs?.[0]?.artists?.[0]?.name || 'Unknown Artist'
  const songCover = story.songs?.[0]?.cover_image || null

  const title = songTitle 
    ? `${authorName}'s story about ${songTitle} by ${artistName} - Songticle`
    : `${authorName}'s story - Songticle`

  const description = songTitle
    ? `Read ${authorName}'s story about ${songTitle} by ${artistName}: "${truncatedContent}"`
    : `Read ${authorName}'s story: "${truncatedContent}"`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://songticle.com/story/${id}/${slug}`,
      images: songCover ? [
        {
          url: songCover,
          width: 500,
          height: 500,
          alt: `${songTitle} album cover`
        }
      ] : [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Story on Songticle'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: songCover ? [songCover] : ['/og-image.jpg']
    }
  }
}

export default async function StoryPage(props: Props) {
  const params = await props.params;
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }>
      <StoryClient storyId={params.id} />
    </Suspense>
  )
} 