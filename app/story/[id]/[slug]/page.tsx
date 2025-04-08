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

  const title = story.songs 
    ? `${story.profiles?.full_name || 'Someone'}'s story about ${story.songs.title} by ${story.songs.artists?.name || 'Unknown Artist'} - Songticle`
    : `${story.profiles?.full_name || 'Someone'}'s story - Songticle`

  const description = story.songs
    ? `Read ${story.profiles?.full_name || 'Someone'}'s story about ${story.songs.title} by ${story.songs.artists?.name || 'Unknown Artist'}: "${truncatedContent}"`
    : `Read ${story.profiles?.full_name || 'Someone'}'s story: "${truncatedContent}"`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://songticle.com/story/${id}/${slug}`,
      images: story.songs?.cover_image ? [
        {
          url: story.songs.cover_image,
          width: 500,
          height: 500,
          alt: `${story.songs.title} album cover`
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
      images: story.songs?.cover_image ? [story.songs.cover_image] : ['/og-image.jpg']
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