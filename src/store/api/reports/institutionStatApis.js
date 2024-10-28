import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const institutionStatApi = createApi({
    reducerPath: 'institutionStatApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    endpoints: (builder) => ({
        fetchInstitutionStats: builder.query({
            query: () => '/institutions/institutionStats',
        }),
    }),
});

export const { useFetchInstitutionStatsQuery } = institutionStatApi;
