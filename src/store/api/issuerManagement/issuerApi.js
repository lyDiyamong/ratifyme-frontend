import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../../../utils/baseQuery";

const issuerApi = createApi({
    reducerPath : "issuerApi",
    baseQuery : createBaseQuery(),
    tagTypes : ["Issuer"],
    endpoints : (builder) =>({
        getIssuers :  builder.query({
            query : () => "/issuers"
        })
    })

})
export const {useGetIssuersQuery}  = issuerApi