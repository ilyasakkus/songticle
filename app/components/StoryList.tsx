'use client';

import { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { useStories } from '../hooks/useSupabaseData';

interface Story {
  id: number
  content: string
  created_at: string
  song_id: number
  author_name?: string
  comments: number
  songs?: {
    id: number
    title: string
    artist_id: number
    artist_name?: string
    cover_image?: string | null
    preview_url?: string | null
  } | null
}

export function StoryList() {
  const { stories, loading, error } = useStories();
  const [playingSongId, setPlayingSongId] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handlePlayPause = (songId: number, previewUrl: string) => {
    if (playingSongId === songId) {
      // Pause current song
      audio?.pause();
      setPlayingSongId(null);
      setAudio(null);
    } else {
      // Stop current song if any
      audio?.pause();
      
      // Play new song
      const newAudio = new Audio(previewUrl);
      newAudio.play();
      setPlayingSongId(songId);
      setAudio(newAudio);
      
      // Handle song end
      newAudio.onended = () => {
        setPlayingSongId(null);
        setAudio(null);
      };
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
        {stories.map((story) => (
          <div key={story.id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-row items-center p-2">
              {/* Album Cover Thumbnail */}
              <div className="flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden">
                <img
                  src={story.songs?.cover_image || '/placeholder-album.jpg'}
                  alt={story.songs?.title || 'Album cover'}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="flex-1 ml-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm line-clamp-1">
                      {story.songs?.title}
                    </h3>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <span>{story.songs?.artist_name}</span>
                      <span>•</span>
                      <span>Shared by {story.profiles?.full_name || 'Anonymous'}</span>
                      <span>•</span>
                      <span>{new Date(story.created_at!).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="btn btn-ghost btn-sm flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                      <span className="text-sm">Add comment</span>
                      {story.comments > 0 && (
                        <span className="text-xs bg-base-200 px-2 py-0.5 rounded-full">
                          {story.comments}
                        </span>
                      )}
                    </button>
                    <button className="btn btn-ghost btn-sm flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                      <span className="text-sm">Like</span>
                      {story.likes > 0 && (
                        <span className="text-xs bg-base-200 px-2 py-0.5 rounded-full">
                          {story.likes}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
                
                <p className="text-sm mt-1 line-clamp-2 text-gray-600">{story.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
