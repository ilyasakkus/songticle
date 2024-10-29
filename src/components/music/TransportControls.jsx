import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Play, Pause, StopCircle, Save, Download } from 'lucide-react';
import { toast } from "sonner";
import * as Tone from 'tone';

const TransportControls = ({ isPlaying, onPlayPause, onStop }) => {
  const handleSave = async () => {
    try {
      // Start recording
      const recorder = new Tone.Recorder();
      const synth = new Tone.PolySynth().connect(recorder);
      
      // Record for the duration of one pattern loop
      await recorder.start();
      toast("Recording started...");
      
      // Wait for one full pattern loop
      await new Promise(resolve => setTimeout(resolve, (60 / Tone.Transport.bpm.value) * 1000 * 32));
      
      // Stop the recording
      const recording = await recorder.stop();
      
      // Create a download link
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

  const handleExport = () => {
    toast("Exporting project...");
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-3xl font-bold text-white hover:text-gray-200 transition-colors">
          Music Lab
        </Link>
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