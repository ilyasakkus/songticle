import React, { useState } from 'react';
import { Star } from 'lucide-react';

const SongItem = ({ song, index }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-2xl font-semibold mb-2">
        {index}. {song.title} ({song.year})
      </h3>
      <p className="text-gray-600 mb-4">{song.description}</p>
      <div className="flex items-center">
        <span className="mr-2">Rate this song:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            onClick={() => handleRating(star)}
          />
        ))}
      </div>
    </div>
  );
};

export default SongItem;
