export async function generatePlaylistContent(
  artistName: string,
  songs: Array<{ title: string; album_name: string }>,
  apiKey: string
) {
  const prompt = `
Write an article about ${artistName}'s selected songs following this structure:

First, write 1-2 paragraphs about ${artistName}, focusing on their musical style, impact on the industry, and what makes them unique as an artist.

Then, for each song below, write a detailed paragraph about its significance. Each song section should start with the song title as a heading:

${songs.map((song) => `
h2 ${song.title}
Write about this song from "${song.album_name}". Include:
• The song's musical style and composition
• What makes it special or memorable
• Its significance in ${artistName}'s discography
`).join('\n')}

Finally, write a concluding paragraph that summarizes the importance of these songs in ${artistName}'s career.

Important: 
- Keep each song description engaging and insightful
- Focus on what makes each track unique
- Do not use any markdown symbols (like #, *, ) or formatting in the text
- Do not include bullet points in the final text
- Write in flowing paragraphs
- Start each song section with "h2 " followed by the song title (exactly as shown above)
`

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      throw new Error('Failed to generate content')
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error('Error generating content:', error)
    throw error
  }
} 