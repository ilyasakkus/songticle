import Anthropic from '@anthropic-ai/sdk'

interface Song {
  id: number
  title: string
  album_name: string
}

export async function generatePlaylistContent(
  artistName: string,
  songs: Song[],
  apiKey: string
): Promise<string | null> {
  try {
    const response = await fetch('/api/generate-playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        artistName,
        songs
      })
    })

    if (!response.ok) {
      throw new Error('Failed to generate content')
    }

    const data = await response.json()
    return data.content

  } catch (error) {
    console.error('Error generating playlist content:', error)
    return null
  }
} 