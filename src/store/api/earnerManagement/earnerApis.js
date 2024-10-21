// import { Search } from "@mui/icons-material";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const earnerApi = createApi({
    reducerPath: "earnerApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["Earner"],
    endpoints: (builder) => ({
        fetchEarner: builder.query({
            query: ({ issuerId, roleId, page, limit, sort, search }) => {
                // Base query string
                let query = `/earners?page=${page}&limit=${limit}&sort=${sort}`;

                // Conditionally append search
                if (search) query += `&search=${search}`;
                // Append issuerId only if roleId is not 1 (admin)
                if (roleId !== 1) {
                    query += `&issuerId=${issuerId}`;
                }

                return query;
            },
            providesTags: ["Earner"],
        }),

        fetchEarnerById: builder.query({
            query: (id) => ({
                url: `/earners/${id}`,
                method: "GET",
            }),
            providesTags: ["Earner"],
        }),

        deleteEarnerById: builder.mutation({
            query: (id) => ({
                url: `/earners/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Earner"],
        }),

        fetchStatusBadge: builder.query({
            query: ({ id }) => ({
                url: `/earners/earnerAchievement?earnerId=${id}`,
                method: "GET",
            }),
            providesTags: ["Earner"],
        }),
        fetchEarnerAchieById: builder.query({
            query: ({ achieveId, earnerId }) => ({
                url: `/earners/earnerAchievement/${achieveId}/earner/${earnerId}`,
                method: "GET",
            }),
            providesTags: ["Earner"],
        }),
        updateEarnerById: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/earners/fieldofstudies/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Earner"],
        }),
        fetchAcademicBackgroundByUser: builder.query({
            query: ({ userId }) => ({
                url: `/earners/academicbackgrounds/academicByUserId/${userId}`,
                method: "GET",
            }),
            providesTags: ["AcademicBackground"],
        }),
        updateAcademicBackgroundById: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/earners/academicbackgrounds/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["AcademicBackground"],
        }),
        createAcademicBackground: builder.mutation({
            query: ({ ...data }) => ({
                url: `/earners/academicbackgrounds`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["AcademicBackground"],
        }),
        deleteAcademicBackgroundById: builder.mutation({
            query: (id) => ({
                url: `/earners/academicbackgrounds/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["AcademicBackground"],
        }),
    }),
});

export const {
    useFetchEarnerQuery,
    useFetchEarnerByIdQuery,
    useDeleteEarnerByIdMutation,
    useFetchStatusBadgeQuery,
    useFetchEarnerAchieByIdQuery,
    useUpdateEarnerByIdMutation,
    useFetchAcademicBackgroundByUserQuery,
    useUpdateAcademicBackgroundByIdMutation,
    useCreateAcademicBackgroundMutation,
    useDeleteAcademicBackgroundByIdMutation,
} = earnerApi;
