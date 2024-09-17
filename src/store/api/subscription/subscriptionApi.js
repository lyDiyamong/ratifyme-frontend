import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscriptionApi = createApi({
  reducerPath: "subscriptions",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API,
  }),
  endpoints: (builder) => ({
    getServicePlan: builder.query({
      query: () => "/subscriptions/servicePlan",
    }),
  }),
});

export const { useGetServicePlanQuery } = subscriptionApi;