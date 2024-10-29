import React from 'react';
import * as Tone from 'tone';

const GridTimeline = ({ tracks, onToggleStep, currentStep }) => {
  const notes = [
    'C4', 'B3', 'A#3', 'A3', 'G#3', 'G3', 'F#3', 'F3', 'E3', 'D#3', 'D3', 'C#3',
    'C3', 'B2', 'A#2', 'A2', 'G#2', 'G2', 'F#2', 'F2', 'E2', 'D#2', 'D2', 'C#2',
    'C2', 'B1', 'A#1', 'A1', 'G#1', 'G1', 'F#1', 'F1'
  ];

  const playPreviewSound = (note) => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, "8n");
  };

  const handleStepClick = (row, col) => {
    onToggleStep(row, col);
    playPreviewSound(notes[row]);
  };

  return (
    <div className="flex-1 overflow-auto bg-white p-4">
      <div className="relative">
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
        
        {/* 32x32 Grid */}
        <div className="grid grid-cols-32 gap-[1px] w-full" style={{ aspectRatio: '1/1' }}>
          {Array.from({ length: 32 }, (_, row) => (
            Array.from({ length: 32 }, (_, col) => (
              <button
                key={`${row}-${col}`}
                onClick={() => handleStepClick(row, col)}
                className={`
                  w-full h-full border border-gray-100 transition-colors
                  ${tracks[0].pattern[row]?.[col] ? 'bg-blue-500' : 'bg-gray-50 hover:bg-gray-100'}
                  ${currentStep === col ? 'ring-2 ring-blue-500' : ''}
                `}
              />
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridTimeline;