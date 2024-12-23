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
  album_name: string;
  artist_name: string;
  cover_image: string;
}

export interface Story {
  id: number;
  created_at: string;
  content: string;
  song_id: number;
  user_id: string | null;
  author_name: string | null;
  profiles?: Profile;
  comments?: StoryComment[];
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string;
  email: string | null;
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

export type Database = {
  public: {
    Tables: {
      stories: {
        Row: Story;
        Insert: Omit<Story, 'id' | 'created_at'>;
        Update: Partial<Omit<Story, 'id' | 'created_at'>>;
      };
      profiles: {
        Row: Profile;
        Insert: Profile;
        Update: Partial<Profile>;
      };
      story_likes: {
        Row: StoryLike;
        Insert: Omit<StoryLike, 'id' | 'created_at'>;
        Update: Partial<Omit<StoryLike, 'id' | 'created_at'>>;
      };
      story_comments: {
        Row: StoryComment;
        Insert: Omit<StoryComment, 'id' | 'created_at'>;
        Update: Partial<Omit<StoryComment, 'id' | 'created_at'>>;
      };
    };
  };
};
