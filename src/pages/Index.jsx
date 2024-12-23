import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Music, Music2, Music3, Music4 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import Footer from '../components/Footer';
import Header from '../components/Header';
import SongScraper from '../components/SongScraper';

const musicCategories = [
  { 
    title: 'Pop Music', 
    link: '/pop-music', 
    icon: <Music className="w-6 h-6" />,
    description: 'Modern pop hits and classic favorites',
    artists: ['Mariah Carey', 'Ed Sheeran', 'Whitney Houston']
  },
  { 
    title: 'Rock Classics', 
    link: '/rock-classics', 
    icon: <Music2 className="w-6 h-6" />,
    description: 'Timeless rock anthems',
    artists: ['Freddie Mercury', 'Axl Rose', 'Kurt Cobain']
  },
  { 
    title: 'Jazz Legends', 
    link: '/greatest-jazz-songs', 
    icon: <Music3 className="w-6 h-6" />,
    description: 'Smooth jazz and legendary performances',
    artists: ['Adelaide Louise Hall', 'Billie Holiday', 'Ray Charles']
  },
  { 
    title: 'Hip Hop', 
    link: '/hip-hop', 
    icon: <Music4 className="w-6 h-6" />,
    description: 'Beats and rhymes from the best',
    artists: ['Kendrick Lamar', 'Metro Boomin', 'Ice Spice']
  },
  { 
    title: 'Walk Up Songs', 
    link: '/walk-up-songs', 
    icon: <Music className="w-6 h-6" />,
    description: 'Perfect entrance music',
    artists: ['Various Artists']
  },
  { 
    title: 'Electronic', 
    link: '/electronic', 
    icon: <Music2 className="w-6 h-6" />,
    description: 'Electronic beats and synthesized sounds',
    artists: ['Various Artists']
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Create Music Online
            </h1>
            <p className="text-xl mb-8">
              Discover, create, and share music with our free online tools
            </p>
            <Link
              to="/music-maker-free"
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
            >
              Try Music Maker Free
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for songs, artists, or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Music Directory Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Music Directory</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {musicCategories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="p-6 border rounded-lg hover:shadow-lg transition-shadow bg-white"
              >
                <div className="flex items-center mb-4">
                  {category.icon}
                  <h3 className="text-xl font-semibold ml-3">{category.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="text-sm text-gray-500">
                  Featured Artists: {category.artists.join(', ')}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Songs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Trending Songs</h2>
          <SongScraper />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;