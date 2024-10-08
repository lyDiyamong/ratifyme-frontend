import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// API configuration
export const badgeApi = createApi({
    reducerPath: "badgeApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["Badge"],
    endpoints: (builder) => ({
        // Fetch badges by issuerId
        fetchBadges: builder.query({
            query: () => ({
                url: `/issuers/badgeClasses`,
                method: "GET",
            }),
            providesTags: (result) =>
                result?.data
                    ? [...result.data.map(({ id }) => ({ type: "Badge", id })), { type: "Badge", id: "LIST" }]
                    : [{ type: "Badge", id: "LIST" }],
        }),
        // Create a new badge
        createBadge: builder.mutation({
            query: (badge) => ({
                url: "issuers/badgeClasses/addBadge",
                method: "POST",
                body: badge,
            }),
            invalidatesTags: [{ type: "Badge", id: "LIST" }],
            onQueryStarted: async (badge, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    badgeApi.util.updateQueryData("fetchBadgesByIssuer", badge.issuerId, (draft) => {
                        if (draft.data) {
                            draft.data.push(badge);
                        } else {
                            draft.data = [badge];
                        }
                    }),
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.error("Update failed:", error);
                    patchResult.undo();
                }
            },
        }),
        // Fetch one data for one badge class
        fetchOneBadge: builder.query({
            query: (id) => ({
                url: `issuers/badgeClasses/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Badge", id }],
        }),

        // Fetch badge for each institution
        fetchBadgesByInstitutions: builder.query({
            query: (id) => ({
                url: `institutions/${id}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result?.data
                    ? [...result.data.map(({ id }) => ({ type: "Badge", id })), { type: "Badge", id: "LIST" }]
                    : [{ type: "Badge", id: "LIST" }],
        }),

        // Fetch badge for each issuer
        fetchBadgesByIssuer: builder.query({
            query: (id) => ({
                url: `issuers/${id}`,
                method: "GET",
            }),
        }),

        fetchBadgeByEarner: builder.query({
            query: (id) => ({
                url: `/issuers/badgeClasses/earner/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) =>
                result?.data
                    ? [...result.data.map(({ id }) => ({ type: "Badge", id })), { type: "Badge", id }]
                    : [{ type: "Badge", id }],
        }),
        fetchClaimBadgeByEarner: builder.query({
            query: (id) => ({
                url: `/issuers/badgeClasses/claim/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) =>
                result?.data
                    ? [...result.data.map(({ id }) => ({ type: "Badge", id })), { type: "Badge", id }]
                    : [{ type: "Badge", id }],
        }),

        deleteBadge: builder.mutation({
            query: (id) => ({
                url: `/issuers/badgeClasses/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Badge", id }],
        }),
    }),
});

export const {
    useCreateBadgeMutation,
    useFetchBadgesByIssuerQuery,
    useFetchOneBadgeQuery,
    useFetchBadgesByInstitutionsQuery,
    useFetchBadgesQuery,
    useFetchBadgeByEarnerQuery,
    useFetchClaimBadgeByEarnerQuery,
    useDeleteBadgeMutation,
} = badgeApi;
