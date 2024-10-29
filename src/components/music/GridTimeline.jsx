import React from 'react';
import * as Tone from 'tone';

const GridTimeline = ({ tracks, onToggleStep, currentStep }) => {
  const playPreviewSound = (track) => {
    const synth = new Tone.Synth().toDestination();
    switch(track.name) {
      case 'Drums':
        synth.triggerAttackRelease("C2", "8n");
        break;
      case 'Bass':
        synth.triggerAttackRelease("G2", "8n");
        break;
      case 'Lead':
        synth.triggerAttackRelease("C4", "8n");
        break;
    }
  };

  const handleStepClick = (trackId, index, track) => {
    onToggleStep(trackId, index);
    playPreviewSound(track);
  };

  return (
    <div className="flex-1 overflow-x-auto bg-white">
      <div className="grid grid-cols-32 gap-[1px] min-h-[600px] relative">
        {/* Playhead */}
        {currentStep !== null && (
          <div 
            className="absolute top-0 bottom-0 w-[3px] bg-blue-500 transition-all duration-100"
            style={{ 
              left: `${(currentStep / 32) * 100}%`,
              transform: 'translateX(-50%)'
            }}
          />
        )}
        
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
                onClick={() => handleStepClick(track.id, index, track)}
                className={`
                  w-full h-full border border-gray-100 transition-colors
                  ${isActive ? 'bg-' + track.color + '-500' : 'bg-gray-50 hover:bg-gray-100'}
                  ${currentStep === index ? 'ring-2 ring-blue-500' : ''}
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