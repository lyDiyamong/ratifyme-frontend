// React library Import
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Component Import
import AuthLayout from "../layouts/auth";
import SignupPage from "../pages/auth/SignupPage";
import LoginPage from "../pages/auth/LoginPage";

const AuthRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AuthRouter;
