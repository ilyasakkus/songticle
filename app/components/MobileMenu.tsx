'use client'

import { useState } from 'react'
import { Menu, X, Star, Clock, Music, ChevronDown, ChevronRight } from 'lucide-react'
import { Sidebar } from './Sidebar'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../providers/AuthProvider'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home', icon: Menu },
  { href: '/artists', label: 'Artists', icon: Music },
  { href: '/albums', label: 'Albums', icon: Music },
  { href: '/songs', label: 'Songs', icon: Music },
  { href: '/playlists', label: 'Playlists', icon: Music }
]

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, setShowSignIn } = useAuth()
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState({
    artists: true,
    albums: true,
    songs: true
  })

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto'
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
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
        <div className="absolute inset-y-0 left-0 w-80 bg-base-200 shadow-xl overflow-y-auto">
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
          <nav className="p-4 border-b border-base-300">
            {navItems.map(({ href, label }) => {
              const isActive = pathname === href
              return (
                <Link 
                  key={href}
                  href={href} 
                  className={`
                    flex items-center gap-2 px-4 py-3 transition-colors rounded-lg
                    hover:bg-base-300
                    ${isActive ? 'bg-base-300 text-primary' : ''}
                  `}
                  onClick={toggleMenu}
                >
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              )
            })}
            {user && (
              <>
                <Link 
                  href="/profile" 
                  className="flex items-center gap-2 px-4 py-3 transition-colors rounded-lg hover:bg-base-300"
                  onClick={toggleMenu}
                >
                  <span className="text-sm font-medium">Profile</span>
                </Link>
                <Link 
                  href="/add" 
                  className="flex items-center gap-2 px-4 py-3 transition-colors rounded-lg hover:bg-base-300 text-primary"
                  onClick={toggleMenu}
                >
                  <span className="text-sm font-medium">Add Song Story</span>
                </Link>
              </>
            )}
            {!user && (
              <button 
                onClick={() => {
                  setShowSignIn(true)
                  toggleMenu()
                }}
                className="w-full btn btn-primary mt-2"
              >
                Sign In
              </button>
            )}
          </nav>

          {/* Popular Artists Section */}
          <div className="p-4 border-b border-base-300">
            <button 
              onClick={() => toggleSection('artists')}
              className="flex items-center justify-between w-full mb-2 text-sm font-semibold"
            >
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Popular Artists</span>
              </div>
              {expandedSections.artists ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {expandedSections.artists && <Sidebar />}
          </div>

          {/* Random Albums Section */}
          <div className="p-4 border-b border-base-300">
            <button 
              onClick={() => toggleSection('albums')}
              className="flex items-center justify-between w-full mb-2 text-sm font-semibold"
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Random Albums</span>
              </div>
              {expandedSections.albums ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {expandedSections.albums && <Sidebar />}
          </div>

          {/* Popular Songs Section */}
          <div className="p-4">
            <button 
              onClick={() => toggleSection('songs')}
              className="flex items-center justify-between w-full mb-2 text-sm font-semibold"
            >
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                <span>Popular Songs</span>
              </div>
              {expandedSections.songs ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {expandedSections.songs && <Sidebar />}
          </div>
        </div>
      </div>
    </div>
  )
} 