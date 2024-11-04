// React library import
import { createApi } from "@reduxjs/toolkit/query/react";

// Custom import
import { createBaseQuery } from "../../../utils/baseQuery";

export const verifyInvitationApi = createApi({
    reducerPath: "verifyInvitationApi",
    baseQuery: createBaseQuery(),
    endpoints: (builder) => ({
        verifyInvitation: builder.mutation({
            query: ({ data, role }) => ({
                url: `/users/verifyInvitation?as=${role}`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useVerifyInvitationMutation } = verifyInvitationApi;
