// Auth slice migrated from original app
// TODO: Copy actual implementation from original project if needed
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any | null;
  session: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  session: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<{ user: any; session: any }>) {
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.error = null;
    },
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAuthError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    signOutAuth(state) {
      state.user = null;
      state.session = null;
      state.error = null;
    },
  },
});

export const { setAuthUser, setAuthLoading, setAuthError, signOutAuth } = authSlice.actions;
export default authSlice.reducer;
export type { AuthState };
