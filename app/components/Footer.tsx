'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full bg-base-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Logo & Description */}
          <div className="text-center">
            <h2 className="text-xl font-bold">Songticle</h2>
            <p className="text-base-content/70 mt-2">
              Discover and share your musical stories
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link 
              href="/about"
              className="text-base-content/70 hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact"
              className="text-base-content/70 hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link 
              href="/terms"
              className="text-base-content/70 hover:text-primary transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link 
              href="/privacy"
              className="text-base-content/70 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
          </nav>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-base-content/60">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by</span>
            <a 
              href="https://github.com/ilyassakkus" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              İlyas Akkuş
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 