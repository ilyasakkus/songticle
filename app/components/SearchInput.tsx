'use client'

import { Search } from 'lucide-react'

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function SearchInput({ className = '', ...props }: SearchInputProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-2 sm:left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
      </div>
      <input
        type="search"
        className="input input-bordered w-full pl-8 sm:pl-10 text-sm sm:text-base h-10 sm:h-12 min-w-0"
        {...props}
      />
    </div>
  )
} 