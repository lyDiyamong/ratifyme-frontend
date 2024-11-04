// React library import
import { createApi } from "@reduxjs/toolkit/query/react";

// Custom import
import { createBaseQuery } from "../../../utils/baseQuery";

export const issuerApi = createApi({
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