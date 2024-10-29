import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, StopCircle, Save, Download } from 'lucide-react';
import { toast } from "sonner";

const TransportControls = ({ isPlaying, onPlayPause, onStop }) => {
  const handleSave = () => {
    toast("Project saved successfully");
  };

  const handleExport = () => {
    toast("Exporting project...");
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold text-white">Studio</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="w-8 h-8" onClick={handleSave}>
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="w-8 h-8" onClick={handleExport}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" size="icon" onClick={onPlayPause} className="w-12 h-12">
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        <Button variant="outline" size="icon" onClick={onStop} className="w-12 h-12">
          <StopCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default TransportControls;