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
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      songId: "",
      title: "",
      content: ""
    }
  });

  // Debug function to check table existence and structure
  const checkDatabase = async () => {
    try {
      // Check songs table
      const { data: songsData, error: songsError } = await supabase
        .from('songs')
        .select('*')
        .limit(1);

      console.log('Songs table check:', { data: songsData, error: songsError });

      // Check albums table
      const { data: albumsData, error: albumsError } = await supabase
        .from('albums')
        .select('*')
        .limit(1);

      console.log('Albums table check:', { data: albumsData, error: albumsError });

      // Check artists table
      const { data: artistsData, error: artistsError } = await supabase
        .from('artists')
        .select('*')
        .limit(1);

      console.log('Artists table check:', { data: artistsData, error: artistsError });

      if (songsError) setError('Error accessing songs table: ' + songsError.message);
      if (albumsError) setError('Error accessing albums table: ' + albumsError.message);
      if (artistsError) setError('Error accessing artists table: ' + artistsError.message);
    } catch (error) {
      console.error('Database check error:', error);
      setError('Failed to check database structure');
    }
  };

  // Run database check on mount
  useEffect(() => {
    checkDatabase();
  }, []);

  const searchSongs = async (value: string) => {
    setLoading(true);
    setError(null);
    try {
      // Simple query first
      const { data: songsData, error: songsError } = await supabase
        .from('songs')
        .select('id, title, album_id');

      console.log('Songs query result:', { data: songsData, error: songsError });

      if (songsError) {
        setError('Error fetching songs: ' + songsError.message);
        return;
      }

      if (!songsData || songsData.length === 0) {
        setSongs([]);
        return;
      }

      // Get unique album IDs
      const albumIds = [...new Set(songsData.map(song => song.album_id))];
      
      const { data: albumsData, error: albumsError } = await supabase
        .from('albums')
        .select('id, title, artist_id')
        .in('id', albumIds);

      console.log('Albums query result:', { data: albumsData, error: albumsError });

      if (albumsError) {
        setError('Error fetching albums: ' + albumsError.message);
        return;
      }

      // Get unique artist IDs
      const artistIds = [...new Set(albumsData?.map(album => album.artist_id) || [])];

      const { data: artistsData, error: artistsError } = await supabase
        .from('artists')
        .select('id, name')
        .in('id', artistIds);

      console.log('Artists query result:', { data: artistsData, error: artistsError });

      if (artistsError) {
        setError('Error fetching artists: ' + artistsError.message);
        return;
      }

      // Create lookup maps
      const albumMap = new Map(albumsData?.map(album => [album.id, album]) || []);
      const artistMap = new Map(artistsData?.map(artist => [artist.id, artist]) || []);

      // Format songs
      const formattedSongs = songsData
        .filter(song => !value || song.title.toLowerCase().includes(value.toLowerCase()))
        .map(song => {
          const album = albumMap.get(song.album_id);
          const artist = album ? artistMap.get(album.artist_id) : null;
          return {
            id: song.id,
            title: song.title,
            album_title: album?.title || 'Unknown Album',
            artist_name: artist?.name || 'Unknown Artist',
          };
        })
        .slice(0, 20);

      setSongs(formattedSongs);
    } catch (error) {
      console.error('Error searching songs:', error);
      setError('Unexpected error while searching songs');
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

      form.reset();
      setSearchValue("");
      setOpen(false);
    } catch (error) {
      console.error('Error creating story:', error);
      setError('Failed to create story');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-serif font-bold mb-6 text-primary">Add Song Story</h2>
      
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

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
            type="text"
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
