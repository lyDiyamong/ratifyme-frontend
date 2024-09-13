import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth/authApi";
import { setupListeners } from '@reduxjs/toolkit/query';
import { subscriptionApi } from "./api/subscription/subscriptionApi";

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [subscriptionApi.reducerPath] : subscriptionApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, subscriptionApi.middleware),
});
setupListeners(store.dispatch);

export default store;
