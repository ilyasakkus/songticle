'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface LikeButtonProps {
  songId: number
  initialLikes?: number
}

export function LikeButton({ songId, initialLikes = 0 }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    checkLikes()
  }, [])

  const checkLikes = async () => {
    try {
      // Get total likes from song_likes table
      const { data: likesCount } = await supabase
        .from('song_likes')
        .select('id', { count: 'exact' })
        .eq('song_id', songId)
      
      setLikes(likesCount?.length || 0)

      // Check if user has liked (if logged in)
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data: likeData } = await supabase
          .from('song_likes')
          .select('*')
          .eq('song_id', songId)
          .eq('user_id', session.user.id)
          .single()
        
        setIsLiked(!!likeData)
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error checking likes:', error)
      setLoading(false)
    }
  }

  const handleLike = async () => {
    try {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      
      if (isLiked) {
        // Unlike - only if user is logged in and has liked
        if (session) {
          await supabase
            .from('song_likes')
            .delete()
            .eq('song_id', songId)
            .eq('user_id', session.user.id)
          
          setLikes(prev => Math.max(0, prev - 1))
          setIsLiked(false)
        }
      } else {
        // Like - allow anonymous likes
        const likeData = {
          song_id: songId,
          user_id: session?.user?.id || null,
          created_at: new Date().toISOString()
        }

        const { error } = await supabase
          .from('song_likes')
          .insert(likeData)

        if (!error) {
          setLikes(prev => prev + 1)
          setIsLiked(true)
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors"
    >
      <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
      <span>{likes}</span>
    </button>
  )
} 