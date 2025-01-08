'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Profile } from '../types/database.types'

export function useProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    // Reset state when userId changes
    setProfile(null)
    setError(null)

    // Don't do anything if there's no userId
    if (!userId) return

    async function fetchProfile() {
      if (!mounted) return
      
      try {
        setLoading(true)

        // First check if session is valid
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError || !session) {
          console.error('Session error:', sessionError)
          return
        }

        // Only proceed if the userId matches the session user
        if (userId !== session.user.id) {
          console.error('User ID mismatch')
          return
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (!mounted) return

        if (error) {
          console.error('Profile fetch error:', error)
          throw error
        }

        if (!data) {
          // Try to create profile if it doesn't exist
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([
              {
                id: userId,
                full_name: session.user.user_metadata.full_name,
                avatar_url: session.user.user_metadata.avatar_url,
                email: session.user.email
              }
            ])
            .select()
            .single()

          if (insertError) {
            console.error('Profile creation error:', insertError)
            throw insertError
          }

          if (mounted) {
            setProfile(newProfile)
          }
        } else {
          if (mounted) {
            setProfile(data)
          }
        }
      } catch (err) {
        if (mounted) {
          console.error('Error in profile management:', err)
          setError('Failed to load profile')
          setProfile(null)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchProfile()

    return () => {
      mounted = false
    }
  }, [userId])

  return { profile, loading, error }
} 