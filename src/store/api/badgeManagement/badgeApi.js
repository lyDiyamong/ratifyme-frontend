import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// API configuration
export const badgeApi = createApi({
    reducerPath: "badgeApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["Badge"],
    endpoints: (builder) => ({
        // Fetch badges by issuerId
        fetchBadgesByIssuer: builder.query({
            query: () => ({
                url: `/issuers/badgeClasses`,
                method: "GET",
            }),
            // transformResponse: (response) => ({
            //     data: response.data.map((item) => ({
            //         ...item,
            //         issuedOn: new Date(item.issuedOn).toISOString(), // Convert dates to ISO string
            //         startDate: new Date(item.startDate).toISOString(),
            //         endDate: new Date(item.endDate).toISOString(),
            //     })),
            // }),
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
                    badgeApi.util.updateQueryData("fetchBadgesByIssuer", undefined, (draft) => {
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
        // fetch one data for one badge class
        fetchOneBadge: builder.query({
            query: (id) => ({
                url: `issuers/badgeClasses/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useCreateBadgeMutation, useFetchBadgesByIssuerQuery, useFetchOneBadgeQuery } = badgeApi;
