import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic } from 'lucide-react';
import { toast } from "sonner";
import * as Tone from 'tone';

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const recorder = useRef(null);

  useEffect(() => {
    // Initialize Tone.js recorder
    recorder.current = new Tone.Recorder();
    const mic = new Tone.UserMedia();
    
    mic.open().then(() => {
      mic.connect(recorder.current);
    }).catch(e => {
      console.error('Error accessing microphone:', e);
      toast.error("Could not access microphone");
    });

    return () => {
      if (recorder.current) {
        recorder.current.dispose();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      await Tone.start();
      recorder.current.start();
      setIsRecording(true);
      toast("Recording started...");
    } catch (error) {
      toast.error("Could not start recording");
      console.error(error);
    }
  };

  const stopRecording = async () => {
    if (isRecording) {
      const recording = await recorder.current.stop();
      const url = URL.createObjectURL(recording);
      
      // Create audio element to play back recording
      const audio = new Audio(url);
      audio.play();
      
      setIsRecording(false);
      toast("Recording completed!");
    }
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gray-800 rounded-lg mb-4">
      <Button
        variant={isRecording ? "destructive" : "default"}
        size="lg"
        onClick={isRecording ? stopRecording : startRecording}
        className="flex items-center gap-2"
      >
        <Mic className="h-5 w-5" />
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
    </div>
  );
};

export default VoiceRecorder;