'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Music } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Story {
  id: number
  content: string
  created_at: string
  user_id: string
  author_name: string
  songs: {
    id: number
    title: string
    cover_image: string
    preview_url: string | null
    artists: {
      id: number
      name: string
    }
  } | null
}

interface StoryPageProps {
  params: {
    id: string
  }
}

export default function StoryPage({ params }: StoryPageProps) {
  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchStory() {
      try {
        const { data: storyData, error: storyError } = await supabase
          .from('stories')
          .select(`
            *,
            songs (
              id,
              title,
              cover_image,
              preview_url,
              artists (
                id,
                name
              )
            )
          `)
          .eq('id', params.id)
          .single()

        if (storyError) throw new Error('Story not found')

        setStory(storyData)
      } catch (err) {
        console.error('Error fetching story:', err)
        setError('Failed to load story')
      } finally {
        setLoading(false)
      }
    }

    fetchStory()
  }, [params.id, supabase])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error || !story) {
    return notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0">
          {story.songs?.cover_image ? (
            <Image
              src={story.songs.cover_image}
              alt={story.songs.title}
              width={256}
              height={256}
              className="w-full aspect-square object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full aspect-square flex items-center justify-center bg-base-200 rounded-lg">
              <Music className="w-12 h-12" />
            </div>
          )}
        </div>
        
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{story.songs?.title}</h1>
          <div className="space-y-2">
            <p className="text-lg">
              Artist: <a href={`/artist/${story.songs?.artists?.id}`} className="link link-primary">{story.songs?.artists?.name}</a>
            </p>
          </div>
          
          <div className="prose max-w-none">
            <p>{story.content}</p>
          </div>
          
          <div className="text-sm opacity-70">
            Posted by {story.author_name} on {new Date(story.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
} 