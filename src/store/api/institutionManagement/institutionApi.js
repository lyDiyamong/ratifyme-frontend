import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../../../utils/baseQuery";

export const institutionApi = createApi({
    reducerPath: "institutionsApi",
    baseQuery: createBaseQuery(),
    tagTypes: ["Institution"],
    endpoints: (builder) => ({
        // Query
        getInstitution: builder.query({
            query: ({ page, limit, sort, search }) =>
                `/institutions?limit=${limit}&page=${page}&sort=${sort}&search=${search}`,
        }),
        getInstitutionById: builder.query({
            query: (id) => ({
                url: `/institutions/${id}`,
                method: "GET",
            }),
            providesTags: (result, err, id) => {
                return [{ type: "Institution", id }];
            },
        }),
        // Mutation
        updateInstitution: builder.mutation({
            query: ({ id, updatedData }) => ({
                url: `/institutions/${id}`,
                method: "PATCH",
                body: updatedData,
            }),
            invalidatesTags: (result, err, { id }) => {
                return [{ type: "Institution", id }];
            },
        }),
        uploadInstitutionImg: builder.mutation({
            query: ({ id, data }) => ({
                url: `/institutions/instiImage/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, err, { id }) => {
                return [{ type: "Institution", id }];
            },
        }),
        deleteInstitutionImg: builder.mutation({
            query: ({ id }) => ({
                url: `/institutions/instiImage/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, err, { id }) => {
                return [{ type: "Institution", id }];
            },
        }),
    }),
});
export const {
    useGetInstitutionQuery,
    useGetInstitutionByIdQuery,
    useUpdateInstitutionMutation,
    useUploadInstitutionImgMutation,
    useDeleteInstitutionImgMutation,
} = institutionApi;
