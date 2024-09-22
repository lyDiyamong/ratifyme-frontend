import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
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
            })
        })
    }),
});

export const { useFetchUserQuery, useUploadUserPfMutation, useDeleteUserPfMutation } = userApi;
