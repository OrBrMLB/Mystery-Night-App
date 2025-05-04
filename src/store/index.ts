import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './slices/eventsSlice';
import userReducer from './slices/userSlice';
import settingsReducer from './slices/settingsSlice';

const store = configureStore({
  reducer: {
    events: eventsReducer,
    user: userReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
