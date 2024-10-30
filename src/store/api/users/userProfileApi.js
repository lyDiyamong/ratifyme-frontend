import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../../../utils/baseQuery";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: createBaseQuery(),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        fetchUser: builder.query({
            query: (id) => ({
                url: `/users/upload-profile-image/${id}`,
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        uploadUserPf: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/upload-profile-image/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        deleteUserPf: builder.mutation({
            query: ({ id }) => ({
                url: `/users/upload-profile-image/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useFetchUserQuery, useUploadUserPfMutation, useDeleteUserPfMutation } = userApi;
