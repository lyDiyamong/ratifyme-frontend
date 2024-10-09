import { createApi } from "@reduxjs/toolkit/query/react";
import { clearAuthState, setAuthState } from "../../slices/globalSlices";
import { createBaseQuery } from "../../../utils/baseQuery";
import { handleAuthSuccess } from "../../../utils/auth/authHelpers";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: async (args, api, extraOptions) => {
        const baseQuery = createBaseQuery();

        try {
            return await baseQuery(args, api, extraOptions);
        } catch (error) {
            if (error.status === 401) {
                api.dispatch(clearAuthState());
                window.location.href = "/login";
                return { error: { status: 401, data: "Unauthorized" } };
            }

            // Handle other status codes or network errors here
            if (error.status === 500) {
                // Handle server errors
                return { error: { status: 500, data: "Server Error" } };
            }

            // Handle network or unknown errors
            if (!error.status) {
                return { error: { status: "NETWORK_ERROR", data: "Network Error" } };
            }

            throw error;
        }
    },

    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data) => ({
                url: "/auth/signup",
                method: "POST",
                body: data,
            }),
        }),

        verifyEmail: builder.mutation({
            query: (data) => ({
                url: "/auth/verifyEmail",
                method: "POST",
                body: data,
            }),
        }),

        signIn: builder.mutation({
            query: (data) => ({
                url: "/auth/signin",
                method: "POST",
                body: data,
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await handleAuthSuccess(dispatch, queryFulfilled);
            },
        }),

        checkAuth: builder.query({
            query: () => ({
                url: "/auth/checkAuth",
                method: "GET",
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    // Extract currentUser and userId safely
                    const currentUser = data?.user?.currentUser;
                    const userId = currentUser?.id;
                    const roleId = currentUser?.roleId;
                    const addressData = data?.user?.addressData;
                    const institutionData = data?.user?.institutionData;
                    const issuerData = data?.user?.issuerData;
                    const earnerData = data?.user?.earnerData;

                    dispatch(
                        setAuthState({
                            userId,
                            userInfo: currentUser,
                            isAuthenticated: true,
                            roleId,
                            addressData,
                            institutionData,
                            issuerData,
                            earnerData,
                        }),
                    );
                } catch (err) {
                    console.error("CheckAuth failed:", err);
                    // Clear auth state on error (e.g., token invalid/expired)
                    dispatch(clearAuthState());
                }
            },
        }),

        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // Clear authentication state on successful logout
                    dispatch(clearAuthState());

                    // Reset the checkAuth cache (and any related API caches)
                    dispatch(authApi.util.resetApiState());
                } catch (err) {
                    console.error("Logout failed:", err);
                }
            },
        }),

        forgotPassword: builder.mutation({
            query: (data) => ({
                url: "/auth/forgotPassword",
                method: "POST",
                body: data,
            }),
        }),

        verifyResetToken: builder.query({
            query: (token) => `auth/verifyResetToken/${token}`,
        }),

        resetPassword: builder.mutation({
            query: ({ token, ...data }) => ({
                url: `/auth/resetPassword/${token}`,
                method: "PATCH",
                body: data,
            }),
        }),
        updatePassword: builder.mutation({
            query: ({ data }) => ({
                url: `/auth/updatePassword/`,
                method: "PATCH",
                body: data,
            }),
        }),
    }),
});

export const {
    useCheckAuthQuery,
    useSignUpMutation,
    useVerifyEmailMutation,
    useSignInMutation,
    useForgotPasswordMutation,
    useVerifyResetTokenQuery,
    useResetPasswordMutation,
    useLogoutMutation,
    useUpdatePasswordMutation
} = authApi;
