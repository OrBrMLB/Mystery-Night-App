import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { User } from '../../../types';
// Fallback: Inline User type for now
export interface User {
  id: string;
  email: string;
  // Add more fields as needed
}

const baseUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
    }),
    // Add more endpoints as needed
  }),
});

export const { useGetUserQuery } = userApi;
