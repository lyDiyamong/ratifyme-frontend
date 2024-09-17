import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearAuthState, setAuthState } from "../../slices/globalSlices";

export const authApi = createApi({
    reducerPath: "authApi",
    // baseQuery: fetchBaseQuery({
    //     baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    //     credentials: "include",
    //     prepareHeaders: (headers, { getState }) => {
    //         const token = getState().global.token;
    //         if (token) {
    //             headers.set("Authorization", `Bearer ${token}`);
    //         }
    //         return headers;
    //     },

    // }),


    // Handle global errors, especially token expiration
    baseQuery: async (args, api, extraOptions) => {
        const baseQuery = fetchBaseQuery({
            baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
            credentials: "include",
        });

        try {
            return await baseQuery(args, api, extraOptions);
        } catch (error) {
            if (error.status === 401) {
                // Handle token expiration or unauthorized access
                api.dispatch(clearAuthState());
                window.location.href = "/login"; // Redirect to login page
                return { error: { status: 401, data: "Unauthorized" } };
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

        signIn: builder.mutation({
            query: (data) => ({
                url: "/auth/signin",
                method: "POST",
                body: data,
            }),

            // handle the sign-in success response
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        setAuthState({
                            userInfo: data.user,
                            token: data.token,
                            isAuthenticated: true,
                        }),
                    );
                    // Fetch user info to ensure authentication is verified
                    dispatch(authApi.endpoints.checkAuth.initiate());
                } catch (err) {
                    console.error("Sign-in failed:", err);
                }
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
                    // Debug
                    // console.log("CheckAuth Response Data:", data);
                    // console.log("User ID:", data.user.id);
                    // console.log("User Info:", data.user);
                    // console.log("Token:", data.token);
                    // console.log("Role:", data.user.roleId);
                    dispatch(
                        setAuthState({
                            userId: data.user.id,
                            userInfo: data.user,
                            isAuthenticated: true,
                            role: data.user.roleId,
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
                await queryFulfilled;
                // Clear authentication state on successful logout
                dispatch(clearAuthState());
            },
        }),
    }),
});

export const { useCheckAuthQuery, useSignUpMutation, useSignInMutation } = authApi;
