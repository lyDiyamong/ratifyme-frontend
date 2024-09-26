import { setAuthState } from "../store/slices/globalSlices";
import { authApi } from "../store/api/auth/authApi";

export const handleAuthSuccess = async (dispatch, queryFulfilled) => {
    try {
        const { data } = await queryFulfilled;
        dispatch(
            setAuthState({
                userInfo: data.user,
                token: data.token,
                isAuthenticated: true,
            }),
        );
        // Fetch user info to ensure authentication is verified
        dispatch(authApi.endpoints.checkAuth.initiate());
    } catch (err) {
        console.error("Authentication failed:", err);
    }
};
