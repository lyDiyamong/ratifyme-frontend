// React library import
import { createApi } from "@reduxjs/toolkit/query/react";

// Custom import
import { createBaseQuery } from "../../../utils/baseQuery";

export const criteriaApi = createApi({
    reducerPath: "criteriaApi",
    baseQuery: createBaseQuery(),
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
