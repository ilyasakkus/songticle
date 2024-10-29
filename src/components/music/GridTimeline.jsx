import React from 'react';

const GridTimeline = ({ tracks, onToggleStep }) => {
  return (
    <div className="flex-1 overflow-x-auto bg-white">
      <div className="grid grid-cols-32 gap-[1px] min-h-[600px]">
        {/* Vertical grid lines */}
        {Array.from({ length: 32 }, (_, i) => (
          <div 
            key={`line-${i}`} 
            className="absolute h-full w-px bg-blue-100" 
            style={{ left: `${(i / 32) * 100}%` }}
          />
        ))}
        
        {/* Tracks */}
        {tracks.map((track) => (
          <div 
            key={track.id} 
            className="col-span-32 grid grid-cols-32 gap-[1px] h-24 relative"
          >
            {track.pattern.map((isActive, index) => (
              <button
                key={index}
                onClick={() => onToggleStep(track.id, index)}
                className={`
                  w-full h-full border border-gray-100 transition-colors
                  ${isActive ? 'bg-' + track.color + '-500' : 'bg-gray-50 hover:bg-gray-100'}
                `}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridTimeline;