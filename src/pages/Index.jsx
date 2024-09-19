import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Jazz Legends: Adelaide Louise Hall</h1>
        <p className="text-xl text-gray-600 mb-8 text-center">
          Explore the greatest hits of Adelaide Louise Hall, a pioneering jazz singer whose career spanned over eight decades.
        </p>
        <div className="flex justify-center">
          <Link
            to="/singers"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            View Adelaide Hall's Top 10 Songs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
