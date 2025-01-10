import { Suspense } from 'react'
import StoryClient from '../StoryClient'

export default async function StoryPage(props: { params: Promise<{ id: string, slug: string }> }) {
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