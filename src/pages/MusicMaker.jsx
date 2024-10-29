import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings2, Music, AudioWaveform } from 'lucide-react';
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
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

  const [audioNodes, setAudioNodes] = useState({});

  // Initialize Tone.js
  useEffect(() => {
    // Create synths for each track
    const nodes = {};
    tracks.forEach(track => {
      const synth = new Tone.Synth().toDestination();
      const channel = new Tone.Channel({
        volume: track.volume - 75,
        pan: track.pan / 50
      }).toDestination();
      
      const reverb = new Tone.Reverb({
        decay: track.effects.reverb / 25,
        wet: track.effects.reverb / 100
      }).connect(channel);
      
      const delay = new Tone.FeedbackDelay({
        delayTime: "8n",
        feedback: track.effects.delay / 100
      }).connect(reverb);

      synth.connect(delay);
      nodes[track.id] = { synth, channel, reverb, delay };
    });

    setAudioNodes(nodes);

    // Set up sequencer
    const seq = new Tone.Sequence((time, step) => {
      tracks.forEach(track => {
        if (track.pattern[step] && nodes[track.id]) {
          // Play different notes for different tracks
          let note;
          switch(track.name) {
            case 'Drums':
              nodes[track.id].synth.triggerAttackRelease("C2", "8n", time);
              break;
            case 'Bass':
              nodes[track.id].synth.triggerAttackRelease("G2", "8n", time);
              break;
            case 'Lead':
              nodes[track.id].synth.triggerAttackRelease("C4", "8n", time);
              break;
            case 'Vocals':
              nodes[track.id].synth.triggerAttackRelease("E4", "8n", time);
              break;
          }
        }
      });
    }, Array.from({ length: 32 }, (_, i) => i), "8n");

    seq.start(0);

    return () => {
      seq.dispose();
      Object.values(nodes).forEach(node => {
        node.synth.dispose();
        node.channel.dispose();
        node.reverb.dispose();
        node.delay.dispose();
      });
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, []);

  const togglePlay = async () => {
    await Tone.start();
    if (!isPlaying) {
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
    setTracks(tracks.map(track => {
      if (track.id === trackId) {
        if (audioNodes[trackId]) {
          audioNodes[trackId].channel.volume.value = newVolume - 75;
        }
        return { ...track, volume: newVolume };
      }
      return track;
    }));
  };

  const updateTrackPan = (trackId, newPan) => {
    setTracks(tracks.map(track => {
      if (track.id === trackId) {
        if (audioNodes[trackId]) {
          audioNodes[trackId].channel.pan.value = newPan / 50;
        }
        return { ...track, pan: newPan };
      }
      return track;
    }));
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