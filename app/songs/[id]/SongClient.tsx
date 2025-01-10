'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Music, Play, Pause, Heart, MessageCircle } from 'lucide-react'
import { slugify } from '../../lib/utils'
import { useAuth } from '../../providers/AuthProvider'

interface Album {
  id: number
  title: string
  cover_medium: string | null
}

interface Artist {
  id: number
  name: string
}

interface Song {
  id: number
  title: string
  preview_url: string | null
  albums: Album
  artists: Artist
}

interface Comment {
  id: number
  content: string
  created_at: string
  user_id: string
  profiles: {
    full_name: string
    avatar_url: string | null
  } | null
}

interface Props {
  song: Song
}

export function SongClient({ song }: Props) {
  const { user, setShowSignIn } = useAuth()
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [deezerPreview, setDeezerPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchDeezerPreview()
  }, [song.id])

  useEffect(() => {
    if (song.id) {
      fetchComments()
      fetchLikes()
    }
  }, [song.id, user?.id])

  useEffect(() => {
    if (deezerPreview) {
      const audioElement = new Audio(deezerPreview)
      setAudio(audioElement)

      audioElement.addEventListener('ended', () => {
        setIsPlaying(false)
      })

      return () => {
        audioElement.pause()
        audioElement.remove()
      }
    }
  }, [deezerPreview])

  const fetchDeezerPreview = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(
        `/api/deezer?q=${encodeURIComponent(
          `${song.title} ${song.artists.name}`
        )}`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch preview')
      }
      
      const data = await response.json()

      if (data.data && data.data.length > 0) {
        setDeezerPreview(data.data[0].preview)
      } else {
        setError('No preview available')
      }
    } catch (err) {
      console.error('Error fetching preview:', err)
      setError('Failed to load preview')
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      console.log('Fetching comments for song:', song.id)
      
      const { data: commentsData, error: commentsError } = await supabase
        .from('song_comments')
        .select(`
          id,
          content,
          created_at,
          user_id,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .eq('song_id', song.id)
        .order('created_at', { ascending: false })

      if (commentsError) {
        console.error('Comments error details:', commentsError)
        console.error('Error code:', commentsError.code)
        console.error('Error message:', commentsError.message)
        console.error('Error details:', commentsError.details)
        throw commentsError
      }

      console.log('Fetched comments data:', commentsData)
      setComments(commentsData || [])
    } catch (err) {
      console.error('Error fetching comments:', err)
      if (err instanceof Error) {
        console.error('Error message:', err.message)
      }
    }
  }

  const fetchLikes = async () => {
    try {
      // Get total likes count
      const { count, error: countError } = await supabase
        .from('song_likes')
        .select('id', { count: 'exact' })
        .eq('song_id', song.id)

      if (countError) throw countError
      setLikesCount(count || 0)

      // Check if current user has liked
      if (user) {
        const { data: likeData, error: likeError } = await supabase
          .from('song_likes')
          .select('id')
          .eq('song_id', song.id)
          .eq('user_id', user.id)
          .single()

        if (likeError && likeError.code !== 'PGRST116') throw likeError
        setIsLiked(!!likeData)
      }
    } catch (err) {
      console.error('Error fetching likes:', err)
    }
  }

  const handleLike = async () => {
    if (!user) {
      setShowSignIn(true)
      return
    }

    try {
      setSubmitting(true)

      if (isLiked) {
        // Unlike
        const { error: unlikeError } = await supabase
          .from('song_likes')
          .delete()
          .eq('song_id', song.id)
          .eq('user_id', user.id)

        if (unlikeError) throw unlikeError
        setLikesCount(prev => prev - 1)
        setIsLiked(false)
      } else {
        // Like
        const { error: likeError } = await supabase
          .from('song_likes')
          .insert({
            song_id: song.id,
            user_id: user.id
          })

        if (likeError) throw likeError
        setLikesCount(prev => prev + 1)
        setIsLiked(true)
      }
    } catch (err) {
      console.error('Error updating like:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleComment = async () => {
    if (!user) {
      setShowSignIn(true)
      return
    }

    if (!newComment.trim()) return

    try {
      setSubmitting(true)

      const { data: commentData, error: commentError } = await supabase
        .from('song_comments')
        .insert({
          song_id: song.id,
          user_id: user.id,
          content: newComment.trim()
        })
        .select()

      if (commentError) {
        console.error('Comment error details:', commentError)
        throw commentError
      }

      console.log('Added comment:', commentData)
      setNewComment('')
      await fetchComments() // Refresh comments
    } catch (err) {
      console.error('Error adding comment:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const togglePlay = () => {
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
        {/* Album Cover */}
        <div className="relative w-64 h-64 shrink-0">
          {song.albums.cover_medium ? (
            <Image
              src={song.albums.cover_medium}
              alt={song.albums.title}
              fill
              className="rounded-lg shadow-lg object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-lg bg-base-300 flex items-center justify-center">
              <Music className="h-16 w-16 opacity-20" />
            </div>
          )}
        </div>

        {/* Song Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{song.title}</h1>
          <Link 
            href={`/artists/${song.artists.id}/${slugify(song.artists.name)}`}
            className="text-xl text-primary hover:underline mb-2 inline-block"
          >
            {song.artists.name}
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>From the album</span>
            <Link 
              href={`/albums/${song.albums.id}/${slugify(song.albums.title)}`}
              className="hover:text-primary hover:underline"
            >
              {song.albums.title}
            </Link>
          </div>

          {/* Preview Player */}
          <div className="flex items-center gap-4 mt-6">
            {error ? (
              <div className="text-error">{error}</div>
            ) : deezerPreview && (
              <button
                onClick={togglePlay}
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : isPlaying ? (
                  <>
                    <Pause className="h-5 w-5 mr-2" />
                    Pause Preview
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    Play Preview
                  </>
                )}
              </button>
            )}

            {/* Like Button */}
            <button
              onClick={handleLike}
              disabled={submitting}
              className={`btn btn-circle ${isLiked ? 'btn-primary' : 'btn-ghost'}`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="ml-2">{likesCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          Comments
        </h2>

        {/* Comment Form */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder={user ? "Add a comment..." : "Sign in to comment"}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="input input-bordered flex-1"
            disabled={!user || submitting}
          />
          <button
            onClick={handleComment}
            disabled={!user || submitting || !newComment.trim()}
            className="btn btn-primary"
          >
            {submitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Comment'
            )}
          </button>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-base-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                {comment.profiles?.avatar_url ? (
                  <Image
                    src={comment.profiles.avatar_url}
                    alt={comment.profiles.full_name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center">
                    <span className="text-sm font-bold">
                      {comment.profiles?.full_name[0].toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="font-semibold">{comment.profiles?.full_name}</span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 