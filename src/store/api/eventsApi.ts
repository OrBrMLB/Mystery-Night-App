import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../services/supabaseClient';

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
}

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }), // Not used, we use Supabase client
  endpoints: (builder) => ({
    getEvents: builder.query<EventItem[], void>({
      async queryFn() {
        const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
        if (error) return { error };
        return { data: data as EventItem[] };
      },
    }),
  }),
});

export const { useGetEventsQuery } = eventsApi;
