import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../../../utils/baseQuery";

export const subscriptionApi = createApi({
    reducerPath: "subscriptions",
    baseQuery: createBaseQuery(),
    endpoints: (builder) => ({
        // ServicePlans api
        getServicePlan: builder.query({
            query: () => "/subscriptions/servicePlans",
            providesTags: ["Subscriptions"],
        }),
        // Subscriptions Api
        getSubscritption: builder.query({
            query: ({ page, limit, sort, search }) => `/subscriptions?limit=${limit}&page=${page}&sort=${sort}&search=${search}`,
        }),
        getSubInstitution: builder.query({
            query: (id) => `/subscriptions?institutionId=${id}`,
        }),
        getPaymentSuccess: builder.query({
            query: (paymentId) => `/subscriptions/payments/${paymentId}`,
        }),
    }),
});

export const { useGetServicePlanQuery, useGetSubscritptionQuery, useGetSubInstitutionQuery, useGetPaymentSuccessQuery } =
    subscriptionApi;
