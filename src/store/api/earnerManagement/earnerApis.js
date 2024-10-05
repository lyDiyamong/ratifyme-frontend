import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const earnerApi = createApi({
    reducerPath: "earnerApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["Earner"],
    endpoints: (builder) => ({
        fetchEarner: builder.query({
            query: () => ({
                url: "/earners",
                method: "GET",
            }),
            providesTags: ["Earner"],
        }),

        fetchEarnerById: builder.query({
            query: (id) => ({
                url: `/earners/${id}`,
                method: "GET",
            }),
            providesTags: ["Earner"],
        }),

        deleteEarnerById: builder.mutation({
            query: (id) => ({
                url: `/earners/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Earner"],
        }),

        claimBadge: builder.mutation({
            query: ({ achievementId, badgeClassId, status }) => ({
                url: `/earners/achievement/${achievementId}`,
                method: "PATCH",
                body: { badgeClassId, status },
            }),
            invalidatesTags: ["Earner"],
        }),
    }),
});

export const { useFetchEarnerQuery, useFetchEarnerByIdQuery, useDeleteEarnerByIdMutation, useClaimBadgeMutation } =
    earnerApi;
