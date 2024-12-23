'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Command } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '../lib/utils';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useArtistHierarchy } from '../hooks/useArtistHierarchy';

const formSchema = z.object({
  songId: z.string({
    required_error: "Please select a song.",
  }),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Story must be at least 10 characters long"),
  author_name: z.string().min(1, "Name is required").max(50, "Name is too long"),
});

type Song = {
  id: number;
  title: string;
  artist_name: string;
  album_title: string;
};

export function AddSongStoryForm() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { artists, error: artistError } = useArtistHierarchy();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      songId: "",
      title: "",
      content: "",
      author_name: ""
    }
  });

  // Flatten the artist hierarchy into a list of songs with artist and album info
  const songs: Song[] = artists.flatMap(artist =>
    artist.albums?.flatMap(album =>
      album.songs?.map(song => ({
        id: song.id,
        title: song.title,
        artist_name: artist.name,
        album_title: album.title
      })) || []
    ) || []
  );

  // Filter songs based on search value
  const filteredSongs = songs.filter(song => {
    const searchLower = searchValue.toLowerCase();
    return (
      song.title.toLowerCase().includes(searchLower) ||
      song.artist_name.toLowerCase().includes(searchLower) ||
      song.album_title.toLowerCase().includes(searchLower)
    );
  }).slice(0, 20); // Limit to 20 results

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setError(null);
      setLoading(true);

      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      const { error: storyError } = await supabase.from('stories').insert([
        {
          song_id: parseInt(values.songId),
          content: values.content,
          author_name: userId ? undefined : values.author_name,
          user_id: userId,
        },
      ]);

      if (storyError) throw storyError;

      setSuccess('Story created successfully!');
      form.reset();
      setSearchValue("");
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating story:', error.message);
        setError(error.message || 'Failed to create story. Please try again.');
      } else {
        console.error('Unknown error creating story');
        setError('Failed to create story. Please try again.');
      }
    } finally {
      setLoading(false);
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

      {success && (
        <div className="alert alert-success mb-4">
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <input
            type="text"
            {...form.register("author_name")}
            placeholder="Enter your name"
            className="input input-bordered w-full"
          />
          {form.formState.errors.author_name && (
            <label className="label">
              <span className="label-text-alt text-error">{form.formState.errors.author_name.message}</span>
            </label>
          )}
        </div>

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
                <div className="flex items-center px-3 border-b border-base-300">
                  <Search className="w-4 h-4 mr-2 opacity-50" />
                  <input
                    placeholder="Search songs..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                {artistError ? (
                  <div className="py-6 text-center text-sm">
                    Failed to load songs.
                  </div>
                ) : filteredSongs.length === 0 ? (
                  <div className="py-6 text-center text-sm">
                    {searchValue ? "No songs found." : "Type to search songs..."}
                  </div>
                ) : (
                  <div className="max-h-[300px] overflow-y-auto">
                    {filteredSongs.map((song) => (
                      <div
                        key={song.id}
                        onClick={() => {
                          form.setValue("songId", song.id.toString());
                          setOpen(false);
                        }}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-base-200 cursor-pointer"
                      >
                        <Check
                          className={cn(
                            "w-4 h-4",
                            form.watch("songId") === song.id.toString() ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div>
                          <div className="font-medium">{song.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {song.artist_name} • {song.album_title}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Posting..." : "Post Story"}
        </button>
      </form>
    </div>
  );
}
