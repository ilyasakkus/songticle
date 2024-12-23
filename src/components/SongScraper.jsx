import { useState, useEffect } from 'react';
import axios from 'axios';

const SongScraper = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const PROXY_URL = 'https://api.codetabs.com/v1/proxy/?quest=';
  const TARGET_URL = 'https://www.udiscovermusic.com/music/playlists/';

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${PROXY_URL}${encodeURIComponent(TARGET_URL)}`);
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, 'text/html');
      
      // Select all article elements
      const articleElements = doc.querySelectorAll('article.article-preview');
      const extractedArticles = Array.from(articleElements).map(element => {
        const imageElement = element.querySelector('img');
        const titleElement = element.querySelector('.article-preview__title');
        const excerptElement = element.querySelector('.article-preview__excerpt');
        const linkElement = element.querySelector('a');
        
        return {
          title: titleElement?.textContent?.trim() || '',
          excerpt: excerptElement?.textContent?.trim() || '',
          image: imageElement?.src || '',
          link: linkElement?.href || '',
          date: element.querySelector('.article-preview__date')?.textContent?.trim() || ''
        };
      }).filter(article => article.title && article.link);

      setArticles(extractedArticles);
    } catch (err) {
      setError('Failed to fetch articles');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      
      {error && (
        <div className="text-red-500 text-center py-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
            {article.image && (
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
              </div>
            )}
            
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-blue-600">
                {article.title}
              </h3>
              
              {article.date && (
                <p className="text-sm text-gray-500 mb-2">
                  {article.date}
                </p>
              )}
              
              {article.excerpt && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
              )}
              
              <a 
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <button 
          onClick={fetchArticles}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Refresh Articles
        </button>
      </div>
    </div>
  );
};

export default SongScraper;
