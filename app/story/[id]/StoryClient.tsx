'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart, MessageCircle, Music, Pause, Play } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '../../providers/AuthProvider'
import { supabase } from '../../lib/supabase'
import { SignInForm } from '../../components/auth/SignInForm'
import Link from 'next/link'

interface Story {
  id: number
  content: string
  created_at: string
  user_id: string
  songs: {
    id: number
    title: string
    artist_name: string
    cover_image: string | null
    preview_url: string | null
    artists: {
      id: number
      name: string
    }
  } | null
  author: {
    id: string
    full_name: string
    avatar_url: string | null
  } | null
}

interface Comment {
  id: number
  content: string
  created_at: string
  user_id: string
  author: {
    full_name: string
    avatar_url: string | null
  } | null
}

interface Like {
  id: number
  user_id: string
}

interface StoryClientProps {
  storyId: string
}

export default function StoryClient({ storyId }: StoryClientProps) {
  const { user } = useAuth()
  const [story, setStory] = useState<Story | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [likes, setLikes] = useState<Like[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const isLiked = user ? likes.some(like => like.user_id === user.id) : false

  useEffect(() => {
    fetchStory()
    fetchComments()
    fetchLikes()
  }, [storyId])

  const fetchStory = async () => {
    try {
      const { data: storyData, error: storyError } = await supabase
        .from('stories')
        .select(`
          id,
          content,
          created_at,
          song_id,
          user_id,
          songs!stories_song_id_fkey (
            id,
            title,
            artist_id,
            cover_image,
            preview_url,
            artists!songs_artist_id_fkey (
              id,
              name
            )
          )
        `)
        .eq('id', storyId)
        .single()

      if (storyError) throw storyError

      if (storyData) {
        // Fetch profile data
        const { data: profileData } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .eq('id', storyData.user_id)
          .single()

        // Transform story data to match the interface
        const transformedStory = {
          id: storyData.id,
          content: storyData.content,
          created_at: storyData.created_at,
          user_id: storyData.user_id,
          songs: storyData.songs?.[0] ? {
            id: storyData.songs[0].id,
            title: storyData.songs[0].title,
            artist_name: storyData.songs[0].artists?.[0]?.name || '',
            cover_image: storyData.songs[0].cover_image,
            preview_url: storyData.songs[0].preview_url,
            artists: {
              id: storyData.songs[0].artists?.[0]?.id || 0,
              name: storyData.songs[0].artists?.[0]?.name || ''
            }
          } : null,
          author: profileData || null
        }

        console.log('Transformed Story:', transformedStory)
        setStory(transformedStory)
      }
    } catch (err) {
      console.error('Error fetching story:', err)
      setError('Failed to load story')
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      // First fetch comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('story_comments')
        .select('*')
        .eq('story_id', storyId)
        .order('created_at', { ascending: true })

      if (commentsError) throw commentsError

      if (commentsData && commentsData.length > 0) {
        // Get unique user IDs
        const userIds = [...new Set(commentsData.map(comment => comment.user_id))]

        // Fetch profiles for these users
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds)

        if (profilesError) throw profilesError

        // Create a map of user_id to profile
        const profileMap = new Map(profilesData?.map(profile => [profile.id, profile]))

        // Combine comments with profile data
        const commentsWithProfiles = commentsData.map(comment => ({
          id: comment.id,
          content: comment.content,
          created_at: comment.created_at,
          user_id: comment.user_id,
          author: profileMap.get(comment.user_id) || null
        }))

        setComments(commentsWithProfiles)
      } else {
        setComments([])
      }
    } catch (err) {
      console.error('Error fetching comments:', err)
    }
  }

  const fetchLikes = async () => {
    try {
      const { data, error } = await supabase
        .from('story_likes')
        .select('id, user_id')
        .eq('story_id', storyId)

      if (error) throw error
      setLikes(data || [])
    } catch (err) {
      console.error('Error fetching likes:', err)
    }
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      // Redirect to sign in
      const signInModal = document.getElementById('sign-in-modal') as HTMLDialogElement
      if (signInModal) {
        signInModal.showModal()
      }
      return
    }

    if (!newComment.trim()) return

    try {
      setSubmitting(true)
      const { error } = await supabase
        .from('story_comments')
        .insert([
          {
            story_id: storyId,
            user_id: user.id,
            content: newComment.trim()
          }
        ])

      if (error) throw error

      setNewComment('')
      fetchComments() // Fetch fresh comments after posting
    } catch (err) {
      console.error('Error posting comment:', err)
      setError('Failed to post comment')
    } finally {
      setSubmitting(false)
    }
  }

  const handleLike = async () => {
    if (!user) {
      setShowSignIn(true)
      return
    }

    try {
      if (isLiked) {
        // Unlike
        const likeToRemove = likes.find(like => like.user_id === user.id)
        if (likeToRemove) {
          const { error } = await supabase
            .from('story_likes')
            .delete()
            .eq('id', likeToRemove.id)

          if (error) throw error
          fetchLikes()
        }
      } else {
        // Like
        const { error } = await supabase
          .from('story_likes')
          .insert([
            {
              story_id: storyId,
              user_id: user.id
            }
          ])

        if (error) throw error
        fetchLikes()
      }
    } catch (err) {
      console.error('Error updating like:', err)
      setError('Failed to update like')
    }
  }

  const handlePlayPause = () => {
    if (!story?.songs?.preview_url) return

    if (isPlaying) {
      audio?.pause()
      setIsPlaying(false)
    } else {
      const newAudio = new Audio(story.songs.preview_url)
      newAudio.play()
      setIsPlaying(true)
      setAudio(newAudio)

      newAudio.addEventListener('ended', () => {
        setIsPlaying(false)
        setAudio(null)
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error || !story) {
    return (
      <div className="alert alert-error">
        <span>{error || 'Story not found'}</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-base-100 rounded-box shadow-lg">
        {/* Song Info Section */}
        {story?.songs && (
          <div className="p-6 border-b border-base-300">
            <div className="flex gap-6">
              {/* Song Cover */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-lg overflow-hidden bg-base-200">
                {story.songs.cover_image ? (
                  <Image
                    src={story.songs.cover_image}
                    alt={story.songs.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Music className="w-12 h-12 text-base-content/20" />
                  </div>
                )}
                {story.songs.preview_url && (
                  <button
                    onClick={handlePlayPause}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
                  >
                    {isPlaying ? (
                      <Pause className="h-12 w-12 text-white" />
                    ) : (
                      <Play className="h-12 w-12 text-white" />
                    )}
                  </button>
                )}
              </div>

              {/* Song Details */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{story.songs.title}</h2>
                <Link 
                  href={`/artists/${story.songs.artists?.id}`}
                  className="text-lg text-primary hover:underline mb-4 inline-block"
                >
                  {story.songs.artists?.name}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Story Content */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-2">
              {story?.author?.avatar_url && (
                <Image
                  src={story.author.avatar_url}
                  alt={story.author.full_name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span>{story?.author?.full_name}</span>
            </div>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(story?.created_at || ''), { addSuffix: true })}</span>
          </div>
          
          <div className="prose max-w-none">
            <p>{story?.content}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-b flex items-center gap-6">
          <button
            onClick={handleLike}
            className={`btn btn-ghost gap-2 ${isLiked ? 'text-primary' : ''}`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likes.length}</span>
          </button>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <span>{comments.length}</span>
          </div>
        </div>

        {/* Comments Section */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Comments</h2>
          
          {/* New Comment Form or Sign In Message */}
          {user ? (
            <form onSubmit={handleComment} className="mb-6">
              <div className="form-control">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="textarea textarea-bordered h-24"
                  disabled={submitting}
                />
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting || !newComment.trim()}
                >
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </form>
          ) : (
            <div className="alert alert-info mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <div className="flex items-center gap-2">
                <span>For add your comment, please</span>
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={() => setShowSignIn(true)}
                  type="button"
                >
                  sign in
                </button>
              </div>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                {comment.author?.avatar_url && (
                  <Image
                    src={comment.author.avatar_url}
                    alt={comment.author.full_name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{comment.author?.full_name}</span>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(comment.created_at))} ago
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Sign In</h3>
            <SignInForm onClose={() => setShowSignIn(false)} />
          </div>
          <div className="modal-backdrop" onClick={() => setShowSignIn(false)} />
        </div>
      )}
    </div>
  )
} 