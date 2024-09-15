import { createSlice } from "@reduxjs/toolkit";

// Initial state for global slice
const initialState = {
    userId: null,
    userInfo: null,
    token: null,
    isAuthenticated: false,
    role: null,
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload.userInfo;
            state.token = action.payload.token;
            state.userId = action.payload.userInfo?.id;
            state.role = action.payload.userInfo?.role;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.userInfo = null;
            state.token = null;
            state.userId = null;
            state.role = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, logout } = globalSlice.actions;
export default globalSlice.reducer;
