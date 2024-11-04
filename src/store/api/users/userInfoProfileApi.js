// React library import
import { createApi } from "@reduxjs/toolkit/query/react";

// Custom import
import { createBaseQuery } from "../../../utils/baseQuery";

export const infoApi = createApi({
    reducerPath: "userInfoApi",
    baseQuery: createBaseQuery(),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        fetchInfoUser: builder.query({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
            providesTags: ["User"],
        }),

        fetchInfoUserById: builder.query({
            query: (id) => ({
                url: `/users/${id}`,
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
            invalidatesTags: ["User"],
        }),
        updateUserProfile: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useFetchInfoUserQuery,
    useFetchInfoUserByIdQuery,
    useDeleteUserPfMutation,
    useUploadUserPfMutation,
    useUpdateUserProfileMutation,
} = infoApi;
