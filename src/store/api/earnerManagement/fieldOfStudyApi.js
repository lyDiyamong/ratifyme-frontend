// React library import
import { createApi } from "@reduxjs/toolkit/query/react";

// Custom import
import { createBaseQuery } from "../../../utils/baseQuery";

export const fieldOfStudyApi = createApi({
    reducerPath: "fieldOfStudyApi",
    baseQuery: createBaseQuery(),
    tagTypes: ["FieldOfStudy", "AcademicLevel"],
    endpoints: (builder) => ({
        fetchFieldOfStudies: builder.query({
            query: () => ({
                url: "/earners/fieldofstudies",
                method: "GET",
            }),
        }),
        // New endpoint for fetching academic levels
        fetchAcademicLevels: builder.query({
            query: () => ({
                url: "/earners/academiclevels",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useFetchFieldOfStudiesQuery,
    useFetchAcademicLevelsQuery,
} = fieldOfStudyApi;
