import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Testing Verification API
export const verificationApi = createApi({
    reducerPath: "verificationApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    endpoints: (builder) => ({
        verifyCred: builder.mutation({
            query: ({ credId, verifyData }) => ({
                url: `/earners/verify-credential/${credId}`,
                method: "POST",
                body: verifyData,
            }),
        }),
    }),
});

export const { useVerifyCredMutation } = verificationApi;
