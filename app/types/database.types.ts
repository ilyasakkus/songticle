export interface Artist {
  id: number;
  name: string;
  picture_small: string;
  picture_medium: string;
}

export interface Album {
  id: number;
  artist_id: number;
  title: string;
  cover: string;
  release_date?: string;
}

export interface Song {
  id: number;
  artist_id: number;
  artist_name: string;
  title: string;
  album_name: string;
  preview_url: string;
  cover_image: string;
}

export interface Story {
  id: number;
  title: string;
  content: string;
  song_id: number;
  user_id: string;
}

export interface Profile {
  id: string;
  username: string;
  avatar_url?: string;
}

export interface StoryLike {
  id: number;
  story_id: number;
  user_id: string;
}

export interface StoryComment {
  id: number;
  story_id: number;
  user_id: string;
  content: string;
}
