import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  // Auth
  async getCurrentUser() {
    const { data } = await this.supabase.auth.getUser();
    return data.user;
  }

  // Upload Bild in Storage Bucket "images"
  async uploadImage(file: File, userId: string) {
    const filename = `${userId}/${Date.now()}_${file.name}`;

    // Upload in Bucket "images"
    const { data: uploadData, error: uploadError } = await this.supabase.storage
      .from('images')
      .upload(filename, file, { cacheControl: '3600', upsert: true });

    if (uploadError) throw uploadError;

    // Public URL
    const { data: urlData } = this.supabase.storage.from('images').getPublicUrl(filename);
    return { publicUrl: urlData.publicUrl, path: filename };
  }

  // Insert Post in DB
  async insertPost(userId: string, imageUrl: string, caption: string) {
    const { data, error } = await this.supabase
      .from('posts')
      .insert([{ user_id: userId, image_url: imageUrl, caption }]);
    if (error) throw error;
    return data;
  }

  // NEU: Feed laden mit User-Daten
  async getFeed() {
    const { data, error } = await this.supabase
      .from('posts')
      .select(
        `
        *,
        profiles (
          username,
          avatar_url
        )
      `
      )
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}
