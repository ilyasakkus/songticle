'use client';

import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-base-100 border-b border-base-300">
      <div className="container mx-auto px-4">
        <div className="navbar min-h-16">
          <div className="flex-1">
            <Link 
              href="/" 
              className="text-2xl font-serif font-bold text-primary hover:text-primary-focus transition-colors"
            >
              Songticle
            </Link>
          </div>
          <div className="flex-none">
            <Link href="/add">
              <button className="btn btn-primary">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Song Story
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
