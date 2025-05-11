import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../index';
import { saveSettings, loadSettings, PersistedSettings } from '../../services/settingsService';

interface SettingsState {
  notificationsEnabled: boolean;
  darkMode: boolean;
  hydrated: boolean;
}

const initialState: SettingsState = {
  notificationsEnabled: true,
  darkMode: false,
  hydrated: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleNotifications(state) {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setNotificationsEnabled(state, action: PayloadAction<boolean>) {
      state.notificationsEnabled = action.payload;
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
    hydrateSettings(state, action: PayloadAction<Partial<SettingsState>>) {
      if (action.payload.notificationsEnabled !== undefined) {
        state.notificationsEnabled = action.payload.notificationsEnabled;
      }
      if (action.payload.darkMode !== undefined) {
        state.darkMode = action.payload.darkMode;
      }
      state.hydrated = true;
    },
  },
});

export const { toggleNotifications, toggleDarkMode, setNotificationsEnabled, setDarkMode, hydrateSettings } = settingsSlice.actions;

// Thunks for persistence
export const persistSettings = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { notificationsEnabled, darkMode } = getState().settings;
  await saveSettings({ notificationsEnabled, darkMode });
};

export const loadPersistedSettings = () => async (dispatch: AppDispatch) => {
  const loaded = await loadSettings();
  if (loaded) {
    dispatch(hydrateSettings(loaded));
  } else {
    dispatch(hydrateSettings({}));
  }
};

export default settingsSlice.reducer;
export type { SettingsState };
