'use client';

import { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { useStories } from '../hooks/useSupabaseData';
import Image from 'next/image'
import { getTrackPreview } from '../lib/deezer';


export function StoryList() {
  const { stories, loading, error } = useStories();
  const [playingSongId, setPlayingSongId] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  console.log('Stories in StoryList:', JSON.stringify(stories, null, 2));

  const handlePlayPause = async (songId: number, previewUrl: string) => {
    console.log('Playing song:', { songId, previewUrl });
    
    if (playingSongId === songId) {
      // Pause current song
      console.log('Pausing current song');
      audio?.pause();
      setPlayingSongId(null);
      setAudio(null);
    } else {
      // Stop current song if any
      console.log('Stopping current song if any');
      audio?.pause();
      
      try {
        // Get fresh preview URL from Deezer
        const freshPreviewUrl = await getTrackPreview(songId);
        if (!freshPreviewUrl) {
          throw new Error('No preview URL available');
        }
        
        // Play new song
        console.log('Creating new audio with URL:', freshPreviewUrl);
        const newAudio = new Audio(freshPreviewUrl);
        
        // Add error handling for loading
        newAudio.onerror = () => {
          console.error('Audio loading error:', {
            error: newAudio.error,
            networkState: newAudio.networkState,
            readyState: newAudio.readyState,
            currentSrc: newAudio.currentSrc
          });
          setPlayingSongId(null);
          setAudio(null);
        };

        // Add loading event
        newAudio.onloadeddata = () => {
          console.log('Audio loaded successfully');
        };

        // Try to play
        await newAudio.play();
        setPlayingSongId(songId);
        setAudio(newAudio);
        
        // Handle song end
        newAudio.onended = () => {
          console.log('Song ended');
          setPlayingSongId(null);
          setAudio(null);
        };
      } catch (error) {
        console.error('Error playing audio:', error);
        setPlayingSongId(null);
        setAudio(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{error}</span>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>No stories found. Be the first to share your story!</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-2">
        {stories.map((story) => {
          console.log('Story data:', {
            id: story.id,
            songId: story.songs?.id,
            previewUrl: story.songs?.preview_url,
            coverImage: story.songs?.cover_image
          });
          
          return (
            <div key={story.id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-row items-center p-2">
                {/* Album Cover Thumbnail */}
                <div className="flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
                  {story.songs?.cover_image ? (
                    <Image
                      src={story.songs.cover_image}
                      alt={story.songs.title || 'Album cover'}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    </div>
                  )}
                  {story.songs?.preview_url && (
                    <button
                      onClick={() => handlePlayPause(story.songs!.id, story.songs!.preview_url!)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      {playingSongId === story.songs.id ? (
                        <Pause className="h-6 w-6 text-white" />
                      ) : (
                        <Play className="h-6 w-6 text-white" />
                      )}
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 ml-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-sm line-clamp-1">
                        {story.songs?.title}
                      </h3>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <span>{story.songs?.artists?.name}</span>
                        <span>•</span>
                        <span>Shared by {story.author?.full_name || 'Anonymous'}</span>
                        <span>•</span>
                        <span>{new Date(story.created_at!).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="btn btn-ghost btn-sm flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                        <span className="text-sm">Add comment</span>
                      </button>
                      <button className="btn btn-ghost btn-sm flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        <span className="text-sm">Like</span>
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm mt-1 line-clamp-2 text-gray-600">{story.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
