import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  notificationsEnabled: boolean;
  darkMode: boolean;
}

const initialState: SettingsState = {
  notificationsEnabled: true,
  darkMode: false,
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
  },
});

export const { toggleNotifications, toggleDarkMode, setNotificationsEnabled, setDarkMode } = settingsSlice.actions;
export default settingsSlice.reducer;
export type { SettingsState };
