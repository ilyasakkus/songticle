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
      name: 'Main',
      pattern: Array(32).fill().map(() => Array(32).fill(false)),
      color: 'blue',
      volume: 75,
      pan: 0
    }
  ]);

  const [audioNodes, setAudioNodes] = useState({});

  const notes = [
    'C4', 'B3', 'A#3', 'A3', 'G#3', 'G3', 'F#3', 'F3', 'E3', 'D#3', 'D3', 'C#3',
    'C3', 'B2', 'A#2', 'A2', 'G#2', 'G2', 'F#2', 'F2', 'E2', 'D#2', 'D2', 'C#2',
    'C2', 'B1', 'A#1', 'A1', 'G#1', 'G1', 'F#1', 'F1'
  ];

  useEffect(() => {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    setAudioNodes({ synth });

    const seq = new Tone.Sequence((time, step) => {
      setCurrentStep(step);
      tracks[0].pattern.forEach((row, rowIndex) => {
        if (row[step]) {
          synth.triggerAttackRelease(notes[rowIndex], "8n", time);
        }
      });
    }, Array.from({ length: 32 }, (_, i) => i), "8n");

    seq.start(0);

    return () => {
      seq.dispose();
      synth.dispose();
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

  const toggleStep = (row, col) => {
    setTracks(tracks.map(track => ({
      ...track,
      pattern: track.pattern.map((r, rowIndex) => 
        rowIndex === row 
          ? r.map((cell, colIndex) => colIndex === col ? !cell : cell)
          : r
      )
    })));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <h1 className="text-2xl font-bold">INSTRUMENTAL CANVAS</h1>
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