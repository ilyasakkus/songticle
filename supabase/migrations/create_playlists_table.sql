-- Create playlists table
create table public.playlists (
  id bigint primary key generated always as identity,
  title text not null,
  description text,
  artist_id bigint references public.artists(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) default auth.uid(),
  is_generated boolean default false
);

-- Enable RLS
alter table public.playlists enable row level security;

-- Create RLS policies
create policy "Playlists are viewable by everyone" on public.playlists
  for select using (true);

create policy "Users can insert their own playlists" on public.playlists
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own playlists" on public.playlists
  for update using (auth.uid() = user_id);

create policy "Users can delete their own playlists" on public.playlists
  for delete using (auth.uid() = user_id);

-- Create playlist_songs junction table
create table public.playlist_songs (
  id bigint primary key generated always as identity,
  playlist_id bigint references public.playlists(id) on delete cascade,
  song_id bigint references public.songs(id) on delete cascade,
  position integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(playlist_id, song_id),
  unique(playlist_id, position)
);

-- Enable RLS
alter table public.playlist_songs enable row level security;

-- Create RLS policies
create policy "Playlist songs are viewable by everyone" on public.playlist_songs
  for select using (true);

create policy "Users can insert songs to their playlists" on public.playlist_songs
  for insert with check (
    exists (
      select 1 from public.playlists
      where id = playlist_id
      and user_id = auth.uid()
    )
  );

create policy "Users can update songs in their playlists" on public.playlist_songs
  for update using (
    exists (
      select 1 from public.playlists
      where id = playlist_id
      and user_id = auth.uid()
    )
  );

create policy "Users can delete songs from their playlists" on public.playlist_songs
  for delete using (
    exists (
      select 1 from public.playlists
      where id = playlist_id
      and user_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger handle_playlists_updated_at
  before update on public.playlists
  for each row
  execute function public.handle_updated_at(); 