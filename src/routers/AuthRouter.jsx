// React library Import
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// Component Import
import AuthLayout from "../layouts/auth";
import SignupPage from "../pages/auth/SignupPage";
import LoginPage from "../pages/auth/LoginPage";
import SignupOptPage from "../pages/auth/SignupOptPage";
import CodeInvitationPage from "../pages/auth/CodeInvitationPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ForgotPasswordSentPage from "../pages/auth/ForgotPasswordSentPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import ResetPasswordExpiredPage from "../pages/auth/ResetPasswordExpiredPage";
import ResetPasswordSuccessPage from "../pages/auth/ResetPasswordSuccessPage";
import SuccessPayment from "../pages/prices/SuccessPayment";
import EmailVerificationPage from "../pages/auth/EmailVerificationPage";
import SignupSuccessPage from "../pages/auth/SignupSuccessPage";
import NotFoundPage from "../pages/notFound";
import AlertConfirmation from "../components/alert/AlertConfirmation";
import { useEffect, useState } from "react";
import theme from "../assets/themes";

const ProtectedRoute = ({ children }) => {
    const { state } = useLocation();
    const [openAlert, setOpenAlert] = useState(false);
    const [redirect, setRedirect] = useState(false); // Control actual redirection
    const role = new URLSearchParams(window.location.search).get("as");

    // Check if user has verified code for `issuer` or `earner` role
    const isVerified = state?.isVerified || false;

    useEffect(() => {
        // Open AlertConfirmation dialog if verification fails
        if ((role === "issuer" || role === "earner") && !isVerified) {
            setOpenAlert(true);
        }
    }, [role, isVerified]);

    const handleConfirm = () => {
        // Close the dialog and set redirection to true
        setOpenAlert(false);
        setRedirect(true);
    };

    // Redirect after confirmation
    if (redirect) {
        return <Navigate to="/auth/get-started" replace />;
    }

    return (
        <>
            {openAlert && (
                <AlertConfirmation
                    open={openAlert}
                    title="Verification Required"
                    message="You need to verify your invitation code to continue."
                    onConfirm={handleConfirm}
                    onClose={() => setOpenAlert(false)}
                    confirmText="Go to Code Verification"
                    cancelText="Close"
                    iconColor={theme.palette.customColors.red400}
                    iconBgColor={theme.palette.customColors.red100}
                />
            )}
            {!openAlert && children}
        </>
    );
};

const AuthRouter = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/join-invitation" element={<CodeInvitationPage />} />
                <Route path="/get-started" element={<SignupOptPage />} />
                <Route
                    path="/signup"
                    element={
                        <ProtectedRoute>
                            <SignupPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/signup-success" element={<SignupSuccessPage />} />
                <Route path="/verify-email" element={<EmailVerificationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/forgot-password-sent" element={<ForgotPasswordSentPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                <Route path="/invalid-reset-password" element={<ResetPasswordExpiredPage />} />
                <Route path="/reset-password-success" element={<ResetPasswordSuccessPage />} />
                <Route path="/success-payment/:paymentId" element={<SuccessPayment />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AuthRouter;
