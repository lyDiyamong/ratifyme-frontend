import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// API configuration
export const badgeApi = createApi({
    reducerPath: "badgeApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["Badge", "BadgeIssuer", "BadgeEarner", "Earner"],
    endpoints: (builder) => ({
        // Fetch badges by issuerId
        fetchBadges: builder.query({
            query: ({ field, fk, limit, page = 1 }) => ({
                url: `/issuers/badgeClasses?page=${page}&${field}=${fk}&limit=${limit}`,
                // method: "GET",
            }),
            providesTags: (result) => {
                return result?.data
                    ? [
                          // Provide a tag for each badge by its id
                          ...result.data.map(({ id }) => ({ type: "Badge", id })),
                          // Provide a tag for the entire list of badges related to the Issuer
                          { type: "Badge", id: "LIST" },
                      ]
                    : [{ type: "Badge", id: "LIST" }];
            },
        }),

        // Create a new badge
        createBadge: builder.mutation({
            query: (badge) => ({
                url: "issuers/badgeClasses/addBadge",
                method: "POST",
                body: badge,
            }),
            invalidatesTags: (result) => [
                { type: "BadgeIssuer", id: `LIST-${result?.issuerId}` },
                [{ type: "Badge", id: "LIST" }],
            ],
        }),

        uploadCerti: builder.mutation({
            query: ({ achieveId, earnerId, uploadedCert }) => ({
                url: `/earners/uploadCerti/${achieveId}/earner/${earnerId}`,
                method: "POST",
                body: uploadedCert,
            }),
            invalidatesTags: ["Badge"],
        }),
        // Fetch one data for one badge class
        fetchOneBadge: builder.query({
            query: (id) => ({
                url: `issuers/badgeClasses/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => {
                return [{ type: "Badge", id }];
            },
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
                          { type: "BadgeInstitution", id: `LIST` },
                      ]
                    : [{ type: "BadgeInstitution", id: `LIST` }];
            },
        }),

        // Fetch badge for each issuer
        fetchBadgesByIssuer: builder.query({
            query: (issuerId) => ({
                url: `issuers/${issuerId}`,
                method: "GET",
            }),
            providesTags: (result, error, issuerId) => {
                return result?.data?.BadgeClasses
                    ? [
                          ...result.data.BadgeClasses.map(({ id }) => ({ type: "BadgeIssuer", id })),
                          { type: "BadgeIssuer", id: `LIST` },
                      ]
                    : [{ type: "BadgeIssuer", id: `LIST` }];
            },
        }),

        fetchBadgeByEarner: builder.query({
            query: ({ earnerId, page, limit }) => ({
                url: `/issuers/badgeClasses/earner/${earnerId}?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: (result, error, earnerId) => {
                return result?.badgeClasses
                    ? [
                          ...result.badgeClasses.map(({ id }) => ({ type: "BadgeEarner", id })),
                          { type: "BadgeEarner", id: `LIST-${earnerId}` },
                      ]
                    : [{ type: "BadgeEarner", id: `LIST-${earnerId}` }];
            },
        }),
        claimBadge: builder.mutation({
            query: ({ earnerId, achievementIds, badgeClassId, status }) => ({
                url: `/earners/achievement/${earnerId}`,
                method: "PATCH",
                body: { achievementIds, badgeClassId, status },
            }),
            // Update to match the tag provided by fetchClaimBadgeByEarner
            invalidatesTags: (result, error, { earnerId }) => [{ type: "Earner", id: `LIST-${earnerId}` }],
        }),

        fetchClaimBadgeByEarner: builder.query({
            query: ({ earnerId, page, limit = 5 }) => ({
                url: `/issuers/badgeClasses/claim/${earnerId}?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: (result, error, earnerId) => {
                const badgesWithTrueStatus =
                    result?.badgeClasses?.filter(
                        (badge) => badge.Achievements?.[0]?.Earners?.[0]?.EarnerAchievements?.status === true,
                    ) || [];

                // Providing tags for caching based on the filtered badges
                return badgesWithTrueStatus.length
                    ? [
                          ...result.badgeClasses.map((badgeClasses) => ({ type: "Earner", id: badgeClasses.id })),
                          { type: "Earner", id: `LIST-${earnerId}` },
                      ]
                    : [{ type: "Earner", id: `LIST-${earnerId}` }];
            },
        }),

        deleteBadge: builder.mutation({
            query: (badgeId) => ({
                url: `/issuers/badgeClasses/${badgeId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result) => [
                // Invalidate the entire Badge list when a new badge is created
                { type: "Badge", id: "LIST" },
                // Optionally, invalidate badges based on issuerId if you want finer control
                result?.issuerId ? { type: "Badge", id: `LIST-${result.issuerId}` } : { type: "Badge", id: "LIST" },
            ],
        }),
        updateBadge: builder.mutation({
            query: ({ id, updatedBadge }) => ({
                url: `/issuers/badgeClasses/editBadge/${id}`,
                method: "PATCH",
                body: updatedBadge,
            }),
            invalidatesTags: (result, error, { id }) => {
                return [{ type: "Badge", id }, [{ type: "BadgeIssuer", id: `LIST` }]];
            },
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
    useUpdateBadgeMutation,
    useUploadCertiMutation,
    useClaimBadgeMutation,
} = badgeApi;
