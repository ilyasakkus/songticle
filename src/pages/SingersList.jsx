import React from 'react';
import { Link } from 'react-router-dom';
import { singers } from '../data/singers';

const SingersList = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Famous Singers</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {singers.map((singer) => (
            <Link
              key={singer.id}
              to={`/singer/${singer.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-2">{singer.name}</h2>
              <p className="text-gray-600">Click to view top 10 songs</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingersList;