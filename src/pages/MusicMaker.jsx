import React, { useState, useEffect, useCallback } from 'react';
import * as Tone from 'tone';
import { toast } from "sonner";
import GridTimeline from '../components/music/GridTimeline';
import ControlBar from '../components/music/ControlBar';
import InstrumentSelector from '../components/music/InstrumentSelector';

const MusicMaker = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [currentStep, setCurrentStep] = useState(null);
  const [selectedInstrument, setSelectedInstrument] = useState('synth');
  const [tracks, setTracks] = useState([
    { 
      id: 1,
      name: 'Main',
      pattern: Array(32).fill().map(() => Array(32).fill(false)),
      instrument: 'synth',
      volume: 75,
      pan: 0
    }
  ]);

  // Initialize instruments
  useEffect(() => {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const marimba = new Tone.Sampler({
      urls: {
        C4: "/sounds/marimba-c4.mp3",
        G4: "/sounds/marimba-g4.mp3",
      },
      release: 1,
    }).toDestination();
    
    return () => {
      synth.dispose();
      marimba.dispose();
    };
  }, []);

  // Set up sequencer
  useEffect(() => {
    const seq = new Tone.Sequence((time, step) => {
      setCurrentStep(step);
      
      tracks[0].pattern.forEach((row, rowIndex) => {
        if (row[step]) {
          const note = Tone.Frequency(440 * Math.pow(2, (rowIndex - 20) / 12), "hz").toNote();
          
          if (selectedInstrument === 'synth') {
            const synth = new Tone.Synth().toDestination();
            synth.triggerAttackRelease(note, "8n", time);
            setTimeout(() => synth.dispose(), 1000);
          } else if (selectedInstrument === 'marimba') {
            const marimba = new Tone.Sampler({
              urls: {
                C4: "/sounds/marimba-c4.mp3",
                G4: "/sounds/marimba-g4.mp3",
              }
            }).toDestination();
            marimba.triggerAttackRelease(note, "8n", time);
            setTimeout(() => marimba.dispose(), 1000);
          }
        }
      });
    }, Array.from({ length: 32 }, (_, i) => i), "8n");

    Tone.Transport.bpm.value = tempo;
    seq.start(0);

    return () => {
      seq.dispose();
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, [tracks, tempo, selectedInstrument]);

  const togglePlay = async () => {
    try {
      await Tone.start();
      
      if (!isPlaying) {
        Tone.Transport.start();
        toast.success("Playback started");
      } else {
        Tone.Transport.stop();
        setCurrentStep(null);
        toast.info("Playback stopped");
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      toast.error("Failed to start audio playback");
      console.error(error);
    }
  };

  const handleTempoChange = useCallback(([newTempo]) => {
    setTempo(newTempo);
    Tone.Transport.bpm.value = newTempo;
  }, []);

  const toggleStep = useCallback((row, col) => {
    setTracks(tracks => tracks.map(track => ({
      ...track,
      pattern: track.pattern.map((r, rowIndex) => 
        rowIndex === row 
          ? r.map((cell, colIndex) => colIndex === col ? !cell : cell)
          : r
      )
    })));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <header className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">MUSIC LAB</h1>
        <InstrumentSelector 
          selectedInstrument={selectedInstrument} 
          onSelect={setSelectedInstrument} 
        />
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