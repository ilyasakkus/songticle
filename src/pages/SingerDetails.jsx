import React from 'react';
import { useParams } from 'react-router-dom';
import { singers } from '../data/singers';
import SongItem from '../components/SongItem';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
          <h1 className="text-4xl font-bold mb-4 text-center">{singer.name}</h1>
          <p className="text-xl text-gray-600 mb-8 text-center">{singer.bio}</p>
          <h2 className="text-3xl font-semibold mb-6 text-center">Top 10 Songs</h2>
          <div className="space-y-4">
            {singer.songs.map((song, index) => (
              <SongItem key={index} song={song} index={index + 1} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SingerDetails;
