import { supabase } from './supabaseClient';
// All methods updated for Supabase v2 compatibility

export interface AuthResult {
  user: any;
  session: any;
  error: any;
}

export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  const result = await supabase.auth.signIn({ email, password });
  if (result.error) {
    console.error('[Auth] Login error:', result.error);
  }
  return { user: result.user, session: result.session, error: result.error };

}

export async function signUpWithEmail(email: string, password: string): Promise<AuthResult> {
  const result = await supabase.auth.signUp({ email, password });
  return { user: result.user, session: result.session, error: result.error };
}

export async function signOut(): Promise<{ error: any }> {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const session = typeof supabase.auth.session === 'function' ? supabase.auth.session() : supabase.auth.session;
  if (session && typeof session !== 'function' && 'user' in session) {
    return session.user;
  }
  return null;
}
