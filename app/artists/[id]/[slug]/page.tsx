import { ArtistClient } from '../ArtistClient'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { slugify } from '../../../lib/utils'
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

  // Fetch artist data with albums count
  const { data: artist, error: artistError } = await supabase
    .from('artists')
    .select(`
      name,
      picture_medium,
      albums!albums_artist_id_fkey (
        id
      )
    `)
    .eq('id', id)
    .single()

  if (!artist) {
    return {
      title: 'Artist Not Found',
      description: 'The requested artist could not be found.'
    }
  }

  const albumCount = artist.albums?.length || 0
  const title = `${artist.name} - Artist Profile`
  const description = `Discover ${artist.name}'s music on Songticle. ${albumCount > 0 ? `Explore ${albumCount} albums` : 'No albums available yet'}. Listen to their songs, read stories, and share your favorite music.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `https://songticle.com/artists/${id}/${slug}`,
      images: artist.picture_medium ? [
        {
          url: artist.picture_medium,
          width: 500,
          height: 500,
          alt: `${artist.name} profile picture`
        }
      ] : [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: artist.name
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: artist.picture_medium ? [artist.picture_medium] : ['/og-image.jpg']
    }
  }
}

export default async function ArtistPage(props: Props) {
  const params = await props.params;
  const supabase = createServerComponentClient({ cookies })

  // Fetch artist data
  const { data: artist, error: artistError } = await supabase
    .from('artists')
    .select('*')
    .eq('id', params.id)
    .single()

  if (artistError) {
    console.error('Error fetching artist:', artistError)
    return <div>Error loading artist</div>
  }

  if (!artist) {
    return notFound()
  }

  // Verify slug matches artist name
  const expectedSlug = slugify(artist.name)
  if (params.slug !== expectedSlug) {
    return notFound()
  }

  return <ArtistClient artist={artist} />
} 