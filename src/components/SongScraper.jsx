import { useState, useEffect } from 'react';
import axios from 'axios';

const SongScraper = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      // You'll need to set up a proxy or backend API endpoint
      // to avoid CORS issues and protect API keys
      const response = await axios.get('/api/songs');
      setSongs(response.data);
    } catch (err) {
      setError('Failed to fetch songs');
      console.error('Error fetching songs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Song List</h2>
      
      {loading && <p>Loading songs...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid gap-4">
        {songs.map((song, index) => (
          <div key={index} className="border p-4 rounded-lg shadow">
            <h3 className="font-semibold">{song.title}</h3>
            <p className="text-gray-600">{song.artist}</p>
            <p className="mt-2">{song.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongScraper;
