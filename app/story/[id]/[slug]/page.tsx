import { Suspense } from 'react'
import StoryClient from '../StoryClient'

export default function StoryPage({ params }: { params: { id: string, slug: string } }) {
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