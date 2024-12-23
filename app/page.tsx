'use client';

import { StoryList } from './components/StoryList';

export default function HomePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 dark:text-white">All Stories</h2>
      <StoryList following={false} />
    </div>
  );
}
