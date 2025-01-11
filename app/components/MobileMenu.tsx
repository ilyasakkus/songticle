'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Sidebar } from './Sidebar'
import Link from 'next/link'
import { useAuth } from '../providers/AuthProvider'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, setShowSignIn } = useAuth()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto'
  }

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="btn btn-ghost btn-circle"
        aria-label="Menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Off-canvas Menu */}
      <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={toggleMenu}
        />

        {/* Menu Content */}
        <div className="absolute inset-y-0 left-0 w-80 bg-base-200 shadow-xl">
          {/* Menu Header */}
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

          {/* Navigation Links */}
          <div className="p-4 border-b border-base-300">
            <nav className="flex flex-col gap-2">
              <Link 
                href="/" 
                className="btn btn-ghost justify-start"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                href="/albums" 
                className="btn btn-ghost justify-start"
                onClick={toggleMenu}
              >
                Albums
              </Link>
              <Link 
                href="/artists" 
                className="btn btn-ghost justify-start"
                onClick={toggleMenu}
              >
                Artists
              </Link>
              <Link 
                href="/playlists" 
                className="btn btn-ghost justify-start"
                onClick={toggleMenu}
              >
                Playlists
              </Link>
              {user && (
                <>
                  <Link 
                    href="/profile" 
                    className="btn btn-ghost justify-start"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                  <Link 
                    href="/following" 
                    className="btn btn-ghost justify-start"
                    onClick={toggleMenu}
                  >
                    Following
                  </Link>
                </>
              )}
              {!user && (
                <button 
                  onClick={() => {
                    setShowSignIn(true)
                    toggleMenu()
                  }}
                  className="btn btn-primary"
                >
                  Sign In
                </button>
              )}
            </nav>
          </div>

          {/* Sidebar Content */}
          <div className="overflow-y-auto h-[calc(100vh-8rem)]">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
} 