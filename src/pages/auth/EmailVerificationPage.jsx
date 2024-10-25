// React library import
import { useEffect, useState } from "react";
import VerificationInput from "react-verification-input";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

// MUI import
import { Box, Typography, Button, Stack } from "@mui/material";

// Custom import
import { useVerifyEmailMutation, useResendVerificationMutation } from "../../store/api/auth/authApi";
import "../../assets/styles/EmailVerificationPage.css";
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import OutletImageComponent from "./OutletImageTemplate";
import theme from "../../assets/themes";
import AlertMessage from "../../components/alert/AlertMessage";
import PageLoading from "../../components/loading/PageLoading";
import useCatchStatus from "../../hooks/useCatchStatus";
import { SpinLoading } from "../../components/loading/SpinLoading";

const EmailVerificationPage = () => {
    // Retrieve email from location.state
    const location = useLocation();
    const { email, roleId } = location.state || {};
    const [verificationCode, setVerificationCode] = useState("");
    const [inputKey, setInputKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Verify Email Mutation
    const [verifyEmail, { isLoading: isVerifying, isError, error, isSuccess, data }] = useVerifyEmailMutation();

    // Resend Email Verification Mutation
    const [resendVerification, { isLoading: isResending, isError: resendError, error: resendErrorData }] =
        useResendVerificationMutation();

    // Call custom hook for handling status messages
    const [message, setMessage] = useCatchStatus(isError || isSuccess, isError ? error?.data?.message : data?.message);

    // Custom hook for resend errors
    const [resendMessage, setResendMessage] = useCatchStatus(isResending, resendError ? resendErrorData?.data?.message : null);
    const [resendSuccess, setResendSuccess] = useState(false);

    const [hasResentVerify, setHasResentVerify] = useState(() => {
        return JSON.parse(localStorage.getItem("hasResentVerify")) || false;
    });

    // Effect to sync hasResent state to local storage
    useEffect(() => {
        localStorage.setItem("hasResent", JSON.stringify(hasResentVerify));

        // Set a timer to clear the value from local storage after 10 minutes
        if (hasResentVerify) {
            const timer = setTimeout(() => {
                setHasResentVerify(false);
                localStorage.removeItem("hasResent");
            }, 120000); // 2 minutes

            // Cleanup function to clear the timeout if the component unmounts
            return () => clearTimeout(timer);
        }
    }, [hasResentVerify]);

    // Handle Verification Submit
    const handleVerify = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            await verifyEmail({ verifyCode: verificationCode }).unwrap();
            navigate(roleId === 2 ? "/price" : "/auth/signup-success");
        } catch (error) {
            setVerificationCode("");
            setInputKey((prevKey) => prevKey + 1);
        } finally {
            setLoading(false);
        }
    };

    // Handle Resend Email Verification
    const handleResendVerification = async () => {
        if (!email) {
            setResendMessage("Email not available to resend verification.");
            setResendSuccess(false);
            return;
        }

        try {
            setHasResentVerify(true);
            setLoading(true);
            await resendVerification({ email }).unwrap();
            setResendMessage("Verification email resent successfully.");
            setResendSuccess(true);
        } catch (error) {
            setResendMessage("Failed to resend verification email.");
            setResendSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <PageLoading isLoading={isVerifying} />

            <Box component="div" sx={{ height: "100vh", display: "flex" }}>
                {message && (
                    <AlertMessage variant="error" onClose={() => setMessage("")}>
                        {message}
                    </AlertMessage>
                )}

                {resendMessage && (
                    <AlertMessage variant={resendSuccess ? "success" : "error"} onClose={() => setResendMessage("")}>
                        {resendMessage}
                    </AlertMessage>
                )}

                <Box
                    flexGrow={0}
                    display="flex"
                    justifyContent="center"
                    sx={{
                        borderRadius: theme.customShape.section,
                        width: { md: "50%", xs: "100%" },
                        mx: "auto",
                        px: 4,
                        backgroundColor: theme.palette.customColors.white,
                    }}
                >
                    <Stack width="100%" maxWidth="450px" gap={2}>
                        <Link to="/">
                            <Box component="img" src={RatifyMELogo} alt="Ratifyme Favicon" sx={{ width: 150, height: 150 }} />
                        </Link>

                        <Box my={3}>
                            <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} mb={1}>
                                Verify Email
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={2}>
                                Please enter the verification code sent to your email address.
                            </Typography>
                        </Box>

                        <Box component="form" onSubmit={handleVerify}>
                            <Box>
                                <VerificationInput
                                    key={inputKey}
                                    validChars="0-9"
                                    inputProps={{ inputMode: "numeric" }}
                                    className="custom-verification-input"
                                    placeholder=""
                                    onComplete={(verifyCode) => setVerificationCode(verifyCode)}
                                    length={4}
                                    autoFocus
                                />

                                {/* Verify Button */}
                                <Button
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    type="submit"
                                    disabled={isVerifying || verificationCode.length !== 4}
                                    sx={{
                                        color: theme.palette.customColors.white,
                                        fontWeight: theme.fontWeight.bold,
                                        borderRadius: theme.customShape.btn,
                                        mt: "72px",
                                    }}
                                >
                                    {loading ? <SpinLoading size={24} /> : "Verify"}
                                </Button>
                            </Box>
                        </Box>

                        {!hasResentVerify && (
                            <>
                                <Typography variant="body2" align="center">
                                    If you haven't received an email in 5 minutes, check your spam, resend or try a different
                                    email.{" "}
                                </Typography>

                                <Typography variant="body2" align="center" color={theme.palette.primary.contrastText} mt={2}>
                                    Didn't receive a code?{" "}
                                    <Button onClick={handleResendVerification} disabled={isResending}>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color={theme.palette.primary.main}
                                            fontWeight="bold"
                                            sx={{ textDecoration: "none", textTransform: "none" }}
                                        >
                                            {isResending ? "Resending..." : "Request again"}
                                        </Typography>
                                    </Button>
                                </Typography>
                            </>
                        )}

                        {hasResentVerify && (
                            <Typography variant="body2" mt={2}>
                                Please check again. If you still haven't recieved an email, try to signup with different email.
                            </Typography>
                        )}
                    </Stack>
                </Box>

                <OutletImageComponent />
            </Box>
        </>
    );
};

export default EmailVerificationPage;
