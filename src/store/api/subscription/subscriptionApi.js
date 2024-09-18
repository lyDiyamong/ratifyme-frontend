import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscriptionApi = createApi({
    reducerPath: "subscriptions",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    endpoints: (builder) => ({

        // ServicePlans api
        getServicePlan: builder.query({
            query: () => "/subscriptions/servicePlans",
        }),
        // Subscriptions Api
        getSubscritption : builder.query({
            query : () => "/subscriptions"
        })
    }),
});

export const { useGetServicePlanQuery, useGetSubscritptionQuery } = subscriptionApi;
