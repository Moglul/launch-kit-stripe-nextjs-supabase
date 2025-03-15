
import React, { useState, useRef } from 'react';
import { Mic, Play, StopCircle, Trash } from 'lucide-react';
import { toast } from '@/components/use-toast';

type VoiceNote = {
  id: string;
  blob: Blob;
  url: string;
  timestamp: Date;
  isPlaying: boolean;
};

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<BlobPart[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const currentlyPlayingRef = useRef<string | null>(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        setVoiceNotes(prev => [
          ...prev, 
          { 
            id: Date.now().toString(),
            blob: audioBlob,
            url: audioUrl,
            timestamp: new Date(),
            isPlaying: false
          }
        ]);
        
        audioChunks.current = [];
      };
      
      audioChunks.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Your voice note is now being recorded.",
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to record voice notes.",
        variant: "destructive",
      });
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      // Stop all tracks to release the microphone
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
      
      setIsRecording(false);
      
      toast({
        title: "Recording stopped",
        description: "Your voice note has been saved.",
      });
    }
  };

  const handlePlayVoiceNote = (id: string) => {
    // Stop currently playing audio if any
    if (audioPlayerRef.current && !audioPlayerRef.current.paused) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      
      // Update UI for previously playing note
      if (currentlyPlayingRef.current) {
        setVoiceNotes(prev => 
          prev.map(note => 
            note.id === currentlyPlayingRef.current 
              ? { ...note, isPlaying: false } 
              : note
          )
        );
      }
    }
    
    const noteToPlay = voiceNotes.find(note => note.id === id);
    if (!noteToPlay) return;

    // Create new audio element
    const audio = new Audio(noteToPlay.url);
    audioPlayerRef.current = audio;
    currentlyPlayingRef.current = id;
    
    // Update UI
    setVoiceNotes(prev => 
      prev.map(note => 
        note.id === id ? { ...note, isPlaying: true } : note
      )
    );
    
    // Play audio
    audio.play();
    
    // When audio ends
    audio.onended = () => {
      currentlyPlayingRef.current = null;
      setVoiceNotes(prev => 
        prev.map(note => 
          note.id === id ? { ...note, isPlaying: false } : note
        )
      );
    };
  };

  const handleDeleteVoiceNote = (id: string) => {
    // If deleting currently playing note, stop it first
    if (currentlyPlayingRef.current === id && audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      currentlyPlayingRef.current = null;
    }
    
    // Remove the note
    setVoiceNotes(prev => prev.filter(note => note.id !== id));
    
    toast({
      title: "Voice note deleted",
      description: "Your voice note has been removed.",
    });
  };

  return (
    <div>
      <div className="mb-4">
        {isRecording ? (
          <button
            onClick={handleStopRecording}
            className="w-full flex items-center justify-center py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors"
          >
            <StopCircle className="mr-2 h-5 w-5" />
            Stop Recording
          </button>
        ) : (
          <button
            onClick={handleStartRecording}
            className="w-full flex items-center justify-center py-3 bg-primary/10 text-primary rounded-md font-medium hover:bg-primary/20 transition-colors"
          >
            <Mic className="mr-2 h-5 w-5" />
            Start Recording
          </button>
        )}
      </div>
      
      {isRecording && (
        <div className="flex justify-center items-center mb-4">
          <div className="pulse h-3 w-3 rounded-full bg-red-600 mr-3"></div>
          <p className="text-sm text-construction-700">Recording in progress...</p>
        </div>
      )}
      
      <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
        {voiceNotes.length === 0 ? (
          <p className="text-sm text-center text-construction-500 italic">
            No voice notes recorded yet
          </p>
        ) : (
          voiceNotes.map((note) => (
            <div 
              key={note.id} 
              className="flex items-center justify-between p-3 bg-construction-50 rounded-md"
            >
              <div className="flex items-center">
                <button 
                  onClick={() => handlePlayVoiceNote(note.id)}
                  className={`p-1 rounded-full ${note.isPlaying ? 'bg-primary text-white' : 'bg-construction-200 text-construction-700'}`}
                >
                  <Play className="h-4 w-4" />
                </button>
                <div className="ml-3">
                  <p className="text-xs text-construction-800 font-medium">
                    Voice Note
                  </p>
                  <p className="text-xs text-construction-500">
                    {note.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => handleDeleteVoiceNote(note.id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;
