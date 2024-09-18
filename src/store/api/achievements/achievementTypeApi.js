import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const achievementTypeApi = createApi({
    reducerPath: "achievementTypeApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["AchievementType"],
    endpoints: (builder) => ({
        fetchAchievementType: builder.query({
            query: () => ({
                url: "/issuers/achievementTypes",
                method: "GET",
            }),
            providesTags: (result) => {
                if (result?.data) {
                    return [
                        ...result.data.map(({ id }) => ({ type: "AchievementType", id })),
                        { type: "AchievementType", id: "LIST" },
                    ];
                } else {
                    return [{ type: "AchievementType", id: "LIST" }];
                }
            },
        }),
    }),
});

export const { useFetchAchievementTypeQuery } = achievementTypeApi;
