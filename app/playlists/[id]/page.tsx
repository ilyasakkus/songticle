import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/app/components/Breadcrumb'

export default async function PlaylistPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })

  // Fetch playlist data
  const { data: playlist, error: playlistError } = await supabase
    .from('playlists')
    .select('*')
    .eq('id', params.id)
    .single()

  if (playlistError || !playlist) {
    console.error('Error fetching playlist:', playlistError)
    return notFound()
  }

  return (
    <div className="space-y-6">
      <Breadcrumb 
        items={[
          { label: 'Playlists', href: '/playlists' },
          { label: playlist.title }
        ]} 
      />
      
      {/* Playlist Content */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">{playlist.title}</h1>
        </div>
        
        {/* Playlist songs will be rendered here */}
      </div>
    </div>
  )
} 