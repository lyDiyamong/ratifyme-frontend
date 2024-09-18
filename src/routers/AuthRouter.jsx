// React library Import
import { Route, Routes } from "react-router-dom";

// Component Import
import AuthLayout from "../layouts/auth";
import SignupPage from "../pages/auth/SignupPage";
import LoginPage from "../pages/auth/LoginPage";
import SignupOptPage from "../pages/auth/SignupOptPage";
import CompanyInfoPage from "../pages/auth/CompanyInfoPage";
import SignupSteppers from "../pages/auth/SignupStepperPage";

const AuthRouter = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/get-started" element={<SignupOptPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/company-info" element={<CompanyInfoPage />} />
                <Route path="/signup-step" element={<SignupSteppers />} />
            </Route>
        </Routes>
    );
};

export default AuthRouter;
