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
        inviteEarner: builder.mutation({
            query: ({ issuerId, ...data }) => ({
                url: `users/codeInvitation/inviteEarner/${issuerId}`,
                method: "POST",
                body: data,
            }),
        }),
        fetchAllInvitedUser: builder.query({
            query: () => ({
                url: "users/codeInvitation/invitedUser",
                method: "GET",
            }),
        }),
        deleteInvitedUser: builder.mutation({
            query: ({ invitedUserId }) => ({
                url: `users/codeInvitation/invitedUser/${invitedUserId}`,
                method: "DELETE",
            }),
        }),
    }),
});

// Export both the API instance and hooks
export const {
    useInviteIssuerMutation,
    useInviteEarnerMutation,
    useFetchAllInvitedUserQuery,
    useDeleteInvitedUserMutation,
} = inviteUserApi;
export { inviteUserApi };
