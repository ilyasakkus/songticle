import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { singers } from '../data/singers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const SingerDetails = () => {
  const { id } = useParams();
  const singer = singers.find((s) => s.id === parseInt(id));

  if (!singer) {
    return <div>Singer not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link
              to="/"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Main Page
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-center">{singer.name}</h1>
          <p className="text-xl text-gray-600 mb-8 text-center">{singer.bio}</p>
          <h2 className="text-3xl font-semibold mb-6 text-center">Top 10 Songs</h2>
          <div className="space-y-8">
            {singer.songs.map((song, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {index + 1}. {song.title} ({song.year})
                </h3>
                <p className="text-gray-600 mb-4">{song.description}</p>
                {song.youtubeEmbed && (
                  <div className="aspect-w-16 aspect-h-9 mb-4" style={{ height: '400px' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${song.youtubeEmbed}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SingerDetails;
