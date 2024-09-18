import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth/authApi";
import { badgeApi } from "./api/badgeManagement/badgeApi";
import { achievementTypeApi } from "./api/achievements/achievementTypeApi";
import { criteriaApi } from "./api/badgeManagement/criteriaApi";
import { achievementApi } from "./api/achievements/achievementApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import gloableReducer from "./slices/globalSlices";

const store = configureStore({
    reducer: {
        global: gloableReducer,
        [authApi.reducerPath]: authApi.reducer,
        [badgeApi.reducerPath]: badgeApi.reducer,
        [achievementTypeApi.reducerPath]: achievementTypeApi.reducer,
        [achievementApi.reducerPath]: achievementApi.reducer,
        [criteriaApi.reducerPath]: criteriaApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            achievementTypeApi.middleware,
            badgeApi.middleware,
            achievementTypeApi.middleware,
            achievementApi.middleware,
            criteriaApi.middleware,
        ),
});
setupListeners(store.dispatch);

export default store;
