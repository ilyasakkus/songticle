-- Create artists table
CREATE TABLE artists (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    picture_small VARCHAR(255),
    picture_medium VARCHAR(255),
    picture_big VARCHAR(255),
    picture_xl VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create albums table
CREATE TABLE albums (
    id BIGINT PRIMARY KEY,
    artist_id BIGINT NOT NULL REFERENCES artists(id),
    title VARCHAR(255) NOT NULL,
    cover_small VARCHAR(255),
    cover_medium VARCHAR(255),
    cover_big VARCHAR(255),
    cover_xl VARCHAR(255),
    release_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT fk_artist
        FOREIGN KEY(artist_id) 
        REFERENCES artists(id)
        ON DELETE CASCADE
);

-- Create songs table
CREATE TABLE songs (
    id BIGINT PRIMARY KEY,
    album_id BIGINT NOT NULL REFERENCES albums(id),
    artist_id BIGINT NOT NULL REFERENCES artists(id),
    title VARCHAR(255) NOT NULL,
    title_short VARCHAR(255),
    title_version VARCHAR(255),
    duration INTEGER NOT NULL,
    preview_url VARCHAR(255),
    explicit_lyrics BOOLEAN DEFAULT false,
    explicit_content_lyrics INTEGER DEFAULT 0,
    explicit_content_cover INTEGER DEFAULT 0,
    rank INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT fk_album
        FOREIGN KEY(album_id) 
        REFERENCES albums(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_artist
        FOREIGN KEY(artist_id) 
        REFERENCES artists(id)
        ON DELETE CASCADE
);

-- Create stories table
CREATE TABLE stories (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    song_id BIGINT NOT NULL REFERENCES songs(id),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT fk_song
        FOREIGN KEY(song_id) 
        REFERENCES songs(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES auth.users(id)
        ON DELETE CASCADE
);

-- Create profiles table (for users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    username VARCHAR(255) UNIQUE NOT NULL,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(id) 
        REFERENCES auth.users(id)
        ON DELETE CASCADE
);

-- Create likes table for stories
CREATE TABLE story_likes (
    id BIGSERIAL PRIMARY KEY,
    story_id BIGINT NOT NULL REFERENCES stories(id),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(story_id, user_id),
    CONSTRAINT fk_story
        FOREIGN KEY(story_id) 
        REFERENCES stories(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES auth.users(id)
        ON DELETE CASCADE
);

-- Create comments table for stories
CREATE TABLE story_comments (
    id BIGSERIAL PRIMARY KEY,
    story_id BIGINT NOT NULL REFERENCES stories(id),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT fk_story
        FOREIGN KEY(story_id) 
        REFERENCES stories(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES auth.users(id)
        ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_songs_album_id ON songs(album_id);
CREATE INDEX idx_songs_artist_id ON songs(artist_id);
CREATE INDEX idx_albums_artist_id ON albums(artist_id);
CREATE INDEX idx_stories_song_id ON stories(song_id);
CREATE INDEX idx_stories_user_id ON stories(user_id);
CREATE INDEX idx_story_likes_story_id ON story_likes(story_id);
CREATE INDEX idx_story_likes_user_id ON story_likes(user_id);
CREATE INDEX idx_story_comments_story_id ON story_comments(story_id);
CREATE INDEX idx_story_comments_user_id ON story_comments(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_comments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public artists are viewable by everyone" ON artists
    FOR SELECT USING (true);

CREATE POLICY "Public albums are viewable by everyone" ON albums
    FOR SELECT USING (true);

CREATE POLICY "Public songs are viewable by everyone" ON songs
    FOR SELECT USING (true);

CREATE POLICY "Stories are viewable by everyone" ON stories
    FOR SELECT USING (true);

CREATE POLICY "Stories can be inserted by authenticated users" ON stories
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Stories can be updated by the owner" ON stories
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Stories can be deleted by the owner" ON stories
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Likes can be viewed by everyone" ON story_likes
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert likes" ON story_likes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes" ON story_likes
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Comments are viewable by everyone" ON story_comments
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert comments" ON story_comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments" ON story_comments
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments" ON story_comments
    FOR DELETE USING (auth.uid() = user_id);
