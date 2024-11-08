import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw } from 'lucide-react';
import { toast } from "sonner";

const ControlBar = ({ 
  isPlaying, 
  onPlayPause, 
  tempo,
  onTempoChange,
  onReset
}) => {
  const handleResetClick = () => {
    onReset();
    toast("Pattern reset!");
  };

  return (
    <div className="flex items-center justify-between w-full px-6 py-4 bg-gray-800 border-t border-gray-700">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full"
            onClick={onPlayPause}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          
          <Button variant="outline" size="icon" className="w-12 h-12 rounded-full" onClick={handleResetClick}>
            <RotateCcw className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="flex items-center gap-4 ml-8">
          <span className="text-sm font-medium text-white">Tempo</span>
          <Slider
            value={[tempo]}
            onValueChange={onTempoChange}
            max={200}
            min={60}
            step={1}
            className="w-48"
          />
          <span className="text-sm font-medium text-white w-12">{tempo}</span>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;