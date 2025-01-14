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
import { MobileMenu } from './MobileMenu';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/artists', label: 'Artists', icon: Mic2 },
  { href: '/albums', label: 'Albums', icon: Disc3 },
  { href: '/songs', label: 'Songs', icon: Music2 },
  { href: '/playlists', label: 'Playlists', icon: ListMusic }
];

export function Header() {
  const pathname = usePathname();
  const { user, loading: authLoading, showSignIn, setShowSignIn } = useAuth();
  const { profile, loading: profileLoading } = useProfile(user?.id);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear all cookies
      document.cookie.split(';').forEach(cookie => {
        document.cookie = cookie
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
      });
      
      // Force reload to clear all states
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-base-100 shadow-sm w-full overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="navbar min-h-14 px-2 sm:px-4">
          {/* Left side - Title and Mobile Menu */}
          <div className="flex-1 flex items-center gap-2 sm:gap-4">
            <div className="lg:hidden">
              <MobileMenu />
            </div>
            <Link href="/" className="text-lg sm:text-2xl font-bold text-primary">
              Songticle
            </Link>
            
            {/* Navigation Menu - Hidden on Mobile */}
            <nav className="hidden lg:flex items-center gap-1 overflow-x-auto">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      flex items-center gap-2 px-3 py-2 transition-colors
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
          <div className="flex items-center gap-2 sm:gap-4">
            {authLoading ? (
              <div className="loading loading-spinner loading-sm" />
            ) : user ? (
              <>
                <Link href="/add">
                  <button className="btn btn-primary btn-sm h-8 min-h-8 px-2 sm:px-3">
                    <PlusCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs hidden xs:inline">Add Story</span>
                  </button>
                </Link>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-circle avatar">
                    <div className="w-7 sm:w-8 rounded-full">
                      <Image
                        src={profile?.avatar_url || '/placeholder-avatar.jpg'}
                        alt={profile?.full_name || 'User avatar'}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <ul 
                    tabIndex={0} 
                    className="dropdown-content z-[999] menu menu-sm p-2 shadow-lg bg-base-100 rounded-box w-52 mt-2 absolute"
                    style={{ position: 'fixed', right: '1rem', top: '3.5rem' }}
                  >
                    <li>
                      <Link href="/profile" className="py-2">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleSignOut} className="py-2">
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <button 
                  className="btn btn-ghost btn-sm h-8 min-h-8 text-xs sm:text-sm"
                  onClick={() => setShowSignIn(true)}
                >
                  Sign In
                </button>
                <button 
                  className="btn btn-primary btn-sm h-8 min-h-8 text-xs sm:text-sm"
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
  );
}
