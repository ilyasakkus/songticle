'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Star, Clock, Music, ChevronDown, ChevronRight } from 'lucide-react'
import { Sidebar } from './Sidebar'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../providers/AuthProvider'
import { usePathname } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { slugify } from '../lib/utils'
import type { Artist, Album, Song } from '@/app/types/database.types'

interface PopularArtist {
  id: number
  name: string
  picture_medium: string
}

interface PopularAlbum {
  id: number
  title: string
  cover_medium: string
  artist_name: string
}

interface PopularSong {
  id: number
  title: string
  preview_url: string
  artist_name: string
}

const navItems = [
  { href: '/', label: 'Home', icon: Menu },
  { href: '/artists', label: 'Artists', icon: Music },
  { href: '/albums', label: 'Albums', icon: Music },
  { href: '/songs', label: 'Songs', icon: Music },
  { href: '/playlists', label: 'Playlists', icon: Music }
]

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, setShowSignIn } = useAuth()
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState({
    artists: false,
    albums: false,
    songs: false
  })
  const [popularArtists, setPopularArtists] = useState<PopularArtist[]>([])
  const [recentAlbums, setRecentAlbums] = useState<PopularAlbum[]>([])
  const [popularSongs, setPopularSongs] = useState<PopularSong[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if (typeof window !== 'undefined') {
      document.body.style.overflow = !isOpen ? 'hidden' : 'auto'
    }
  }

  const toggleSection = async (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))

    // Fetch data when section is expanded
    if (!expandedSections[section]) {
      try {
        setLoading(true)
        if (section === 'artists') {
          const { data } = await supabase
            .from('artists')
            .select('*')
            .order('id', { ascending: false })
            .limit(5)
          setPopularArtists(data || [])
        } else if (section === 'albums') {
          const { data } = await supabase
            .from('albums')
            .select('*')
            .order('id', { ascending: false })
            .limit(5)
          setRecentAlbums(data || [])
        } else if (section === 'songs') {
          const { data } = await supabase
            .from('songs')
            .select('*')
            .order('id', { ascending: false })
            .limit(5)
          setPopularSongs(data || [])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="lg:hidden">
      <button
        onClick={toggleMenu}
        className="btn btn-ghost btn-circle"
        aria-label="Menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={toggleMenu}
          />

          <div className="absolute inset-y-0 left-0 w-80 bg-base-200 shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-base-300">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={toggleMenu}
                className="btn btn-ghost btn-circle"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="p-4 border-b border-base-300">
              {navItems.map(({ href, label }) => {
                const isActive = pathname === href
                return (
                  <Link 
                    key={href}
                    href={href} 
                    className={`
                      flex items-center gap-2 px-4 py-3 transition-colors rounded-lg
                      hover:bg-base-300
                      ${isActive ? 'bg-base-300 text-primary' : ''}
                    `}
                    onClick={toggleMenu}
                  >
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                )
              })}
              {user && (
                <>
                  <Link 
                    href="/profile" 
                    className="flex items-center gap-2 px-4 py-3 transition-colors rounded-lg hover:bg-base-300"
                    onClick={toggleMenu}
                  >
                    <span className="text-sm font-medium">Profile</span>
                  </Link>
                  <Link 
                    href="/add" 
                    className="flex items-center gap-2 px-4 py-3 transition-colors rounded-lg hover:bg-base-300 text-primary"
                    onClick={toggleMenu}
                  >
                    <span className="text-sm font-medium">Add Song Story</span>
                  </Link>
                </>
              )}
              {!user && (
                <button 
                  onClick={() => {
                    setShowSignIn(true)
                    toggleMenu()
                  }}
                  className="w-full btn btn-primary mt-2"
                >
                  Sign In
                </button>
              )}
            </nav>

            {/* Popular Artists Section */}
            <div className="p-4 border-b border-base-300">
              <button 
                onClick={() => toggleSection('artists')}
                className="flex items-center justify-between w-full mb-2 text-sm font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Popular Artists</span>
                </div>
                {expandedSections.artists ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {expandedSections.artists && (
                <div className="space-y-2">
                  {loading ? (
                    <div className="flex justify-center p-4">
                      <span className="loading loading-spinner loading-sm"></span>
                    </div>
                  ) : (
                    popularArtists.map((artist: any) => (
                      <Link
                        key={artist.id}
                        href={`/artists/${artist.id}/${slugify(artist.name)}`}
                        className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-lg transition-colors"
                        onClick={toggleMenu}
                      >
                        {artist.picture_medium ? (
                          <Image
                            src={artist.picture_medium}
                            alt={artist.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center">
                            <Music className="h-4 w-4 opacity-50" />
                          </div>
                        )}
                        <span className="text-sm truncate">{artist.name}</span>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Random Albums Section */}
            <div className="p-4 border-b border-base-300">
              <button 
                onClick={() => toggleSection('albums')}
                className="flex items-center justify-between w-full mb-2 text-sm font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Random Albums</span>
                </div>
                {expandedSections.albums ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {expandedSections.albums && (
                <div className="space-y-2">
                  {loading ? (
                    <div className="flex justify-center p-4">
                      <span className="loading loading-spinner loading-sm"></span>
                    </div>
                  ) : (
                    recentAlbums.map((album: any) => (
                      <Link
                        key={album.id}
                        href={`/albums/${album.id}`}
                        className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-lg transition-colors"
                        onClick={toggleMenu}
                      >
                        {album.cover_medium ? (
                          <Image
                            src={album.cover_medium}
                            alt={album.title}
                            width={32}
                            height={32}
                            className="rounded"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded bg-base-300 flex items-center justify-center">
                            <Music className="h-4 w-4 opacity-50" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="text-sm truncate">{album.title}</div>
                          <div className="text-xs text-gray-500 truncate">{album.artist_name}</div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Popular Songs Section */}
            <div className="p-4">
              <button 
                onClick={() => toggleSection('songs')}
                className="flex items-center justify-between w-full mb-2 text-sm font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  <span>Popular Songs</span>
                </div>
                {expandedSections.songs ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {expandedSections.songs && (
                <div className="space-y-2">
                  {loading ? (
                    <div className="flex justify-center p-4">
                      <span className="loading loading-spinner loading-sm"></span>
                    </div>
                  ) : (
                    popularSongs.map((song: any) => (
                      <Link
                        key={song.id}
                        href={`/songs/${song.id}`}
                        className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-lg transition-colors"
                        onClick={toggleMenu}
                      >
                        {song.cover_image ? (
                          <Image
                            src={song.cover_image}
                            alt={song.title}
                            width={32}
                            height={32}
                            className="rounded"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded bg-base-300 flex items-center justify-center">
                            <Music className="h-4 w-4 opacity-50" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="text-sm truncate">{song.title}</div>
                          <div className="text-xs text-gray-500 truncate">{song.artist_name}</div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 