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
    console.log('Generating playlist content for:', { artistName, songCount: songs.length })

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

    const data = await response.json()

    if (!response.ok) {
      console.error('API Error:', data.error)
      throw new Error(data.error || 'Failed to generate content')
    }

    if (!data.content) {
      console.error('No content in response:', data)
      throw new Error('No content received from API')
    }

    return data.content

  } catch (error) {
    console.error('Error in generatePlaylistContent:', error)
    throw error
  }
} 