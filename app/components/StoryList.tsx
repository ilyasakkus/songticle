'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { Story, Song } from '../types/database.types';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';

interface StoryWithSong extends Story {
  song?: Song;
}

export function StoryList() {
  const [stories, setStories] = useState<StoryWithSong[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingSongId, setPlayingSongId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = (songId: number, previewUrl: string) => {
    if (playingSongId === songId) {
      // If clicking the currently playing song, pause it
      audioRef.current?.pause();
      setPlayingSongId(null);
    } else {
      // If clicking a new song
      if (audioRef.current) {
        audioRef.current.pause();
      }
      // Create new audio element
      audioRef.current = new Audio(previewUrl);
      audioRef.current.play();
      setPlayingSongId(songId);

      // Add ended event listener
      audioRef.current.addEventListener('ended', () => {
        setPlayingSongId(null);
      });
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        setError(null);

        // First get stories
        const { data: storiesData, error: storiesError } = await supabase
          .from('stories')
          .select('*')
          .order('created_at', { ascending: false });

        if (storiesError) {
          console.error('Error fetching stories:', storiesError);
          setError(storiesError.message);
          return;
        }

        if (!storiesData) {
          setStories([]);
          return;
        }

        // Then get profiles and songs for each story
        const storiesWithDetails = await Promise.all(
          storiesData.map(async (story) => {
            const [profileResult, songResult, commentsResult] = await Promise.all([
              // Get profile if user_id exists
              story.user_id ? supabase
                .from('profiles')
                .select('*')
                .eq('id', story.user_id)
                .single() : Promise.resolve({ data: null }),
              
              // Get song details
              supabase
                .from('songs')
                .select('*')
                .eq('id', story.song_id)
                .single(),
              
              // Get comment count
              supabase
                .from('story_comments')
                .select('*', { count: 'exact', head: true })
                .eq('story_id', story.id)
            ]);

            return {
              ...story,
              profiles: profileResult.data,
              song: songResult.data,
              comments: commentsResult.count || 0
            };
          })
        );

        setStories(storiesWithDetails);
      } catch (err) {
        console.error('Error in fetchStories:', err);
        setError(err instanceof Error ? err.message : 'Failed to load stories');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();

    // Set up real-time subscription
    const channel = supabase
      .channel('stories_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'stories'
        },
        () => {
          fetchStories();
        }
      )
      .subscribe();

    return () => {
      // Cleanup audio on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      channel.unsubscribe();
    };
  }, []);

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
      <div className="space-y-4">
        {stories.map((story) => (
          <div key={story.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-start gap-4">
                {/* Song Info */}
                {story.song?.album_cover && (
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={story.song.album_cover}
                      alt={story.song.title}
                      fill
                      className="rounded-lg object-cover"
                    />
                    {story.song.preview_url && (
                      <button
                        onClick={() => handlePlayPause(story.song!.id, story.song!.preview_url!)}
                        className="btn btn-circle btn-sm absolute bottom-1 right-1 bg-base-100/80 hover:bg-base-100"
                      >
                        {playingSongId === story.song.id ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                )}

                <div className="flex-1">
                  {/* Song & Author Info */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="card-title text-lg">
                        {story.song?.title}
                        <div className="badge badge-accent">{story.song?.artist}</div>
                      </h3>
                      <p className="text-sm opacity-70">
                        Shared by {story.author_name || 'Anonymous'}
                      </p>
                    </div>
                    <div className="text-sm opacity-50">
                      {new Date(story.created_at!).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="divider my-2"></div>
                  <p className="whitespace-pre-wrap">{story.content}</p>

                  {/* Actions */}
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-ghost btn-sm gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                      {story.comments} Comments
                    </button>
                    <button className="btn btn-ghost btn-sm gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                      Like
                    </button>
                    <button className="btn btn-ghost btn-sm gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
