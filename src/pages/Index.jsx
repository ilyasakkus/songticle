import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { singers } from '../data/singers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Music } from 'lucide-react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayCount, setDisplayCount] = useState(18);

  const filteredSingers = singers.filter(singer =>
    singer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedSingers = filteredSingers.slice(0, displayCount);

  const getSingerPath = (singerId) => {
    switch (singerId) {
      case 1: return '/adelaide-louise-hall';
      case 2: return '/metro-boomin';
      case 3: return '/kendrick-lamar';
      case 4: return '/sabrina-carpenter';
      case 5: return '/mariah-carey';
      case 6: return '/freddie-mercury';
      case 7: return '/whitney-houston';
      case 8: return '/elvis-presley';
      case 9: return '/janis-joplin';
      case 10: return '/roy-orbison';
      case 11: return '/ray-charles';
      case 12: return '/aretha-franklin';
      case 13: return '/tom-petty';
      case 14: return '/axl-rose';
      case 15: return '/kurt-cobain';
      case 16: return '/stevie-nicks';
      case 17: return '/vanessa-paradis';
      case 18: return '/zachary-bryan';
      case 19: return '/billie-holiday';
      case 20: return '/kidz-bop';
      case 21: return '/jackie-wilson';
      case 22: return '/ed-sheeran';
      case 23: return '/tarkan';
      case 24: return '/benjamin-biolay';
      case 25: return '/hank-williams';
      case 26: return '/the-carpenters';
      case 27: return '/joni-mitchell';
      case 28: return '/george-jones';
      case 29: return '/lutan-fyah';
      case 30: return '/radiohead';
      case 31: return '/bjork';
      case 32: return '/live';
      case 33: return '/ice-spice';
      case 34: return '/bandmanrill';
      case 35: return '/glorilla';
      case 36: return '/ayra-starr';
      case 37: return '/marie-osmond';
      case 38: return '/sam-cooke';
      default: return '/';
    }
  };

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 18);
  };

  const getGradientColor = (index) => {
    const hue = (index * 20) % 360;
    return `hsla(${hue}, 70%, 80%, 0.2)`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-blue-100 to-blue-200 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Songticle - Music Listicles All-Time</h1>
            <div className="max-w-3xl mx-auto">
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 animated-placeholder"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a singer..."
              />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedSingers.map((singer, index) => (
              <Link
                key={singer.id}
                to={getSingerPath(singer.id)}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                style={{ background: `linear-gradient(135deg, ${getGradientColor(index)}, white)` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <Music className="w-8 h-8 text-gray-500" />
                  </div>
                  <h2 className="text-2xl font-semibold">{singer.name}</h2>
                </div>
                <p className="text-gray-600 mb-4">{singer.bio.substring(0, 100)}...</p>
                <span className="text-blue-500 hover:underline">View top 10 songs</span>
              </Link>
            ))}
            <Link
              to="/walk-up-songs"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              style={{ background: `linear-gradient(135deg, ${getGradientColor(displayedSingers.length)}, white)` }}
            >
              <h2 className="text-2xl font-semibold mb-2">Top 10 Walk-Up Songs in Baseball</h2>
              <p className="text-gray-600 mb-4">Discover the most iconic and energizing walk-up songs used by baseball players...</p>
              <span className="text-blue-500 hover:underline">View top 10 songs</span>
            </Link>
            <Link
              to="/greatest-jazz-songs"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              style={{ background: `linear-gradient(135deg, ${getGradientColor(displayedSingers.length + 1)}, white)` }}
            >
              <h2 className="text-2xl font-semibold mb-2">The Greatest Jazz Songs of All Time</h2>
              <p className="text-gray-600 mb-4">Explore the top 20 timeless classics from the world of jazz...</p>
              <span className="text-blue-500 hover:underline">View top 20 songs</span>
            </Link>
          </div>
          {displayCount < filteredSingers.length && (
            <div className="mt-8 text-center">
              <Button onClick={handleLoadMore} variant="outline">Load More</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style jsx>{`
        .animated-placeholder::placeholder {
          opacity: 1;
          animation: typingAnimation 4s steps(25, end) infinite;
        }

        @keyframes typingAnimation {
          0% { content: ''; }
          100% { content: 'Search for a singer...'; }
        }

        .animated-placeholder:not(:placeholder-shown) {
          animation: none;
        }
      `}</style>
    </div>
  );
};

export default Index;
