'use client';

import { StoryList } from '../components/StoryList';

export default function FollowingStoriesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Following Stories</h1>
      <StoryList following={true} />
    </div>
  );
}
