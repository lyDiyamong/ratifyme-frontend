// fieldOfStudyApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
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
            // providesTags: (result) => {
            //     if (result) {
            //         return [
            //             ...result.map(({ id }) => ({ type: 'FieldOfStudy', id })),
            //             { type: 'FieldOfStudy', id: 'LIST' },
            //         ];
            //     } else {
            //         return [{ type: 'FieldOfStudy', id: 'LIST' }];
            //     }
            // },
        }),
        // New endpoint for fetching academic levels
        fetchAcademicLevels: builder.query({
            query: () => ({
                url: "/earners/academiclevels",
                method: "GET",
            }),
            // providesTags: (result) => {
            //     if (result) {
            //         return [
            //             ...result.map(({ id }) => ({ type: 'AcademicLevel', id })),
            //             { type: 'AcademicLevel', id: 'LIST' },
            //         ];
            //     } else {
            //         return [{ type: 'AcademicLevel', id: 'LIST' }];
            //     }
            // },
        }),
    }),
});

export const {
    useFetchFieldOfStudiesQuery,
    useFetchAcademicLevelsQuery, // Export the new hook
} = fieldOfStudyApi;
