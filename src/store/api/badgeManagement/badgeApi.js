import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// API configuration
export const badgeApi = createApi({
    reducerPath: "badgeApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["Badge"],
    endpoints: (builder) => ({
        // Fetch badges
        fetchBadge: builder.query({
            query: () => ({
                url: "/issuers/badgeClasses",
                method: "GET",
            }),
            // transformResponse: (response) => {
            //     // Convert Date objects to ISO strings or another serializable format
            //     return {
            //         data: response.data.map((item) => ({
            //             ...item,
            //             issuedOn: new Date(item.issuedOn).toISOString(), // Ensure date is a string
            //             startDate: new Date(item.startDate).toISOString(), // Ensure date is a string
            //             endDate: new Date(item.endDate).toISOString(), // Ensure date is a string
            //         })),
            //     };
            // },
            providesTags: (result) =>
                result?.data
                    ? [...result.data.map(({ id }) => ({ type: "Badge", id })), { type: "Badge", id: "LIST" }]
                    : [{ type: "Badge", id: "LIST" }],
        }),
        // Create a new badge
        createBadge: builder.mutation({
            query: (badge) => ({
                url: "/issuers/badgeClasses",
                method: "POST",
                body: badge,
            }),
            invalidatesTags: [{ type: "Badge", id: "LIST" }],
            onQueryStarted: async (badge, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    badgeApi.util.updateQueryData("fetchBadge", undefined, (draft) => {
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
    }),
});

export const { useCreateBadgeMutation, useFetchBadgeQuery } = badgeApi;
