import { createSlice } from "@reduxjs/toolkit";

// Initial state for global slice
const initialState = {
    userId: null,
    userInfo: null,
    token: null,
    isAuthenticated: false,
    roleId: null,
    addressData: {},
    institutionData: {},
    issuerData: {},
    earnerData: {},
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setAuthState: (state, action) => {
            const { userId, userInfo, token, roleId, addressData, institutionData, issuerData, earnerData } =
                action.payload;
            state.userId = userId;
            state.userInfo = userInfo;
            state.token = token;
            state.isAuthenticated = true;
            state.roleId = roleId;
            state.addressData = addressData;
            state.institutionData = institutionData;
            state.issuerData = issuerData;
            state.earnerData = earnerData;
        },
        clearAuthState: (state) => {
            state.userId = null;
            state.userInfo = null;
            state.token = null;
            state.isAuthenticated = false;
            state.roleId = null;
            state.addressData = initialState.addressData;
            state.institutionData = initialState.institutionData;
            state.issuerData = initialState.issuerData;
            state.earnerData = initialState.earnerData;
        },
    },
});

export const { setAuthState, clearAuthState } = globalSlice.actions;
export default globalSlice.reducer;
