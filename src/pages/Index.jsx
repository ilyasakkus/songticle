import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { singers } from '../data/singers';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSingers = singers.filter(singer =>
    singer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSingerPath = (singerId) => {
    switch (singerId) {
      case 1:
        return '/adelaide-louise-hall';
      case 2:
        return '/metro-boomin';
      case 3:
        return '/kendrick-lamar';
      case 4:
        return '/sabrina-carpenter';
      case 5:
        return '/mariah-carey';
      case 6:
        return '/freddie-mercury';
      case 7:
        return '/whitney-houston';
      case 8:
        return '/elvis-presley';
      case 9:
        return '/janis-joplin';
      case 10:
        return '/roy-orbison';
      case 11:
        return '/ray-charles';
      default:
        return '/';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-blue-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Discover Songticles</h1>
            <div className="max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Search for a singer..."
                className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSingers.map((singer) => (
              <Link
                key={singer.id}
                to={getSingerPath(singer.id)}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-2xl font-semibold mb-2">{singer.name}</h2>
                <p className="text-gray-600 mb-4">{singer.bio.substring(0, 100)}...</p>
                <span className="text-blue-500 hover:underline">View top 10 songs</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
