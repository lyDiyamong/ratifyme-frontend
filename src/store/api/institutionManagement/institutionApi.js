import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../../../utils/baseQuery";

export const institutionApi = createApi({
    reducerPath: "institutionsAoi",
    baseQuery: createBaseQuery(),
    tagTypes: ["Issuer"],
    endpoints: (builder) => ({
        getInstitution: builder.query({
            query: () => "/institutions",
        }),
    }),
});
export const { useGetInstitutionQuery } = institutionApi;
