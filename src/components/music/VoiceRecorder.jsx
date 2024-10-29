import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic } from 'lucide-react';
import { toast } from "sonner";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        // Here you would typically send the audio data for processing
        toast("Recording completed!");
        audioChunks.current = [];
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      toast("Recording started...");
    } catch (error) {
      toast.error("Could not access microphone");
      console.error(error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
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