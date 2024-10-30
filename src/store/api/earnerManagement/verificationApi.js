import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../../../utils/baseQuery";

//Testing Verification API
export const verificationApi = createApi({
    reducerPath: "verificationApi",
    baseQuery: createBaseQuery(),
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
