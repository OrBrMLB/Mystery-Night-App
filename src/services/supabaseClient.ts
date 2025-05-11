import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

// Polyfill global objects for React Native (required by supabase-js)
if (typeof global !== 'undefined') {
  if (!global.atob) global.atob = (data: string) => Buffer.from(data, 'base64').toString('binary');
  if (!global.btoa) global.btoa = (data: string) => Buffer.from(data, 'binary').toString('base64');
}

// Universal getter for Supabase env vars for Expo Go compatibility
function getSupabaseEnv(key: string): string {
  if (Constants.manifest && Constants.manifest.extra && Constants.manifest.extra[key]) {
    return Constants.manifest.extra[key];
  }
  if (Constants.expoConfig && Constants.expoConfig.extra && Constants.expoConfig.extra[key]) {
    return Constants.expoConfig.extra[key];
  }
  throw new Error(`Missing Supabase environment variable: ${key}`);
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key)
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  storage: ExpoSecureStoreAdapter,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false
});
