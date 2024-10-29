import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Volume2, Mic } from 'lucide-react';

const MixerTrack = ({ track, onVolumeChange, onPanChange }) => {
  return (
    <div className="flex items-center gap-6 bg-gray-800 p-4 rounded-lg">
      <div className="w-24 flex items-center gap-2">
        <Mic className="h-4 w-4 text-white" />
        <span className="text-white">{track.name}</span>
      </div>
      <div className="flex-1 flex items-center gap-4">
        <Volume2 className="h-4 w-4 text-white" />
        <Slider
          defaultValue={[track.volume]}
          max={100}
          step={1}
          className="w-48"
          onValueChange={([value]) => onVolumeChange(track.id, value)}
        />
        <span className="text-white w-12">{track.volume}%</span>
        <span className="text-white">Pan</span>
        <Slider
          defaultValue={[track.pan]}
          min={-50}
          max={50}
          step={1}
          className="w-32"
          onValueChange={([value]) => onPanChange(track.id, value)}
        />
        <span className="text-white w-12">{track.pan}</span>
      </div>
    </div>
  );
};

export default MixerTrack;