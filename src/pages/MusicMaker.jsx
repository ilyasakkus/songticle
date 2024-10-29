import React, { useState } from 'react';
import * as Tone from 'tone';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings2, Music, AudioWaveform } from 'lucide-react';
import { toast } from "sonner";
import TransportControls from '../components/music/TransportControls';
import MixerTrack from '../components/music/MixerTrack';
import VoiceRecorder from '../components/music/VoiceRecorder';

const MusicMaker = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState([
    { id: 1, name: 'Vocals', pattern: Array(32).fill(false), volume: 75, pan: 0, effects: { reverb: 30, delay: 20 } },
    { id: 2, name: 'Drums', pattern: Array(32).fill(false), volume: 80, pan: 0, effects: { reverb: 10, delay: 0 } },
    { id: 3, name: 'Bass', pattern: Array(32).fill(false), volume: 70, pan: -20, effects: { reverb: 5, delay: 0 } },
    { id: 4, name: 'Lead', pattern: Array(32).fill(false), volume: 65, pan: 20, effects: { reverb: 40, delay: 30 } },
  ]);

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
      <TransportControls 
        isPlaying={isPlaying}
        onPlayPause={togglePlay}
        onStop={stopPlayback}
      />

      <VoiceRecorder />

      <Tabs defaultValue="mixer" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="mixer" className="gap-2">
            <Settings2 className="h-4 w-4" /> Mixer
          </TabsTrigger>
          <TabsTrigger value="timeline" className="gap-2">
            <AudioWaveform className="h-4 w-4" /> Timeline
          </TabsTrigger>
          <TabsTrigger value="effects" className="gap-2">
            <Music className="h-4 w-4" /> Effects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mixer" className="space-y-6">
          {tracks.map((track) => (
            <MixerTrack
              key={track.id}
              track={track}
              onVolumeChange={updateTrackVolume}
              onPanChange={updateTrackPan}
            />
          ))}
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <div className="space-y-4">
            {tracks.map((track) => (
              <div key={track.id} className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
                <div className="w-24 text-white">{track.name}</div>
                <div className="grid grid-cols-32 gap-1 flex-grow">
                  {track.pattern.map((isActive, index) => (
                    <button
                      key={index}
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