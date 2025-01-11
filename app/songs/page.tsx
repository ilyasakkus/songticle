'use client'

import { Suspense } from 'react'
import { SongList } from '@/app/components/SongList'
import { SearchInput } from '@/app/components/SearchInput'
import { useState } from 'react'
import { useDebounce } from '@/app/hooks/useDebounce'

export default function SongsPage() {
  const [songSearchTerm, setSongSearchTerm] = useState('')
  const [albumSearchTerm, setAlbumSearchTerm] = useState('')
  const [artistSearchTerm, setArtistSearchTerm] = useState('')

  const debouncedSongSearch = useDebounce(songSearchTerm, 300)
  const debouncedAlbumSearch = useDebounce(albumSearchTerm, 300)
  const debouncedArtistSearch = useDebounce(artistSearchTerm, 300)

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 space-y-6">
      {/* Search Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
        <SearchInput 
          placeholder="Search songs..." 
          value={songSearchTerm}
          onChange={(e) => setSongSearchTerm(e.target.value)}
          className="w-full"
        />
        <SearchInput 
          placeholder="Search by album..." 
          value={albumSearchTerm}
          onChange={(e) => setAlbumSearchTerm(e.target.value)}
          className="w-full"
        />
        <SearchInput 
          placeholder="Search by artist..." 
          value={artistSearchTerm}
          onChange={(e) => setArtistSearchTerm(e.target.value)}
          className="w-full lg:col-span-1"
        />
      </div>

      {/* Songs Grid */}
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-[200px]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      }>
        <SongList 
          songSearch={debouncedSongSearch}
          albumSearch={debouncedAlbumSearch}
          artistSearch={debouncedArtistSearch}
        />
      </Suspense>
    </div>
  )
} 