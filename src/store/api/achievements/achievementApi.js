import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const achievementApi = createApi({
    reducerPath: "achievementApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["Achievement"],
    endpoints: (builder) => ({
        createAchievement: builder.mutation({
            query: (achievement) => ({
                url: "/issuers/achievements",
                method: "POST",
                body: achievement,
            }),
            invalidatesTags: [{ type: "Achievement", id: "LIST" }],
        }),
    }),
});

export const { useCreateAchievementMutation } = achievementApi;
