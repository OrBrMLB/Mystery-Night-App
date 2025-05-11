import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './slices/eventsSlice';
import userReducer from './slices/userSlice';
import settingsReducer from './slices/settingsSlice';
import authReducer from './slices/authSlice';
import { eventsApi } from './api/eventsApi';

const store = configureStore({
  reducer: {
    events: eventsReducer,
    user: userReducer,
    settings: settingsReducer,
    auth: authReducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(eventsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
