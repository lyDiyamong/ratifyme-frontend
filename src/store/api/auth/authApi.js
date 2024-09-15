import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../../slices/globalSlices";

export const authApi = createApi({
    reducerPath: "  ",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    endpoints: (builder) => ({
        checkAuth: builder.query({
            query: () => `/auth/checkAuth`,
        }),
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
                    // Assuming response contains token and userInfo
                    dispatch(
                        setUser({
                            userInfo: data.userInfo, // userInfo from response
                            token: data.token, // token from response
                        }),
                    );
                } catch (err) {
                    console.error("Sign-in failed:", err);
                }
            },
        }),
    }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
