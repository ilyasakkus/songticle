import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { slugify } from '@/app/lib/utils'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://songticle.com'

export async function GET() {
  try {
    // Fetch all required data
    const [
      { data: stories },
      { data: artists },
      { data: albums },
      { data: playlists },
      { data: songs }
    ] = await Promise.all([
      supabase.from('stories').select('id, title, created_at'),
      supabase.from('artists').select('id, name, created_at'),
      supabase.from('albums').select('id, title, created_at'),
      supabase.from('playlists').select('id, title, created_at'),
      supabase.from('songs').select('id, title, created_at')
    ])

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${SITE_URL}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      
      ${stories?.map(story => `
        <url>
          <loc>${SITE_URL}/story/${story.id}/${slugify(story.title)}</loc>
          <lastmod>${new Date(story.created_at).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('') || ''}
      
      ${artists?.map(artist => `
        <url>
          <loc>${SITE_URL}/artist/${artist.id}/${slugify(artist.name)}</loc>
          <lastmod>${new Date(artist.created_at).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('') || ''}
      
      ${albums?.map(album => `
        <url>
          <loc>${SITE_URL}/album/${album.id}/${slugify(album.title)}</loc>
          <lastmod>${new Date(album.created_at).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('') || ''}
      
      ${playlists?.map(playlist => `
        <url>
          <loc>${SITE_URL}/playlist/${playlist.id}/${slugify(playlist.title)}</loc>
          <lastmod>${new Date(playlist.created_at).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('') || ''}
      
      ${songs?.map(song => `
        <url>
          <loc>${SITE_URL}/song/${song.id}/${slugify(song.title)}</loc>
          <lastmod>${new Date(song.created_at).toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.6</priority>
        </url>
      `).join('') || ''}
    </urlset>`.trim()

    // Return XML response
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
      }
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}

// Set revalidate time to 1 hour
export const revalidate = 3600 