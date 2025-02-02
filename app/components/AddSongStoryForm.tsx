'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { useAuth } from '../providers/AuthProvider';
import type { Song } from '../types/database.types';
import { Image } from '@/app/components/ui/image';

const formSchema = z.object({
  songId: z.number(),
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(10, 'Story must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export function AddSongStoryForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const { data: songs, isLoading: songsLoading } = useSupabaseData<Song>('songs');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      songId: undefined,
      title: '',
      content: '',
    },
  });

  const { register, handleSubmit, formState: { errors }, setValue } = form;

  const filteredSongs = searchValue
    ? songs?.filter((song) =>
        song.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        (song.artist_name || '').toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  const onSubmit = async (values: FormData) => {
    try {
      if (!user) {
        throw new Error('Please sign in to share your story');
      }

      setLoading(true);
      setError(null);
      setSuccess(null);

      if (!values.songId) {
        throw new Error('Please select a song first');
      }

      const storyData = {
        song_id: values.songId,
        title: values.title,
        content: values.content,
        user_id: user.id
      };

      const { error: insertError } = await supabase
        .from('stories')
        .insert([storyData])
        .select()
        .single();

      if (insertError) {
        throw new Error(insertError.message || 'Failed to create story');
      }

      setSuccess('Your story has been shared successfully!');
      form.reset();
      setSearchValue('');
      setSelectedSong(null);
      
      // Redirect to home page after successful submission
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while sharing your story. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const onSongSelect = (song: Song) => {
    setValue('songId', song.id);
    setSelectedSong(song);
    setSearchValue('');
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Song Search */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Search for a song</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search songs..."
              className="input input-bordered w-full"
            />
            {searchValue && (
              <div className="absolute z-10 w-full mt-1 bg-base-100 border rounded-box shadow-lg max-h-60 overflow-auto">
                {songsLoading ? (
                  <div className="p-4 text-center">Loading songs...</div>
                ) : !filteredSongs?.length ? (
                  <div className="p-4 text-center">No songs found</div>
                ) : (
                  filteredSongs.map((song) => (
                    <button
                      key={song.id}
                      type="button"
                      onClick={() => onSongSelect(song)}
                      className={`w-full p-2 text-left hover:bg-base-200 flex items-center space-x-2 ${
                        selectedSong?.id === song.id ? 'bg-primary/10' : ''
                      }`}
                    >
                      {song.cover_image && (
                        <Image
                          src={song.cover_image}
                          alt={song.title}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      )}
                      <div>
                        <div className="font-medium">{song.title}</div>
                        <div className="text-sm opacity-70">{song.artist_name}</div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
          {selectedSong && (
            <div className="mt-2 p-2 bg-base-200 rounded-box flex items-center space-x-2">
              {selectedSong.cover_image && (
                <Image
                  src={selectedSong.cover_image}
                  alt={selectedSong.title}
                  width={40}
                  height={40}
                  className="rounded"
                />
              )}
              <div>
                <div className="font-medium">{selectedSong.title}</div>
                <div className="text-sm opacity-70">{selectedSong.artist_name}</div>
              </div>
            </div>
          )}
        </div>

        {/* Story Title */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Story Title</span>
          </label>
          <input
            type="text"
            {...register('title')}
            placeholder="Give your story a title..."
            className="input input-bordered w-full"
          />
          {errors.title && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.title.message}</span>
            </label>
          )}
        </div>

        {/* Story Content */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Your Story</span>
          </label>
          <textarea
            {...register('content')}
            placeholder="Share your story about this song..."
            className="textarea textarea-bordered h-32 w-full"
          />
          {errors.content && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.content.message}</span>
            </label>
          )}
        </div>

        {error && (
          <div className="alert alert-error">{error}</div>
        )}

        {success && (
          <div className="alert alert-success">{success}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? 'Posting...' : 'Share Story'}
        </button>
      </form>
    </div>
  );
}
