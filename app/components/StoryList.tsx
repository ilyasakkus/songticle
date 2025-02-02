'use client';

import { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { useStories } from '../hooks/useSupabaseData';
import { useAuth } from '../providers/AuthProvider';
import Link from 'next/link';
import { slugify } from '../lib/utils';

interface StoryListProps {
  following?: boolean
}

export function StoryList({ following = false }: StoryListProps) {
  const { user } = useAuth();
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

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    if (!user) {
      const signInModal = document.getElementById('sign-in-modal') as HTMLDialogElement;
      if (signInModal) {
        signInModal.showModal();
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
          const songTitle = story.songs?.title || 'untitled'
          const slug = slugify(songTitle)
          
          console.log('Story data:', {
            id: story.id,
            songId: story.songs?.id,
            previewUrl: story.songs?.preview_url,
            coverImage: story.songs?.cover_image
          });
          
          return (
            <Link 
              key={story.id} 
              href={`/story/${story.id}/${slug}`}
              className="block"
            >
              <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  {/* Header: Album Cover + Title + Artist */}
                  <div className="flex gap-4">
                    {/* Album Cover */}
                    <div className="flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
                      {story.songs?.cover_image ? (
                        <img
                          src={story.songs.cover_image}
                          alt={story.songs.title || 'Album cover'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
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

                    {/* Title, Artist, and Meta Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base line-clamp-1">
                        {story.songs?.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {story.songs?.artists?.name}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs text-gray-500">
                        <span className="line-clamp-1">By {story.author?.full_name || 'Anonymous'}</span>
                        <span className="hidden md:inline">•</span>
                        <span>{new Date(story.created_at!).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-start gap-1 ml-2">
                      <button 
                        className="btn btn-ghost btn-sm btn-square"
                        onClick={(e) => handleLikeClick(e)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                      </button>
                      <button className="btn btn-ghost btn-sm btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                      </button>
                    </div>
                  </div>

                  {/* Story Content */}
                  <p className="text-sm mt-3 line-clamp-2 text-gray-600">
                    {story.content}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
