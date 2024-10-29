import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Settings2, Mic, RotateCcw, Save, Download } from 'lucide-react';
import { toast } from "sonner";
import * as Tone from 'tone';

const ControlBar = ({ 
  isPlaying, 
  onPlayPause, 
  tempo,
  onTempoChange,
  onReset
}) => {
  const handleMicClick = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      toast.success("Microphone connected!");
    } catch (error) {
      toast.error("Could not access microphone");
    }
  };

  const handleSettingsClick = () => {
    toast("Settings panel coming soon!");
  };

  const handleResetClick = () => {
    onReset();
    toast("Pattern reset!");
  };

  const handleSaveClick = async () => {
    try {
      const recorder = new Tone.Recorder();
      const synth = new Tone.PolySynth().connect(recorder);
      
      await recorder.start();
      toast("Recording started...");
      
      // Record for one full pattern loop
      await new Promise(resolve => setTimeout(resolve, (60 / Tone.Transport.bpm.value) * 1000 * 32));
      
      const recording = await recorder.stop();
      const url = URL.createObjectURL(recording);
      const link = document.createElement("a");
      link.download = "music-lab-composition.mp3";
      link.href = url;
      link.click();
      
      toast.success("Song saved as MP3!");
    } catch (error) {
      console.error('Error saving audio:', error);
      toast.error("Failed to save audio");
    }
  };

  const handleDownloadClick = () => {
    try {
      const pattern = {
        tempo: tempo,
        transport: Tone.Transport.state,
        timeSignature: Tone.Transport.timeSignature,
      };
      
      const dataStr = JSON.stringify(pattern);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const link = document.createElement('a');
      link.setAttribute('href', dataUri);
      link.setAttribute('download', 'music-pattern.json');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Pattern downloaded!");
    } catch (error) {
      toast.error("Failed to download pattern");
    }
  };

  return (
    <div className="flex items-center justify-between w-full px-6 py-4 bg-gray-800 border-t border-gray-700">
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

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handleMicClick}>
          <Mic className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleSettingsClick}>
          <Settings2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleResetClick}>
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleSaveClick}>
          <Save className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleDownloadClick}>
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ControlBar;