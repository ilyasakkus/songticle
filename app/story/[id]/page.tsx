import { Suspense } from 'react'
import StoryClient from './StoryClient'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/app/components/Breadcrumb'

export default async function StoryPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })

  // Fetch story data with song info
  const { data: story, error: storyError } = await supabase
    .from('stories')
    .select(`
      *,
      songs (
        id,
        title
      )
    `)
    .eq('id', params.id)
    .single()

  if (storyError || !story) {
    console.error('Error fetching story:', storyError)
    return notFound()
  }

  return (
    <div className="space-y-6">
      <Breadcrumb 
        items={[
          { label: 'Stories', href: '/stories' },
          { label: story.songs?.title || 'Story' }
        ]} 
      />
      
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-[200px]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      }>
        <StoryClient storyId={params.id} />
      </Suspense>
    </div>
  )
} 