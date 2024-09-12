import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth/authApi";
import { badgeApi } from "./api/badgeManagement/badgeApi";

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [badgeApi.reducerPath]: badgeApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(badgeApi.middleware),
});

export default store;
