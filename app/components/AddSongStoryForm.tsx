'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '../lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { supabase } from '../lib/supabase';

const formSchema = z.object({
  songId: z.string({
    required_error: "Please select a song.",
  }),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Story must be at least 10 characters long"),
});

type Song = {
  id: number;
  title: string;
  artist_name: string;
  album_title: string;
};

export function AddSongStoryForm() {
  const [open, setOpen] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const searchSongs = async (value: string) => {
    if (!value) return;
    
    setLoading(true);
    try {
      // Get all songs matching the search term
      const { data: songsData, error: songsError } = await supabase
        .from('songs')
        .select('id, title, album_id');

      if (songsError) {
        console.error('Error fetching songs:', songsError);
        return;
      }

      // Get all albums for the matching songs
      const albumIds = songsData.map(song => song.album_id);
      const { data: albumsData, error: albumsError } = await supabase
        .from('albums')
        .select('id, title, artist_id')
        .in('id', albumIds);

      if (albumsError) {
        console.error('Error fetching albums:', albumsError);
        return;
      }

      // Get all artists for the albums
      const artistIds = albumsData.map(album => album.artist_id);
      const { data: artistsData, error: artistsError } = await supabase
        .from('artists')
        .select('id, name')
        .in('id', artistIds);

      if (artistsError) {
        console.error('Error fetching artists:', artistsError);
        return;
      }

      // Create a map for quick lookups
      const albumMap = new Map(albumsData.map(album => [album.id, album]));
      const artistMap = new Map(artistsData.map(artist => [artist.id, artist]));

      // Format the songs with album and artist information
      const formattedSongs = songsData
        .filter(song => song.title.toLowerCase().includes(value.toLowerCase()))
        .map(song => {
          const album = albumMap.get(song.album_id);
          const artist = album ? artistMap.get(album.artist_id) : null;
          return {
            id: song.id,
            title: song.title,
            album_title: album?.title || 'Unknown Album',
            artist_name: artist?.name || 'Unknown Artist',
          };
        });

      setSongs(formattedSongs);
    } catch (error) {
      console.error('Error searching songs:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('stories')
        .insert({
          title: values.title,
          content: values.content,
          song_id: values.songId,
          user_id: user.id,
        });

      if (error) throw error;

      // Reset form and show success message
      form.reset();
      // You might want to add a toast notification here
    } catch (error) {
      console.error('Error creating story:', error);
      // You might want to add an error toast notification here
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Add Song Story</h2>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Song
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {form.watch("songId") 
                  ? songs.find((song) => song.id === parseInt(form.watch("songId")))?.title
                  : "Select song..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput 
                  placeholder="Search songs..." 
                  value={searchValue}
                  onValueChange={(value) => {
                    setSearchValue(value);
                    searchSongs(value);
                  }}
                />
                {loading ? (
                  <div className="py-6 text-center text-sm">Loading...</div>
                ) : songs.length === 0 ? (
                  <CommandEmpty>No songs found.</CommandEmpty>
                ) : (
                  <CommandGroup>
                    {songs.map((song) => (
                      <CommandItem
                        key={song.id}
                        value={song.id.toString()}
                        onSelect={(value) => {
                          form.setValue("songId", value);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            form.watch("songId") === song.id.toString() ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {song.title} - {song.artist_name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </Command>
            </PopoverContent>
          </Popover>
          {form.formState.errors.songId && (
            <p className="text-sm text-red-500">{form.formState.errors.songId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Title
          </label>
          <Input
            {...form.register("title")}
            placeholder="Enter your story title"
            className="w-full"
          />
          {form.formState.errors.title && (
            <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Your Story
          </label>
          <Textarea
            {...form.register("content")}
            placeholder="Share your thoughts about this song..."
            className="w-full min-h-[200px]"
          />
          {form.formState.errors.content && (
            <p className="text-sm text-red-500">{form.formState.errors.content.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Post Story
        </Button>
      </form>
    </div>
  );
}
