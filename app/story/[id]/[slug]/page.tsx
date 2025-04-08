import { Suspense } from 'react'
import StoryClient from '../StoryClient'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ 
    id: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  return {
    title: 'Songticle Story',
    description: 'Read stories about your favorite songs on Songticle',
    openGraph: {
      title: 'Songticle Story',
      description: 'Read stories about your favorite songs on Songticle',
      type: 'article',
      url: `https://songticle.com/story/${id}`,
      images: [
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
      title: 'Songticle Story',
      description: 'Read stories about your favorite songs on Songticle',
      images: ['/og-image.jpg']
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