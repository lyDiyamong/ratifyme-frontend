// React library import
import { createApi } from "@reduxjs/toolkit/query/react";

// Custom import
import { createBaseQuery } from "../../../utils/baseQuery";

const inviteUserApi = createApi({
    reducerPath: "inviteUserApi",
    baseQuery: createBaseQuery(),
    tagTypes: ["InvitedUsers"],
    endpoints: (builder) => ({
        inviteIssuer: builder.mutation({
            query: ({ institutionId, ...data }) => ({
                url: `users/codeInvitation/inviteIssuer/${institutionId}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["InvitedUsers"],
        }),
        inviteEarner: builder.mutation({
            query: ({ issuerId, ...data }) => ({
                url: `users/codeInvitation/inviteEarner/${issuerId}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["InvitedUsers"],
        }),
        fetchAllInvitedUser: builder.query({
            query: ({ inviterCode, roleId, page, limit, sort, search }) => {
                let query = `users/codeInvitation/invitedUser?limit=${limit}&page=${page}&sort=${sort}`;
                if (search) query += `&search=${search}`;

                if (roleId !== 1) {
                    query += `&inviterCode=${inviterCode}`;
                }

                return query;
            },
            providesTags: ["InvitedUsers"],
        }),
        deleteInvitedUser: builder.mutation({
            query: ({ invitedUserId }) => ({
                url: `users/codeInvitation/invitedUser/${invitedUserId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["InvitedUsers"],
        }),
        resendInviteIssuer: builder.mutation({
            query: ({ institutionId, ...data }) => ({
                url: `users/codeInvitation/resendInviteIssuer/${institutionId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["InvitedUsers"],
        }),
        resendInviteEarner: builder.mutation({
            query: ({ issuerId, ...data }) => ({
                url: `users/codeInvitation/resendInviteEarner/${issuerId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["InvitedUsers"],
        }),
    }),
});

export const {
    useInviteIssuerMutation,
    useInviteEarnerMutation,
    useFetchAllInvitedUserQuery,
    useDeleteInvitedUserMutation,
    useResendInviteIssuerMutation,
    useResendInviteEarnerMutation,
} = inviteUserApi;
export { inviteUserApi };
