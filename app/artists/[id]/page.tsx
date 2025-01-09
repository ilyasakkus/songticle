import { ArtistClient } from './ArtistClient'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

interface Props {
  params: {
    id: string
  }
}

export default async function ArtistPage({ params }: Props) {
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
    return <div>Artist not found</div>
  }

  return <ArtistClient artist={artist} />
} 