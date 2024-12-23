import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { searchDeezer } from '../lib/deezer'
import { Artist, Album, Song } from '../types/database.types'

export function useArtistSearch(query: string) {
  const [artists, setArtists] = useState<Artist[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function searchArtist() {
      if (!query) {
        setArtists([])
        setAlbums([])
        setSongs([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        const { artists, albums, songs } = await searchDeezer(query)
        
        // Store the data in Supabase
        if (artists.length > 0) {
          const { error: artistError } = await supabase
            .from('artists')
            .upsert(artists, { onConflict: 'id' })
          if (artistError) throw artistError
        }

        if (albums.length > 0) {
          const { error: albumError } = await supabase
            .from('albums')
            .upsert(albums, { onConflict: 'id' })
          if (albumError) throw albumError
        }

        if (songs.length > 0) {
          const { error: songError } = await supabase
            .from('songs')
            .upsert(songs, { onConflict: 'id' })
          if (songError) throw songError
        }

        setArtists(artists)
        setAlbums(albums)
        setSongs(songs)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    searchArtist()
  }, [query])

  return { artists, albums, songs, loading, error }
}

export function useArtistData(artistId: number) {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArtistData() {
      try {
        const { data: albumsData, error: albumsError } = await supabase
          .from('albums')
          .select(`
            *,
            songs (*)
          `)
          .eq('artist_id', artistId)
          .order('title')

        if (albumsError) throw albumsError

        setAlbums(albumsData || [])
        setLoading(false)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred')
        setLoading(false)
      }
    }

    fetchArtistData()
  }, [artistId])

  return { albums, loading, error }
}

export function useStories() {
  const [stories, setStories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStories() {
      try {
        const { data, error: storiesError } = await supabase
          .from('stories')
          .select(`
            *,
            profiles (username, avatar_url),
            songs (
              title,
              artists (name),
              albums (title)
            ),
            story_likes (count),
            story_comments (count)
          `)
          .order('created_at', { ascending: false })

        if (storiesError) throw storiesError

        setStories(data || [])
        setLoading(false)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred')
        setLoading(false)
      }
    }

    fetchStories()
  }, [])

  return { stories, loading, error }
}
