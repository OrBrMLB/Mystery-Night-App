import { supabase } from './supabaseClient';

export interface AuthResult {
  user: any;
  session: any;
  error: any;
}

export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  const { data: session, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user: data?.user, session: data?.session, error };
}

export async function signUpWithEmail(email: string, password: string): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { user: data?.user, session: data?.session, error };
}

export async function signOut(): Promise<{ error: any }> {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}
