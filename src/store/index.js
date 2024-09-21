import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth/authApi";
import { badgeApi } from "./api/badgeManagement/badgeApi";
import { earnerApi } from "./api/earnerManagement/earnerApis";
import { subscriptionApi } from "./api/subscription/subscriptionApi";
import { achievementTypeApi } from "./api/achievements/achievementTypeApi";
import { criteriaApi } from "./api/badgeManagement/criteriaApi";
import { achievementApi } from "./api/achievements/achievementApi";
import { verifyInvitationApi } from "./api/auth/verifyInvitationApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import gloableReducer from "./slices/globalSlices";

const store = configureStore({
    reducer: {
        global: gloableReducer,
        [authApi.reducerPath]: authApi.reducer,
        [badgeApi.reducerPath]: badgeApi.reducer,
        [earnerApi.reducerPath]: earnerApi.reducer,
        [subscriptionApi.reducerPath]: subscriptionApi.reducer,
        [achievementTypeApi.reducerPath]: achievementTypeApi.reducer,
        [achievementApi.reducerPath]: achievementApi.reducer,
        [criteriaApi.reducerPath]: criteriaApi.reducer,
        [verifyInvitationApi.reducerPath]: verifyInvitationApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            badgeApi.middleware,
            earnerApi.middleware,
            subscriptionApi.middleware,
            achievementTypeApi.middleware,
            achievementApi.middleware,
            criteriaApi.middleware,
            verifyInvitationApi.middleware,
        ),
});
setupListeners(store.dispatch);

export default store;
