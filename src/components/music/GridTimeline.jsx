import React, { useState, useCallback } from 'react';
import * as Tone from 'tone';

const GridTimeline = ({ tracks, onToggleStep, currentStep }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  const notes = [
    'C4', 'B3', 'A#3', 'A3', 'G#3', 'G3', 'F#3', 'F3', 'E3', 'D#3', 'D3', 'C#3',
    'C3', 'B2', 'A#2', 'A2', 'G#2', 'G2', 'F#2', 'F2', 'E2', 'D#2', 'D2', 'C#2',
    'C2', 'B1', 'A#1', 'A1', 'G#1', 'G1', 'F#1', 'F1'
  ];

  const softColors = [
    'bg-rose-200', 'bg-pink-200', 'bg-fuchsia-200', 'bg-purple-200', 'bg-violet-200',
    'bg-indigo-200', 'bg-blue-200', 'bg-sky-200', 'bg-cyan-200', 'bg-teal-200',
    'bg-emerald-200', 'bg-green-200', 'bg-lime-200', 'bg-yellow-200', 'bg-amber-200',
    'bg-orange-200', 'bg-red-200', 'bg-slate-200', 'bg-gray-200', 'bg-zinc-200',
    'bg-neutral-200', 'bg-stone-200', 'bg-red-100', 'bg-orange-100', 'bg-amber-100',
    'bg-yellow-100', 'bg-lime-100', 'bg-green-100', 'bg-emerald-100', 'bg-teal-100',
    'bg-cyan-100', 'bg-sky-100'
  ];

  const playPreviewSound = async (note) => {
    try {
      await Tone.start();
      const synth = new Tone.Synth().toDestination();
      synth.triggerAttackRelease(note, "8n");
      setTimeout(() => synth.dispose(), 1000);
    } catch (error) {
      console.error('Failed to play preview sound:', error);
    }
  };

  const handleMouseDown = (row, col) => {
    setIsMouseDown(true);
    handleStepClick(row, col);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseEnter = (row, col) => {
    if (isMouseDown) {
      handleStepClick(row, col);
    }
  };

  const handleStepClick = (row, col) => {
    onToggleStep(row, col);
    playPreviewSound(notes[row]);
  };

  return (
    <div 
      className="flex-1 overflow-auto bg-white p-2 sm:p-4"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="relative w-fit mx-auto min-w-full sm:min-w-0">
        {currentStep !== null && (
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-blue-500 transition-transform duration-100 ease-linear"
            style={{ 
              left: `${(currentStep * 24) + 12}px`,
              transform: 'translateX(-50%)',
              zIndex: 10
            }}
          />
        )}
        
        <div className="grid grid-cols-32 gap-0 border-2 border-gray-300">
          {Array.from({ length: 32 }, (_, row) => (
            Array.from({ length: 32 }, (_, col) => (
              <button
                key={`${row}-${col}`}
                onMouseDown={() => handleMouseDown(row, col)}
                onMouseEnter={() => handleMouseEnter(row, col)}
                className={`
                  w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] border border-gray-200 transition-colors
                  ${tracks[0].pattern[row]?.[col] ? softColors[row] : 'bg-gray-50 hover:bg-gray-100'}
                  ${currentStep === col ? 'relative' : ''}
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