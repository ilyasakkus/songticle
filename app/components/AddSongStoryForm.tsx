'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
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

  // Load initial songs when component mounts
  useEffect(() => {
    searchSongs("");
  }, []);

  const searchSongs = async (value: string) => {
    setLoading(true);
    try {
      const { data: songsData, error: songsError } = await supabase
        .from('songs')
        .select(`
          id,
          title,
          album:album_id (
            id,
            title,
            artist:artist_id (
              id,
              name
            )
          )
        `)
        .ilike('title', `%${value}%`)
        .limit(20);

      if (songsError) {
        console.error('Error fetching songs:', songsError);
        return;
      }

      const formattedSongs = songsData.map(song => ({
        id: song.id,
        title: song.title,
        album_title: song.album?.title || 'Unknown Album',
        artist_name: song.album?.artist?.name || 'Unknown Artist',
      }));

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
          song_id: parseInt(values.songId),
          user_id: user.id,
        });

      if (error) throw error;

      // Reset form and show success message
      form.reset();
      setSearchValue("");
      // You might want to add a toast notification here
    } catch (error) {
      console.error('Error creating story:', error);
      // You might want to add an error toast notification here
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-serif font-bold mb-6 text-primary">Add Song Story</h2>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Song</span>
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "btn btn-outline w-full justify-between",
                  !form.watch("songId") && "text-muted-foreground"
                )}
              >
                {form.watch("songId") 
                  ? songs.find((song) => song.id === parseInt(form.watch("songId")))?.title
                  : "Select song..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <Command>
                <CommandInput 
                  placeholder="Search songs..." 
                  value={searchValue}
                  onValueChange={(value) => {
                    setSearchValue(value);
                    searchSongs(value);
                  }}
                  className="input input-bordered"
                />
                <CommandEmpty>No songs found.</CommandEmpty>
                <CommandGroup className="max-h-[300px] overflow-y-auto">
                  {loading ? (
                    <div className="p-4 text-center">
                      <span className="loading loading-spinner loading-md"></span>
                    </div>
                  ) : (
                    songs.map((song) => (
                      <CommandItem
                        key={song.id}
                        value={song.id.toString()}
                        onSelect={(value) => {
                          form.setValue("songId", value);
                          setOpen(false);
                        }}
                        className="hover:bg-base-200"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            form.watch("songId") === song.id.toString() ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div>
                          <div className="font-medium">{song.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {song.artist_name} • {song.album_title}
                          </div>
                        </div>
                      </CommandItem>
                    ))
                  )}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {form.formState.errors.songId && (
            <label className="label">
              <span className="label-text-alt text-error">{form.formState.errors.songId.message}</span>
            </label>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            {...form.register("title")}
            placeholder="Enter your story title"
            className="input input-bordered w-full"
          />
          {form.formState.errors.title && (
            <label className="label">
              <span className="label-text-alt text-error">{form.formState.errors.title.message}</span>
            </label>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Your Story</span>
          </label>
          <textarea
            {...form.register("content")}
            placeholder="Share your thoughts about this song..."
            className="textarea textarea-bordered w-full min-h-[200px]"
          />
          {form.formState.errors.content && (
            <label className="label">
              <span className="label-text-alt text-error">{form.formState.errors.content.message}</span>
            </label>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Post Story
        </button>
      </form>
    </div>
  );
}
