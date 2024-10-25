// React library import
import { Link, useLocation } from "react-router-dom";

// MUI import
import { Box, Typography, Stack, Button } from "@mui/material";
import { MailOutline } from "@mui/icons-material";

// Custom import
import theme from "../../assets/themes";
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import OutletImageComponent from "./OutletImageTemplate";
import { SpinLoading } from "../../components/loading/SpinLoading";
import { useState, useEffect } from "react";
import { useForgotPasswordMutation } from "../../store/api/auth/authApi";
import PageLoading from "../../components/loading/PageLoading";

const ForgotPasswordSentPage = () => {
    const location = useLocation();
    const { email } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [forgotPassword] = useForgotPasswordMutation();
    const [hasResent, setHasResent] = useState(() => {
        // Get the persisted value from local storage
        return JSON.parse(localStorage.getItem("hasResent")) || false;
    });

    // Effect to sync hasResent state to local storage
    useEffect(() => {
        localStorage.setItem("hasResent", JSON.stringify(hasResent));

        // Set a timer to clear the value from local storage after 10 minutes
        if (hasResent) {
            const timer = setTimeout(() => {
                setHasResent(false);
                localStorage.removeItem("hasResent");
            }, 120000); // 5 minutes

            // Cleanup function to clear the timeout if the component unmounts
            return () => clearTimeout(timer);
        }
    }, [hasResent]);

    // Function to resend the email
    const handleResendEmail = async () => {
        setLoading(true);
        setHasResent(true); // Set hasResent to true

        try {
            await forgotPassword({ email }).unwrap();
        } catch (error) {
            console.error("Error resending email:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        // ============ Start login container ============
        <Box component="div" sx={{ height: "100vh", display: "flex" }}>
            <PageLoading isLoading={loading} />
            {/* Right side with login form */}
            <Box
                flexGrow={0}
                display="flex"
                justifyContent="center"
                sx={{
                    width: { md: "50%", xss: "100%" },
                    mx: "auto",
                    px: 4,
                    backgroundColor: "transparent",
                }}
            >
                <Stack width="100%" maxWidth="500px" gap={2}>
                    <Link to="/">
                        <Box
                            component="img"
                            src={RatifyMELogo}
                            alt="Ratifyme Favicon"
                            sx={{ width: 150, height: 150 }}
                        />
                    </Link>

                    <Box
                        component="div"
                        width={70}
                        height={70}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: theme.palette.primary.light,
                            borderRadius: theme.customShape.card,
                        }}
                    >
                        <MailOutline sx={{ fontSize: "32px", color: theme.palette.primary.dark }} />
                    </Box>

                    <Box my={3}>
                        <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} mb={1}>
                            Check your email
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={2}>
                            We've sent a password reset instruction link to{" "}
                            <Typography
                                component="span"
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontWeight: theme.fontWeight.bold,
                                    textDecoration: "underline",
                                }}
                            >
                                {email}
                            </Typography>
                            .
                        </Typography>

                        <Typography variant="body2" color="text.secondary" mb={2}>
                            If you haven't received an email in 5 minutes, check your spam,
                            {hasResent ? " or try a different email." : " or resend."}
                            {hasResent && <Link to="/auth/forgot-password"> try a different email</Link>}
                        </Typography>
                        <br />
                        {!hasResent && (
                            <>
                                <Typography variant="body2" color="text.secondary" mb={2}>
                                    Didn't receive the email?
                                </Typography>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    type="button"
                                    onClick={handleResendEmail}
                                    size="large"
                                    disabled={loading}
                                    sx={{
                                        color: theme.palette.customColors.white,
                                        fontWeight: theme.fontWeight.bold,
                                        borderRadius: theme.customShape.btn,
                                        textTransform: "none",
                                    }}
                                >
                                    {loading ? <SpinLoading size={24} /> : "Resend Email"}
                                </Button>
                            </>
                        )}
                    </Box>
                </Stack>
            </Box>

            {/* Left side with text */}
            <OutletImageComponent />
        </Box>
        // ============ End login container ============
    );
};

export default ForgotPasswordSentPage;
