import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../../../utils/baseQuery';

export const verifyInvitationApi = createApi({
    reducerPath: 'verifyInvitationApi',
    baseQuery: createBaseQuery(),
    endpoints: (builder) => ({
        verifyInvitation: builder.mutation({
            query: (data) => ({
                url: '/users/verifyInvitation/verifyAsIssuer',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useVerifyInvitationMutation } = verifyInvitationApi;