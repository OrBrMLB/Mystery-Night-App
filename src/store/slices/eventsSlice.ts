import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
}

interface EventsState {
  events: EventItem[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    fetchEventsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchEventsSuccess(state, action: PayloadAction<EventItem[]>) {
      state.events = action.payload;
      state.loading = false;
    },
    fetchEventsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchEventsStart, fetchEventsSuccess, fetchEventsFailure } = eventsSlice.actions;
export default eventsSlice.reducer;
export type { EventItem, EventsState };
