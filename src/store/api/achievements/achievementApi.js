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
    }),
});

export const { useSendBadgeMutation } = achievementApi;
