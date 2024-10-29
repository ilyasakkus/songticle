import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Pause,
  StopCircle,
  Volume2,
  Music,
  Waveform,
  Mic,
  Settings2,
  Save,
  Download
} from 'lucide-react';
import { toast } from "sonner";

const MusicMaker = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [volume, setVolume] = useState(0);
  const [tracks, setTracks] = useState([
    { id: 1, name: 'Vocals', pattern: Array(32).fill(false), volume: 75, pan: 0, effects: { reverb: 30, delay: 20 } },
    { id: 2, name: 'Drums', pattern: Array(32).fill(false), volume: 80, pan: 0, effects: { reverb: 10, delay: 0 } },
    { id: 3, name: 'Bass', pattern: Array(32).fill(false), volume: 70, pan: -20, effects: { reverb: 5, delay: 0 } },
    { id: 4, name: 'Lead', pattern: Array(32).fill(false), volume: 65, pan: 20, effects: { reverb: 40, delay: 30 } },
    { id: 5, name: 'Pads', pattern: Array(32).fill(false), volume: 60, pan: 0, effects: { reverb: 60, delay: 40 } },
  ]);

  useEffect(() => {
    const synth = new Tone.PolySynth().toDestination();
    return () => {
      synth.dispose();
    };
  }, []);

  const togglePlay = async () => {
    if (!isPlaying) {
      await Tone.start();
      Tone.Transport.start();
      toast("Playback started");
    } else {
      Tone.Transport.stop();
      toast("Playback stopped");
    }
    setIsPlaying(!isPlaying);
  };

  const stopPlayback = () => {
    Tone.Transport.stop();
    setIsPlaying(false);
    toast("Playback stopped");
  };

  const toggleStep = (trackId, stepIndex) => {
    setTracks(tracks.map(track => {
      if (track.id === trackId) {
        const newPattern = [...track.pattern];
        newPattern[stepIndex] = !newPattern[stepIndex];
        return { ...track, pattern: newPattern };
      }
      return track;
    }));
  };

  const updateTrackVolume = (trackId, newVolume) => {
    setTracks(tracks.map(track => 
      track.id === trackId ? { ...track, volume: newVolume } : track
    ));
  };

  const updateTrackPan = (trackId, newPan) => {
    setTracks(tracks.map(track => 
      track.id === trackId ? { ...track, pan: newPan } : track
    ));
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-white">Studio</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="w-8 h-8">
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="w-8 h-8">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="icon" onClick={togglePlay} className="w-12 h-12">
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          <Button variant="outline" size="icon" onClick={stopPlayback} className="w-12 h-12">
            <StopCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="mixer" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="mixer" className="gap-2">
            <Settings2 className="h-4 w-4" /> Mixer
          </TabsTrigger>
          <TabsTrigger value="timeline" className="gap-2">
            <Waveform className="h-4 w-4" /> Timeline
          </TabsTrigger>
          <TabsTrigger value="effects" className="gap-2">
            <Music className="h-4 w-4" /> Effects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mixer" className="space-y-6">
          {tracks.map((track) => (
            <div key={track.id} className="flex items-center gap-6 bg-gray-800 p-4 rounded-lg">
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
                  onValueChange={([value]) => updateTrackVolume(track.id, value)}
                />
                <span className="text-white w-12">{track.volume}%</span>
                <span className="text-white">Pan</span>
                <Slider
                  defaultValue={[track.pan]}
                  min={-50}
                  max={50}
                  step={1}
                  className="w-32"
                  onValueChange={([value]) => updateTrackPan(track.id, value)}
                />
                <span className="text-white w-12">{track.pan}</span>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <Music className="text-white" />
            <Slider
              defaultValue={[tempo]}
              min={60}
              max={200}
              step={1}
              className="w-48"
              onValueChange={([value]) => setTempo(value)}
            />
            <span className="text-white">{tempo} BPM</span>
          </div>

          <div className="space-y-4">
            {tracks.map((track) => (
              <div key={track.id} className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
                <div className="w-24 text-white">{track.name}</div>
                <div className="grid grid-cols-32 gap-1 flex-grow">
                  {track.pattern.map((isActive, index) => (
                    <button
                      key={index}
                      onClick={() => toggleStep(track.id, index)}
                      className={`w-full aspect-square rounded ${
                        isActive ? 'bg-blue-500' : 'bg-gray-700'
                      } hover:bg-blue-400 transition-colors`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="effects" className="space-y-4">
          {tracks.map((track) => (
            <div key={track.id} className="bg-gray-800 p-4 rounded-lg space-y-4">
              <div className="text-white font-medium">{track.name}</div>
              <div className="flex items-center gap-4">
                <span className="text-white w-16">Reverb</span>
                <Slider
                  defaultValue={[track.effects.reverb]}
                  max={100}
                  step={1}
                  className="w-48"
                />
                <span className="text-white">{track.effects.reverb}%</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white w-16">Delay</span>
                <Slider
                  defaultValue={[track.effects.delay]}
                  max={100}
                  step={1}
                  className="w-48"
                />
                <span className="text-white">{track.effects.delay}%</span>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MusicMaker;