import { NextResponse } from 'next/server'

const DEEZER_API_TIMEOUT = 5000 // 5 seconds timeout

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), DEEZER_API_TIMEOUT)

    try {
      const response = await fetch(
        `https://api.deezer.com/search?q=${encodeURIComponent(query)}`,
        {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (compatible; Songticle/1.0)'
          }
        }
      )

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Deezer API responded with status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error.message || 'Deezer API error')
      }

      return NextResponse.json(data)
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout' },
          { status: 504 }
        )
      }
      throw error
    }
  } catch (error) {
    console.error('Error fetching from Deezer:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch from Deezer' },
      { status: 500 }
    )
  }
} 