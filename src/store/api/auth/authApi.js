import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.SERVER_URL }),
    tagTypes: ['Authentication'],
    endpoints: (builder) => ({
      signup: builder.mutation({
        query: (credentials) => ({
          url: '/auth/signup',
          method: 'POST',
          body: credentials
        })
      })
    })
});

export const {
  useSignupMutation
} = authApi