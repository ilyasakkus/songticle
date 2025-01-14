import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

interface Song {
  id: number
  title: string
  album_name: string
}

export async function POST(request: Request) {
  try {
    const { artistName, songs } = await request.json()

    // Limit to 10 random songs if more than 10
    const selectedSongs = songs.length > 10 
      ? songs.sort(() => 0.5 - Math.random()).slice(0, 10)
      : songs

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    })

    const songSections = selectedSongs.map((song: Song) => {
      const songCard = `
<div class="song-card">
  <div class="card bg-base-100 shadow-lg">
  </div>
</div>`

      return `
h2 ${song.title}
${songCard}

Write about this song from "${song.album_name}". Include:
• The song's musical style and composition
• What makes it special or memorable
• Its significance in ${artistName}'s discography`
    }).join('\n\n')

    const prompt = `Write an article about ${artistName}'s selected songs following this structure:

First, write 1-2 paragraphs about ${artistName}, focusing on their musical style, impact on the industry, and what makes them unique as an artist.

Then, for each song below, write a detailed paragraph about its significance. Each song section should start with the song title as a heading:

${songSections}

Finally, write a concluding paragraph that summarizes the importance of these songs in ${artistName}'s career.

Important: 
- Keep each song description engaging and insightful
- Focus on what makes each track unique
- Start each song section with "h2 " followed by the song title (exactly as shown above)
- Keep the HTML song cards exactly as provided
- Write in flowing paragraphs
- Do not use any markdown symbols (like #, *, ) in the text
- Do not include bullet points in the final text`

    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 2000,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })

    // Extract content from the message response
    const content = message.content[0].type === 'text' 
      ? message.content[0].text 
      : ''

    return NextResponse.json({ 
      content,
      selectedSongs // Return selected songs for playlist creation
    })
  } catch (error) {
    console.error('Error generating playlist content:', error)
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 })
  }
} 