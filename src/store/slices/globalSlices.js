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
        setAuthState: (state, action) => {
            const { userId, userInfo, token, role } = action.payload;
            state.userId = userId;
            state.userInfo = userInfo;
            state.token = token;
            state.isAuthenticated = true;
            state.role = role;
        },
        clearAuthState: (state) => {
            state.userId = null;
            state.userInfo = null;
            state.token = null;
            state.isAuthenticated = false;
            state.role = null;
        },
    },
});

export const { setAuthState, clearAuthState } = globalSlice.actions;
export default globalSlice.reducer;
