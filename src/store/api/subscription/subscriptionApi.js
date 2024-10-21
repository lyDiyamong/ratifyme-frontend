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
            providesTags: ["Subscriptions"],
        }),
        // Subscriptions Api
        getSubscritption: builder.query({
            query: ({ page, limit, sort, search }) =>
                `/subscriptions?limit=${limit}&page=${page}&sort=${sort}&search=${search}`,
        }),
        getSubInstitution: builder.query({
            query: (id) => `/subscriptions?institutionId=${id}`,
        }),
        getPaymentSuccess : builder.query({
            query : (paymentId) => `/subscriptions/payments/${paymentId}`
        })
    }),
});

export const { useGetServicePlanQuery, useGetSubscritptionQuery, useGetSubInstitutionQuery, useGetPaymentSuccessQuery } = subscriptionApi;
