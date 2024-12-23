export interface Artist {
  id: number;
  name: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  nb_fan: number;
  created_at: string;
}

export interface Album {
  id: number;
  artist_id: number;
  title: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  release_date: string;
  created_at: string;
}

export interface Song {
  id: number;
  album_id: number;
  artist_id: number;
  title: string;
  duration: number;
  preview_url: string;
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
