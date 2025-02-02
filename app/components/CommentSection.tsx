'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Image } from '@/app/components/ui/image'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '../providers/AuthProvider'

interface Comment {
  id: number
  content: string
  created_at: string
  user_id: string
  profiles: {
    full_name: string
    avatar_url: string | null
  }
}

interface CommentSectionProps {
  songId: number
}

export function CommentSection({ songId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const supabase = createClientComponentClient()
  const { user, setShowSignIn } = useAuth()

  const fetchComments = useCallback(async () => {
    if (!songId) {
      console.error('No songId provided')
      setLoading(false)
      return
    }

    try {
      console.log('Fetching comments for songId:', songId)

      const { data, error } = await supabase
        .from('song_comments')
        .select(`
          id,
          song_id,
          content,
          created_at,
          user_id,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .eq('song_id', songId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error.message)
        setComments([])
        setLoading(false)
        return
      }

      console.log('Raw data from Supabase:', data)

      if (!data) {
        console.log('No comments found')
        setComments([])
        return
      }

      const transformedComments = data.map((comment: any) => ({
        id: comment.id,
        content: comment.content,
        created_at: comment.created_at,
        user_id: comment.user_id,
        profiles: {
          full_name: comment.profiles?.full_name || 'Anonymous User',
          avatar_url: comment.profiles?.avatar_url || null
        }
      }))

      console.log('Transformed comments:', transformedComments)
      setComments(transformedComments)
    } catch (error) {
      console.error('Error fetching comments:', error instanceof Error ? error.message : 'Unknown error')
      setComments([])
    } finally {
      setLoading(false)
    }
  }, [songId, supabase])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newComment.trim()) return
    
    try {
      setSubmitting(true)
      
      if (!user) {
        console.log('No user found when trying to submit comment')
        setShowSignIn(true)
        return
      }

      const { error } = await supabase
        .from('song_comments')
        .insert({
          song_id: songId,
          user_id: user.id,
          content: newComment.trim(),
          created_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error inserting comment:', error)
        return
      }
      
      setNewComment('')
      fetchComments()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('Error posting comment:', errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div>Loading comments...</div>
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      
      {/* Comment Form - Only show if logged in */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-3 rounded-lg bg-base-200 text-base-content resize-none min-h-[100px]"
          />
          <button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="btn btn-primary mt-2"
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <div className="alert alert-info mb-6">
          <p>Please <button onClick={() => setShowSignIn(true)} className="underline">sign in</button> to comment.</p>
        </div>
      )}

      {/* Comments List - Visible to all users */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-base-content/60">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-base-200 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                {comment.profiles.avatar_url ? (
                  <Image
                    src={comment.profiles.avatar_url}
                    alt={comment.profiles.full_name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-sm">
                      {comment.profiles.full_name?.[0]?.toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-medium">{comment.profiles.full_name}</div>
                  <div className="text-sm text-base-content/60">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </div>
                </div>
              </div>
              <p className="text-base-content/80 whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 