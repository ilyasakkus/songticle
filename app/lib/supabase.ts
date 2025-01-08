import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Image upload functions
export async function uploadAlbumCover(albumId: string, imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    const filePath = `${albumId}.jpg`;
    const { error } = await supabase.storage
      .from('album-covers')
      .upload(filePath, blob, {
        contentType: 'image/jpeg',
        upsert: true
      });
      
    if (error) throw error;
    
    const { data } = supabase.storage
      .from('album-covers')
      .getPublicUrl(filePath);
      
    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading album cover:', error);
    return null;
  }
}

export async function uploadArtistImage(artistId: string, imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    const filePath = `${artistId}.jpg`;
    const { error } = await supabase.storage
      .from('artist-images')
      .upload(filePath, blob, {
        contentType: 'image/jpeg',
        upsert: true
      });
      
    if (error) throw error;
    
    const { data } = supabase.storage
      .from('artist-images')
      .getPublicUrl(filePath);
      
    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading artist image:', error);
    return null;
  }
}
