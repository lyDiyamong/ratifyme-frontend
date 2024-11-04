// React library import
import { createApi } from "@reduxjs/toolkit/query/react";

// Custom import
import { createBaseQuery } from "../../../utils/baseQuery";

// API configuration
export const badgeApi = createApi({
    reducerPath: "badgeApi",
    baseQuery: createBaseQuery(),
    tagTypes: ["Badge", "BadgeIssuer", "BadgeEarner", "Earner"],
    endpoints: (builder) => ({
        // Fetch badges by issuerId
        fetchBadges: builder.query({
            query: ({ field = "", fk = "", limit = 100, page = 1, search = "" }) => ({
                url: `/issuers/badgeClasses?page=${page}&${field}=${fk}&limit=${limit}&search=${search}`,
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
                { type: "BadgeIssuer", id: "LIST" },
                { type: "Badge", id: "LIST" },
            ],
        }),

        // Delete a badge
        deleteBadge: builder.mutation({
            query: (badgeId) => ({
                url: `/issuers/badgeClasses/${badgeId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result) => [
                { type: "BadgeIssuer", id: "LIST" },
                { type: "Badge", id: "LIST" },
            ],
        }),

        updateBadge: builder.mutation({
            query: ({ id, updatedBadge }) => ({
                url: `/issuers/badgeClasses/editBadge/${id}`,
                method: "PATCH",
                body: updatedBadge,
            }),
            invalidatesTags: (result) => [
                { type: "BadgeIssuer", id: "LIST" },
                { type: "Badge", id: "LIST" },
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
            query: ({ earnerId, page = 1, limit = 100, search = "" }) => ({
                url: `/issuers/badgeClasses/earner/${earnerId}?page=${page}&limit=${limit}&search=${search}`,
                method: "GET",
            }),
            providesTags: (result, error, { earnerId }) => {
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
            invalidatesTags: (result, error, { earnerId, achievementIds }) => {
                const tags = [{ type: "BadgeEarner", id: `LIST-${earnerId}` }];

                // Check if achievementIds is an array
                if (Array.isArray(achievementIds)) {
                    // Only add tags for achievementIds if it is an array
                    tags.push(...achievementIds.map((id) => ({ type: "BadgeEarner", id })));
                } else {
                    console.warn("achievementIds is not an array:", achievementIds);
                }

                return tags;
            },
        }),

        fetchClaimBadgeByEarner: builder.query({
            query: ({ earnerId, page = 1, limit = 100, search = "" }) => ({
                url: `/issuers/badgeClasses/claim/${earnerId}?page=${page}&limit=${limit}&search=${search}`,
                method: "GET",
            }),
            providesTags: (result, error, { earnerId }) => {
                const badgesWithTrueStatus =
                    result?.badgeClasses?.filter(
                        (badge) => badge.Achievements?.[0]?.Earners?.[0]?.EarnerAchievements?.status === true,
                    ) || [];

                return badgesWithTrueStatus.length
                    ? [
                          ...badgesWithTrueStatus.map((badge) => ({ type: "BadgeEarner", id: badge.id })),
                          { type: "BadgeEarner", id: `LIST-${earnerId}` },
                      ]
                    : [{ type: "BadgeEarner", id: `LIST-${earnerId}` }];
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
