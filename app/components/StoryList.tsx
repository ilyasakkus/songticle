'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface Story {
  id: string;
  title: string;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string;
  };
  _count: {
    comments: number;
  };
  tags: string[];
}

interface StoryListProps {
  following?: boolean;
}

export function StoryList({ following = false }: StoryListProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('Latest');

  useEffect(() => {
    async function fetchStories() {
      try {
        let query = supabase
          .from('stories')
          .select(`
            *,
            profiles:user_id(*),
            _count { comments }
          `)
          .order('created_at', { ascending: false });

        if (following) {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('Not authenticated');

          const { data: followingData } = await supabase
            .from('follows')
            .select('following_id')
            .eq('follower_id', user.id);

          const followingIds = followingData?.map(f => f.following_id) || [];
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
            <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {['Latest', 'Top', 'Solved'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={cn(
                "px-3 py-1 rounded-md text-sm font-medium",
                selectedFilter === filter
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex items-start space-x-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex-shrink-0">
              <Image
                src={story.profiles?.avatar_url || "/placeholder-avatar.png"}
                alt={story.profiles?.username || "User"}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {story.title}
                </h3>
                <div className="flex items-center space-x-2">
                  {story.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    >
                      {tag}
                    </span>
                  ))}
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">{story._count?.comments || 0}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                <span>{story.profiles?.username}</span>
                <span className="mx-2">•</span>
                <span>{formatDistanceToNow(new Date(story.created_at), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
