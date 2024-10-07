// React library import
import { useNavigate, Link } from "react-router-dom";

// MUI import
import { Box, Typography, Button, Stack } from "@mui/material";
import { ArrowBackOutlined, ErrorOutlineOutlined } from "@mui/icons-material";

// Custom import
import theme from "../../assets/themes";
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import OutletImageComponent from "./OutletImageTemplate";
import { SpinLoading } from "../../components/loading/SpinLoading";
import { useState } from "react";

const ResetPasswordExpiredPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePasswordReset = async () => {
        setLoading(true);
        try {
            // Simulate an API request to reset the password
            await new Promise((resolve) => setTimeout(resolve, 500));

            navigate("/forgot-password");
        } finally {
            setLoading(false);
        }
    };

    return (
        // ============ Start invalid reset password container ============
        <>
            <Box sx={{ height: "100vh", display: "flex" }}>
                {/* Right side with */}
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
                                backgroundColor: theme.palette.customColors.red100,
                                borderRadius: theme.customShape.card,
                            }}
                        >
                            <ErrorOutlineOutlined sx={{ fontSize: "32px", color: theme.palette.customColors.red200 }} />
                        </Box>

                        <Box my={3}>
                            <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} mb={1}>
                                Password Reset Link Expired!
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                The password reset link has expired. Please request a new one.
                            </Typography>
                        </Box>

                        {/* Button for password reset */}
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            onClick={handlePasswordReset}
                            disabled={loading} // Disable the button while loading
                            sx={{
                                color: theme.palette.customColors.white,
                                fontWeight: theme.fontWeight.bold,
                                borderRadius: theme.customShape.btn,
                                textTransform: "none",
                            }}
                        >
                            {loading ? <SpinLoading size={24} /> : "Request Password Reset"}
                        </Button>

                        <Box>
                            <Link to="/login">
                                <Box display="flex" gap={1} alignItems="center" justifyContent="center" width="100%">
                                    <ArrowBackOutlined
                                        fontSize="32px"
                                        sx={{ color: theme.palette.primary.contrastText }}
                                    />
                                    <Typography
                                        component="a"
                                        href="#"
                                        variant="body1"
                                        color="primary"
                                        sx={{ textDecoration: "none" }}
                                    >
                                        Return to login
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>
                    </Stack>
                </Box>

                {/* Left side with text */}
                <OutletImageComponent />
            </Box>
        </>
        // ============ End invalid reset password container ============
    );
};

export default ResetPasswordExpiredPage;
