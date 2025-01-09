'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Home, Mic2, Disc3, Music2, ListMusic, PlusCircle } from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';
import { useProfile } from '../hooks/useProfile';
import { SignInForm } from './auth/SignInForm';
import { SignUpForm } from './auth/SignUpForm';
import { supabase } from '../lib/supabase';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/artists', label: 'Artists', icon: Mic2 },
  { href: '/albums', label: 'Albums', icon: Disc3 },
  { href: '/songs', label: 'Songs', icon: Music2 },
  { href: '/playlists', label: 'Playlists', icon: ListMusic }
];

export function Header() {
  const pathname = usePathname();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile(user?.id);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Clear all cookies
      document.cookie.split(';').forEach(cookie => {
        document.cookie = cookie
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
      })
      
      // Force reload to clear all states
      window.location.href = '/'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="bg-base-100 shadow-sm">
      <div className="container mx-auto">
        <div className="navbar min-h-16 px-4">
          {/* Left side - Title */}
          <div className="flex-1 flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold text-primary">
              Songticle
            </Link>
            
            {/* Navigation Menu */}
            <nav className="flex items-center gap-1 overflow-x-auto">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      flex items-center gap-2 px-4 py-3 transition-colors
                      hover:text-primary
                      ${isActive ? 'text-primary border-b-2 border-primary' : 'text-base-content'}
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right side - Auth/User Actions */}
          <div className="flex-none gap-4">
            {authLoading ? (
              <div className="loading loading-spinner loading-sm" />
            ) : user ? (
              <>
                <Link href="/add">
                  <button className="btn btn-primary">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Song Story
                  </button>
                </Link>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <Image
                        src={profile?.avatar_url || '/placeholder-avatar.jpg'}
                        alt={profile?.full_name || 'User avatar'}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                  </label>
                  <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                      <Link href="/profile" className="justify-between">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleSignOut}>
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <button 
                  className="btn btn-ghost"
                  onClick={() => setShowSignIn(true)}
                >
                  Sign In
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowSignUp(true)}
                >
                  Sign Up
                </button>
              </>
            )}
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

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Sign Up</h3>
            <SignUpForm onClose={() => setShowSignUp(false)} />
          </div>
          <div className="modal-backdrop" onClick={() => setShowSignUp(false)} />
        </div>
      )}
    </header>
  )
}
