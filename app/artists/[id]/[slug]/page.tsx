import { ArtistClient } from '../ArtistClient'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { slugify } from '../../../lib/utils'
import { Metadata } from 'next'

interface Props {
  params: {
    id: string
    slug: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

type PropsMetadata = {
  params: {
    id: string
    slug: string
  }
}

export async function generateMetadata(props: PropsMetadata): Promise<Metadata> {
  const supabase = createServerComponentClient({ cookies })

  // Fetch artist data
  const { data: artist } = await supabase
    .from('artists')
    .select(`
      name,
      bio,
      albums (
        count
      ),
      songs (
        count
      )
    `)
    .eq('id', props.params.id)
    .single()

  if (!artist) {
    return {
      title: 'Artist Not Found',
      description: 'The requested artist could not be found.'
    }
  }

  const songCount = artist.songs?.length || 0
  const albumCount = artist.albums?.length || 0

  return {
    title: `${artist.name} | Artist Profile and Songs`,
    description: `Explore ${artist.name}'s music collection on Songticle. Browse through ${songCount} songs and ${albumCount} albums, read stories from fans, and share your own musical experiences.`,
    openGraph: {
      title: `${artist.name} | Artist Profile`,
      description: `Discover ${artist.name}'s music and fan stories on Songticle.`,
     
    },
    twitter: {
      card: 'summary_large_image',
      title: `${artist.name} | Artist Profile`,
      description: `Discover ${artist.name}'s music and fan stories on Songticle.`,
    }
  }
}

export default async function ArtistPage(props: Props) {
  const { id, slug } = props.params;
  const supabase = createServerComponentClient({ cookies })

  // Fetch artist data
  const { data: artist, error: artistError } = await supabase
    .from('artists')
    .select('*')
    .eq('id', id)
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
  if (slug !== expectedSlug) {
    return notFound()
  }

  return <ArtistClient artist={artist} />
} 