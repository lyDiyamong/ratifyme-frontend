import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const infoApi = createApi({
    reducerPath: "userInfoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        fetchInfoUser: builder.query({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
            providesTags : ['User']
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
            // invalidatesTags: ["User"],
        }),
        deleteUserPf: builder.mutation({
            query: ({ id }) => ({
                url: `/users/upload-profile-image/${id}`,
                method: "DELETE",
            }),
            // invalidatesTags: ["User"],
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
