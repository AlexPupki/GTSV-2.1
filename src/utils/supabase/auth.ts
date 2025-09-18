import { supabase } from './client';
import type { Session, User, AuthChangeEvent } from '@supabase/supabase-js';

export class SupabaseAuthService {
  private static instance: SupabaseAuthService;
  private authListeners: Array<(event: AuthChangeEvent, session: Session | null) => void> = [];

  private constructor() {
    // Set up the auth state change listener
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      this.notifyListeners(event, session);
    });
  }

  public static getInstance(): SupabaseAuthService {
    if (!SupabaseAuthService.instance) {
      SupabaseAuthService.instance = new SupabaseAuthService();
    }
    return SupabaseAuthService.instance;
  }

  public addAuthListener(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    this.authListeners.push(callback);
    return () => {
      this.authListeners = this.authListeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners(event: AuthChangeEvent, session: Session | null) {
    this.authListeners.forEach(listener => {
      try {
        listener(event, session);
      } catch (error) {
        console.error('Error in auth listener:', error);
      }
    });
  }

  public async getSession(): Promise<{ session: Session | null; error: any }> {
    try {
      const { data, error } = await supabase.auth.getSession();
      return { session: data.session, error };
    } catch (error) {
      console.error('Error getting session:', error);
      return { session: null, error };
    }
  }

  public async getUser(): Promise<{ user: User | null; error: any }> {
    try {
      const { data, error } = await supabase.auth.getUser();
      return { user: data.user, error };
    } catch (error) {
      console.error('Error getting user:', error);
      return { user: null, error };
    }
  }

  public async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error };
    }
  }

  public async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error };
    }
  }

  public async signInWithOAuth(provider: 'google' | 'github' | 'facebook') {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
      });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('OAuth sign in error:', error);
      return { success: false, error };
    }
  }

  public getClient() {
    return supabase;
  }
}

// Export singleton instance
export const authService = SupabaseAuthService.getInstance();
export default authService;