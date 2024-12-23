export interface Artist {
  id: number;
  name: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  created_at: string;
}

export interface Album {
  id: number;
  artist_id: number;
  title: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  release_date?: string;
  created_at: string;
}

export interface Song {
  id: number;
  album_id: number;
  artist_id: number;
  title: string;
  title_short: string;
  title_version: string;
  duration: number;
  preview_url: string;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  rank: number;
  created_at: string;
}

export interface Story {
  id: number;
  title: string;
  content: string;
  song_id: number;
  user_id: string;
  created_at: string;
}

export interface Profile {
  id: string;
  username: string;
  avatar_url?: string;
  created_at: string;
}

export interface StoryLike {
  id: number;
  story_id: number;
  user_id: string;
  created_at: string;
}

export interface StoryComment {
  id: number;
  story_id: number;
  user_id: string;
  content: string;
  created_at: string;
}
