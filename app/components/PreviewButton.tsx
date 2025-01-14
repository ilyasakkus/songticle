'use client'

import { Music } from 'lucide-react'
import { useState } from 'react'

interface PreviewButtonProps {
  previewUrl: string | null
}

export function PreviewButton({ previewUrl }: PreviewButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const handlePreview = () => {
    if (!previewUrl) return

    if (!audio) {
      const newAudio = new Audio(previewUrl)
      setAudio(newAudio)
      newAudio.play()
      setIsPlaying(true)

      newAudio.addEventListener('ended', () => {
        setIsPlaying(false)
      })
    } else {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        audio.play()
        setIsPlaying(true)
      }
    }
  }

  if (!previewUrl) return null

  return (
    <button
      className="btn btn-primary"
      onClick={handlePreview}
    >
      <Music className="w-4 h-4 mr-2" />
      {isPlaying ? 'Pause' : 'Preview'}
    </button>
  )
} 