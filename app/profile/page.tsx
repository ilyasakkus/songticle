'use client'

import { useAuth } from '../providers/AuthProvider'
import { useProfile } from '../hooks/useProfile'
import Image from 'next/image'

export default function ProfilePage() {
  const { user } = useAuth()
  const { profile, loading, error } = useProfile(user?.id)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      {profile ? (
        <div className="flex items-center space-x-4">
          <Image
            src={profile.avatar_url || '/placeholder-avatar.jpg'}
            alt={profile.full_name || 'User avatar'}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{profile.full_name}</h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>
        </div>
      ) : (
        <div>No profile data available.</div>
      )}
    </div>
  )
} 