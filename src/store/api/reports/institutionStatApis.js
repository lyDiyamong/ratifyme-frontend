import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../../../utils/baseQuery";

export const institutionStatApi = createApi({
    reducerPath: "institutionStatApi",
    baseQuery: createBaseQuery(),
    endpoints: (builder) => ({
        fetchInstitutionStats: builder.query({
            query: () => "/institutions/institutionStats",
        }),
    }),
});

export const { useFetchInstitutionStatsQuery } = institutionStatApi;
