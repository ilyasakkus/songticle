import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [filter, setFilter] = useState('all');
  
  // Placeholder data - will be replaced with API data
  const stories = [
    {
      id: 1,
      songTitle: 'Örnek Şarkı 1',
      artist: 'Sanatçı 1',
      preview: 'Bu şarkıyı ilk duyduğumda...',
      mood: 'happy',
      likes: 24,
      author: 'Kullanıcı 1',
      date: '23 Aralık 2023'
    },
    {
      id: 2,
      songTitle: 'Örnek Şarkı 2',
      artist: 'Sanatçı 2',
      preview: 'Üniversite yıllarımda...',
      mood: 'nostalgic',
      likes: 18,
      author: 'Kullanıcı 2',
      date: '22 Aralık 2023'
    },
  ];

  const moodEmojis = {
    happy: '😊',
    sad: '😢',
    nostalgic: '🌟',
    energetic: '⚡',
    romantic: '❤️'
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Her Şarkının Bir Hikayesi Var
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Müzikle ilgili anılarınızı ve hikayelerinizi paylaşın
        </p>
        <Link
          to="/add-story"
          className="inline-block bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Hikayeni Paylaş
        </Link>
      </section>

      <section className="mb-8">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => setFilter('popular')}
            className={`px-4 py-2 rounded-md ${
              filter === 'popular'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Popüler
          </button>
          <button
            onClick={() => setFilter('recent')}
            className={`px-4 py-2 rounded-md ${
              filter === 'recent'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            En Yeni
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map(story => (
          <article
            key={story.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{story.songTitle}</h2>
                  <p className="text-gray-600">{story.artist}</p>
                </div>
                <span className="text-2xl">{moodEmojis[story.mood]}</span>
              </div>

              <p className="text-gray-700 mb-4 line-clamp-3">{story.preview}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <span>❤️ {story.likes}</span>
                  <span>•</span>
                  <span>{story.author}</span>
                </div>
                <Link
                  to={`/story/${story.id}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Devamını Oku
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Home;
