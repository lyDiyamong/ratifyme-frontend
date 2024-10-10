import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// API configuration
export const badgeApi = createApi({
    reducerPath: "badgeApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["Badge", "BadgeIssuer"],
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
            invalidatesTags: (result) => [{ type: "BadgeIssuer", id: `LIST-${result?.issuerId}` }],
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
            query: (institutionId) => ({
                url: `institutions/${institutionId}`,
                method: "GET",
            }),
            providesTags: (result, error, institutionId) => {
                return result?.data?.Issuers
                    ? [
                          ...result.data.Issuers.flatMap(({ BadgeClasses }) =>
                              BadgeClasses.map(({ id }) => ({ type: "BadgeInstitution", id })),
                          ),
                          { type: "BadgeInstitution", id: `LIST-${institutionId}` },
                      ]
                    : [{ type: "BadgeInstitution", id: `LIST-${institutionId}` }];
            },
        }),

        // Fetch badge for each issuer
        fetchBadgesByIssuer: builder.query({
            query: (issuerId) => ({
                url: `issuers/${issuerId}`,
                method: "GET",
            }),
            providesTags: (result, error, issuerId) => {
                console.log(result?.data.BadgeClasses);
                return result?.data?.BadgeClasses
                    ? [
                          ...result.data.BadgeClasses.map(({ id }) => ({ type: "BadgeIssuer", id })),
                          { type: "BadgeIssuer", id: `LIST` },
                      ]
                    : [{ type: "BadgeIssuer", id: `LIST` }];
            },
        }),

        fetchBadgeByEarner: builder.query({
            query: (earnerId) => ({
                url: `/issuers/badgeClasses/earner/${earnerId}`,
                method: "GET",
            }),
            providesTags: (result, error, earnerId) => {
                // Safely filter out badges where status is false
                const badgesWithFalseStatus =
                    result?.badgeClasses?.filter(
                        (badge) => badge.Achievements?.[0]?.Earners?.[0]?.EarnerAchievements?.status === false,
                    ) || [];

                // Logging to check the filtered results
                console.log("Badges with false status:", result?.badgeClasses[0]);

                // Providing tags for caching based on the filtered badges
                return badgesWithFalseStatus.length
                    ? [
                          ...result?.badgeClasses?.map(({ id }) => ({ type: "BadgeEarner", id })),
                          { type: "BadgeEarner", id: `LIST-${earnerId}` },
                      ]
                    : [{ type: "BadgeEarner", id: `LIST-${earnerId}` }];
            },
        }),

        fetchClaimBadgeByEarner: builder.query({
            query: (earnerId) => ({
                url: `/issuers/badgeClasses/claim/${earnerId}`,
                method: "GET",
            }),
            providesTags: (result, error, earnerId) => {
                const status = [
                    ...result?.badgeClasses.map((badge) => badge.Achievements[0].Earners[0].EarnerAchievements.status),
                ];
                return status
                    ? [
                          ...result.badgeClasses.map(({ id }) => ({ type: "BadgeEarner", id })),
                          { type: "BadgeEarner", id: `LIST-${earnerId}` },
                      ]
                    : [{ type: "BadgeEarner", id: `LIST-${earnerId}` }];
            },
        }),

        deleteBadge: builder.mutation({
            query: (badgeId) => ({
                url: `/issuers/badgeClasses/${badgeId}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "BadgeIssuer", id: `LIST` }],
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
