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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-blue-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Discover Jazz Legends</h1>
            <div className="max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Search for a jazz singer..."
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
                to={`/singer/${singer.id}`}
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
