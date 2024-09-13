import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth/authApi";
import { badgeApi } from "./api/badgeManagement/badgeApi";
import { earnerApi } from "./api/earnerManagement/earnerApis";
import { subscriptionApi } from "./api/subscription/subscriptionApi";

import { setupListeners } from "@reduxjs/toolkit/query";
import gloableReducer from "./slices/globalSlices";

const store = configureStore({
    reducer: {
        global: gloableReducer,
        [authApi.reducerPath]: authApi.reducer,
        [badgeApi.reducerPath]: badgeApi.reducer,
        [earnerApi.reducerPath]: earnerApi.reducer,
        [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            badgeApi.middleware,
            earnerApi.middleware,
            subscriptionApi.middleware,
        ),
});
setupListeners(store.dispatch);

export default store;
