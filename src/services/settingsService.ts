import * as SecureStore from 'expo-secure-store';

const SETTINGS_KEY = 'app_settings_v1';

export interface PersistedSettings {
  notificationsEnabled: boolean;
  darkMode: boolean;
}

export async function saveSettings(settings: PersistedSettings): Promise<void> {
  await SecureStore.setItemAsync(SETTINGS_KEY, JSON.stringify(settings));
}

export async function loadSettings(): Promise<PersistedSettings | null> {
  const raw = await SecureStore.getItemAsync(SETTINGS_KEY);
  return raw ? JSON.parse(raw) : null;
}
