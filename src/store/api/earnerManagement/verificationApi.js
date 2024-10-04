import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//Testing Verification API
export const verificationApi = createApi({
  reducerPath: 'verificationApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }), 
  endpoints: (builder) => ({
    fetchVerificationData: builder.query({
      query: (id) => `/earners/verifications/${id}`,
    }),
  }),
});

export const { useFetchVerificationDataQuery } = verificationApi;
