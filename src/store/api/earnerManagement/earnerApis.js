// import { Search } from "@mui/icons-material";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const earnerApi = createApi({
    reducerPath: "earnerApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["Earner"],
    endpoints: (builder) => ({
        fetchEarner: builder.query({
            query: ({ issuerId, roleId, page, limit, sort, search, institutionId }) => {
                let query = `/earners?page=${page}&limit=${limit}&sort=${sort}`;
                if (search) query += `&search=${search}`;
                
                if (roleId === 2) {
                    query += `&institutionId=${institutionId}`;
                } else if (roleId !== 1) {
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
        // Fetching By earner id and achievement id
        fetchEarnerAchieById: builder.query({
            query: ({ achieveId, earnerId }) => ({
                url: `/earners/earnerAchievement/${achieveId}/earner/${earnerId}`,
                method: "GET",
            }),
            providesTags: ["Earner"],
        }),
        fetchEarnerAchieveByUid: builder.query({
            query: ({ credId }) => ({
                url: `/earners/earnerAchievementByUid/${credId}`,
                method: "GET",
            }),
            providesTags: ["Earner"],
        }),
        fetchAchieveByid: builder.query({
            query: ({ achievementId }) => ({
                url: `/earners/achievementById/${achievementId}`,
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
    useFetchEarnerAchieveByUidQuery,
    useFetchAchieveByidQuery
} = earnerApi;
