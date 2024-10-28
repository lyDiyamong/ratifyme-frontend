import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const criteriaApi = createApi({
    reducerPath: "criteriaApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["Criteria"],
    endpoints: (builder) => ({
        createCriteria: builder.mutation({
            query: (criteria) => ({
                url: "/issuers/criterias",
                method: "POST",
                body: criteria,
            }),
            invalidatesTags: [{ type: "Criteria", id: "LIST" }],
        }),
    }),
});

export const { useCreateCriteriaMutation } = criteriaApi;
