// React library import
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createBaseQuery = () => {
    return fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().global.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    });
};