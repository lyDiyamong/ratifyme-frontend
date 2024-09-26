import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../../../utils/baseQuery";

const inviteUserApi = createApi({
    reducerPath: "inviteUserApi",
    baseQuery: createBaseQuery(),
    endpoints: (builder) => ({
        inviteIssuer: builder.mutation({
            query: ({ institutionId, ...data }) => ({
                url: `users/codeInvitation/inviteIssuer/${institutionId}`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useInviteIssuerMutation } = inviteUserApi;
