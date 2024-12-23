export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

export interface Story {
  id: number;
  created_at: string;
  content: string;
  song_id: number;
  user_id: string | null;
  author_name: string | null;
  profiles?: Profile;
  comments: number;
}
