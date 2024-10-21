import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const achievementApi = createApi({
    reducerPath: "achievementApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["Achievement"],
    endpoints: (builder) => ({
        sendBadge: builder.mutation({
            query: ({ id, earners }) => ({
                url: `/issuers/${id}/assignEarners`,
                method: "PATCH",
                body: {
                    earnerIds: earners,
                },
            }),
            invalidatesTags: [{ type: "Achievement", id: "LIST" }],
        }),
        issueOnBadge: builder.mutation({
            query: ({ achievementId }) => ({
                url: "/issuers/badgeClasses/issueOn",
                method: "PATCH",
                body: {
                    achievementId: achievementId,
                },
            }),
            invalidatesTags: [{ type: "EarnerAchievement", id: "LIST" }],
        }),
        fetchEmailEarner: builder.query({
            query: ({ achievementId }) => ({
                url: `earners/earnerAchievement?achievementId=${achievementId}`,
                method: "GET",
            }),
            providesTags: (result) => {
                // If result exists, map over each earner and return a tag for each one
                if (result?.data) {
                    return [
                        { type: "Achievement", id: "LIST" },
                        ...result.data.map((earner) => ({ type: "Earner", id: earner.Earner.id })),
                    ];
                }
                // Fallback tag if no result
                return [{ type: "Achievement", id: "LIST" }];
            },
        }),
    }),
});

export const { useSendBadgeMutation, useIssueOnBadgeMutation, useFetchEmailEarnerQuery } = achievementApi;
