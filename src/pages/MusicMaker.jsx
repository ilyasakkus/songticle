import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { toast } from "sonner";
import GridTimeline from '../components/music/GridTimeline';
import ControlBar from '../components/music/ControlBar';

const MusicMaker = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [currentStep, setCurrentStep] = useState(null);
  const [tracks, setTracks] = useState([
    { 
      id: 1, 
      name: 'Drums', 
      pattern: Array(32).fill(false), 
      color: 'yellow',
      volume: 75, 
      pan: 0 
    },
    { 
      id: 2, 
      name: 'Bass', 
      pattern: Array(32).fill(false), 
      color: 'orange',
      volume: 80, 
      pan: 0 
    },
    { 
      id: 3, 
      name: 'Lead', 
      pattern: Array(32).fill(false), 
      color: 'red',
      volume: 70, 
      pan: 0 
    }
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
      
      synth.connect(channel);
      nodes[track.id] = { synth, channel };
    });

    setAudioNodes(nodes);

    // Set up sequencer
    const seq = new Tone.Sequence((time, step) => {
      setCurrentStep(step);
      tracks.forEach(track => {
        if (track.pattern[step] && nodes[track.id]) {
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
      setCurrentStep(null);
      toast("Playback stopped");
    }
    setIsPlaying(!isPlaying);
  };

  const handleTempoChange = ([newTempo]) => {
    setTempo(newTempo);
    Tone.Transport.bpm.value = newTempo;
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
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <h1 className="text-2xl font-bold">SONG MAKER</h1>
      </header>

      <GridTimeline 
        tracks={tracks}
        onToggleStep={toggleStep}
        currentStep={currentStep}
      />

      <ControlBar 
        isPlaying={isPlaying}
        onPlayPause={togglePlay}
        tempo={tempo}
        onTempoChange={handleTempoChange}
      />
    </div>
  );
};

export default MusicMaker;