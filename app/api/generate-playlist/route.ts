import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

interface Song {
  id: number
  title: string
  album_name: string
}

// Increase timeout to 2 minutes
export const maxDuration = 120

// Configure runtime
export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    // Log all environment variables (be careful not to log sensitive data in production)
    console.log('Environment variables available:', {
      hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
      keyLength: process.env.ANTHROPIC_API_KEY?.length,
      nodeEnv: process.env.NODE_ENV
    })

    const body = await request.json()
    
    if (!body.artistName || !body.songs || !Array.isArray(body.songs)) {
      console.error('Invalid request body:', body)
      return NextResponse.json({ 
        error: 'Invalid request. artistName and songs array are required.' 
      }, { status: 400 })
    }

    const { artistName, songs } = body

    // Limit to 10 random songs if more than 10
    const selectedSongs = songs.length > 10 
      ? songs.sort(() => 0.5 - Math.random()).slice(0, 10)
      : songs

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is missing from environment')
      return NextResponse.json({ 
        error: 'API key configuration error. Please check server environment variables.' 
      }, { status: 500 })
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    })

    const songSections = selectedSongs.map((song: Song) => {
      return `
h2 ${song.title}

Write about this song from "${song.album_name}". Include:
• The song's musical style and composition
• What makes it special or memorable
• Its significance in ${artistName}'s discography`
    }).join('\n\n')

    const prompt = `Write an article about ${artistName}'s selected songs following this structure:

First, write 1-2 paragraphs about ${artistName}, focusing on their musical style, impact on the industry, and what makes them unique as an artist.

Then, for each song below, write a paragraph about its significance. Each song section should start with the song title as a heading:

${songSections}

Finally, write a concluding paragraph that summarizes the importance of these songs in ${artistName}'s career.

Important: 
- Keep each song description engaging and insightful
- Focus on what makes each track unique
- Start each song section with "h2 " followed by the song title (exactly as shown above)
- Write in flowing paragraphs
- Do not use any markdown symbols (like #, *, ) in the text
- Do not include bullet points in the final text`

    console.log('Sending request to Anthropic with prompt:', prompt)

    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 4000,
      temperature: 0.3,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })

    if (!message || !message.content || !message.content[0]) {
      console.error('Invalid response from Anthropic:', message)
      return NextResponse.json({ 
        error: 'Invalid response from AI service' 
      }, { status: 500 })
    }

    // Extract content from the message response
    const content = message.content[0].type === 'text' 
      ? message.content[0].text 
      : ''

    if (!content) {
      console.error('Empty content from Anthropic')
      return NextResponse.json({ 
        error: 'Empty response from AI service' 
      }, { status: 500 })
    }

    console.log('Successfully generated content')

    return NextResponse.json({ 
      content,
      selectedSongs
    })
  } catch (error) {
    console.error('Error in generate-playlist route:', error)
    
    // Check for specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json({ 
          error: 'Request timed out. Please try again.' 
        }, { status: 504 })
      }
      
      if (error.message.includes('rate limit')) {
        return NextResponse.json({ 
          error: 'Rate limit exceeded. Please try again in a few minutes.' 
        }, { status: 429 })
      }
    }
    
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to generate content' 
    }, { status: 500 })
  }
} 