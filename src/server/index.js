const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/songs', async (req, res) => {
  try {
    // Example: scraping from a music website
    // You'll need to replace this URL with your target website
    const response = await axios.get('https://example-music-site.com');
    const $ = cheerio.load(response.data);
    
    const songs = [];
    
    // This selector will need to be adjusted based on the target website's structure
    $('.song-item').each((i, element) => {
      const title = $(element).find('.song-title').text().trim();
      const artist = $(element).find('.song-artist').text().trim();
      const content = $(element).find('.song-content').text().trim();
      
      songs.push({ title, artist, content });
    });
    
    res.json(songs);
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ error: 'Failed to scrape songs' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
