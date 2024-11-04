// React library import
import { createApi } from "@reduxjs/toolkit/query/react";

// Custom import
import { createBaseQuery } from "../../../utils/baseQuery";


export const achievementTypeApi = createApi({
    reducerPath: "achievementTypeApi",
    baseQuery: createBaseQuery(),
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
