'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { StoryCard } from './StoryCard';

interface StoryListProps {
  following?: boolean;
}

export function StoryList({ following = false }: StoryListProps) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStories() {
      try {
        let query = supabase
          .from('stories')
          .select('*, profiles(*), songs(*), likes(count), comments(count)')
          .order('created_at', { ascending: false });

        if (following) {
          // Get current user's ID
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('Not authenticated');

          // Get list of users that the current user follows
          const { data: followingData } = await supabase
            .from('follows')
            .select('following_id')
            .eq('follower_id', user.id);

          const followingIds = followingData?.map(f => f.following_id) || [];
          
          // Filter stories by followed users
          query = query.in('user_id', followingIds);
        }

        const { data, error: err } = await query;
        if (err) throw err;
        
        setStories(data);
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStories();
  }, [following]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 dark:text-red-400">
        Error loading stories: {error}
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          {following 
            ? "No stories from people you follow yet. Start following more people!"
            : "No stories yet. Be the first to share one!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}
