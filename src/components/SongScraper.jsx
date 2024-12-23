import { useState, useEffect } from 'react';
import axios from 'axios';

const SongScraper = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const PROXY_URL = 'https://api.codetabs.com/v1/proxy/?quest=';
  // Example: Using genius.com as the target
  const TARGET_URL = 'https://genius.com/tags/pop';

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${PROXY_URL}${encodeURIComponent(TARGET_URL)}`);
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, 'text/html');
      
      const songElements = doc.querySelectorAll('div.chart_row');
      const extractedSongs = Array.from(songElements).map(element => {
        return {
          title: element.querySelector('.chart_row-content-title')?.textContent?.trim() || '',
          artist: element.querySelector('.chart_row-artist')?.textContent?.trim() || '',
          link: element.querySelector('a')?.href || ''
        };
      }).filter(song => song.title && song.artist);

      setSongs(extractedSongs);
    } catch (err) {
      setError('Failed to fetch songs');
      console.error('Error fetching songs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Popular Songs</h2>
      
      {loading && <p className="text-gray-600">Loading songs...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid gap-4">
        {songs.map((song, index) => (
          <div key={index} className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg">{song.title}</h3>
            <p className="text-gray-600">{song.artist}</p>
            {song.link && (
              <a 
                href={song.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-block"
              >
                View on Genius
              </a>
            )}
          </div>
        ))}
      </div>
      
      <button 
        onClick={fetchSongs}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Refresh Songs
      </button>
    </div>
  );
};

export default SongScraper;
