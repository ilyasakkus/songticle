'use client';

import { Search, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { ModeToggle } from './ModeToggle';

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-4">
            <h1 className="text-xl font-bold">Songticle</h1>
            <div className="max-w-md flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search stories..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-md border bg-background"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Song Story
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
