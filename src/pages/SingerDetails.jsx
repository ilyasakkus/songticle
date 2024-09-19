import React from 'react';
import { useParams } from 'react-router-dom';
import { singers } from '../data/singers';
import SongItem from '../components/SongItem';

const SingerDetails = () => {
  const { id } = useParams();
  const singer = singers.find((s) => s.id === parseInt(id));

  if (!singer) {
    return <div>Singer not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">{singer.name}'s Top 10 Songs</h1>
        <div className="space-y-4">
          {singer.songs.map((song, index) => (
            <SongItem key={index} song={song} index={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingerDetails;