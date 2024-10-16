import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../../../utils/baseQuery";

export const institutionApi = createApi({
    reducerPath: "institutionsApi",
    baseQuery: createBaseQuery(),
    tagTypes: ["Institution"],
    endpoints: (builder) => ({
        getInstitution: builder.query({
            query: () => "/institutions",
        }),
        getInstitutionById: builder.query({
            query: (id) => ({
                url: `/institutions/${id}`,
                method: "GET",
            }),
            providesTags: (result, err, id) => {
                console.log("ID OF FETCH");
                return [{ type: "Institution", id }];
            },
        }),
        updateInstitution: builder.mutation({
            query: ({ id, updatedData }) => ({
                url: `/institutions/${id}`,
                method: "PATCH",
                body: updatedData,
            }),
            invalidatesTags : (result, err, {id}) => {
                console.log("ID OF UPdate", id);
                return [{ type: "Institution", id }];
            },
        }),
    }),
});
export const { useGetInstitutionQuery, useGetInstitutionByIdQuery, useUpdateInstitutionMutation } = institutionApi;
