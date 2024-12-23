'use client';

import { StoryList } from './components/StoryList';
import { Button } from './components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold dark:text-white">All Stories</h1>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <PlusCircle className="w-4 h-4 mr-2" />
          Start a Discussion
        </Button>
      </div>
      <StoryList following={false} />
    </div>
  );
}
