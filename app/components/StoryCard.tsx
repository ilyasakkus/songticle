'use client';

import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ThumbsUp, MessageCircle, Music } from 'lucide-react';

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    content: string;
    created_at: string;
    profiles: {
      username: string;
      avatar_url: string;
    };
    songs: {
      title: string;
    };
    likes: {
      count: number;
    };
    comments: {
      count: number;
    };
  };
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src={story.profiles?.avatar_url || "/placeholder-avatar.png"}
                alt={story.profiles?.username}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">{story.title}</h3>
              <p className="text-sm text-muted-foreground">
                by {story.profiles?.username} •{' '}
                {formatDistanceToNow(new Date(story.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4">{story.content}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ThumbsUp className="h-4 w-4" />
              {story.likes?.count || 0}
            </button>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <MessageCircle className="h-4 w-4" />
              {story.comments?.count || 0}
            </button>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Music className="h-4 w-4" />
            {story.songs?.title}
          </div>
        </div>
      </div>
    </div>
  );
}
