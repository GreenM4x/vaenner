import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data.user;
  }

  async signIn(email: string, password: string) {
    console.log('Trying login with:', email, password);
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    console.log('Supabase response:', data, error);
    if (error) throw error;
    return data.user;
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }

  async getCurrentUser() {
    const { data } = await this.supabase.auth.getUser();
    return data.user;
  }
}
