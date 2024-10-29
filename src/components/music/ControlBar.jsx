import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Settings2, Mic, RotateCcw, Save } from 'lucide-react';

const ControlBar = ({ 
  isPlaying, 
  onPlayPause, 
  tempo,
  onTempoChange 
}) => {
  return (
    <div className="flex items-center justify-between w-full px-6 py-4 bg-white border-t">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full"
          onClick={onPlayPause}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        
        <div className="flex items-center gap-4 ml-8">
          <span className="text-sm font-medium">Tempo</span>
          <Slider
            value={[tempo]}
            onValueChange={onTempoChange}
            max={200}
            min={60}
            step={1}
            className="w-48"
          />
          <span className="text-sm font-medium w-12">{tempo}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon">
          <Mic className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Settings2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Save className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ControlBar;