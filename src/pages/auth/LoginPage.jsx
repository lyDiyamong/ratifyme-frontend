// React library import
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

// MUI import
import { Box, Grid, Typography, Button, Checkbox, FormControlLabel, IconButton, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Google from "@mui/icons-material/Google";

// Custom import
import FormInput from "../../components/FormInput";
import theme from "../../assets/themes";
import LandingContainer from "../../components/styles/LandingContainer";
import LoginImgSvg from "../../assets/images/Login-illu.svg";
import BusinessStartupSvg from "../../assets/images/DrawKitDashbaord.svg";
import DashboardSvg from "../../assets/images/FutureTechnology.svg";
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import { SpinLoading } from "../../components/loading/SpinLoading";
import { useSignInMutation } from "../../store/api/auth/authApi";
import { Stack } from "@mui/system";

const images = [BusinessStartupSvg, DashboardSvg];
const texts = ["Capturing Moments, Creating Memories", "Welcome to the Open Digital Bagde"];

const LoginPage = () => {
    const [signIn, { isLoading, isError, error }] = useSignInMutation();

    const navigate = useNavigate();
    // Form controller
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    const [loading, setLoading] = useState(false);

    // Submit handler
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const result = await signIn(data).unwrap(); // Unwraps the result if signIn is using RTK query

            navigate("/dashboard");
            reset();
        } catch (error) {
            console.error("Error during sign in:", error.message || error);
        } finally {
            setLoading(false); // Ensure loading state is reset even if an error occurs
        }
    };

    const [currentImage, setCurrentImage] = useState(0);
    const [currentText, setCurrentText] = useState(0);

    // Change background image and text
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
            setCurrentText((prevText) => (prevText + 1) % texts.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        // ============ Start login container ============
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ height: "100vh", display: "flex" }}>
            {/* Right side with login form */}
            <Box
                flexGrow={0}
                display="flex"
                justifyContent="center"
                sx={{
                    borderRadius: theme.customShape.section,
                    width: { md: "50%", xss: "100%" },
                    mx: "auto",
                    px: 4,
                    backgroundColor: "transparent",
                }}
            >
                <Stack width="100%" maxWidth="450px" gap={2}>
                    <Link to="/">
                        <Box
                            component="img"
                            src={RatifyMELogo}
                            alt="Ratifyme Favicon"
                            sx={{ width: 150, height: 150 }}
                        />
                    </Link>

                    <Box>
                        <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} mb={1}>
                            Welcome to RatifyME! 👋
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                            Please sign-in to your account and start the adventure.
                        </Typography>
                    </Box>

                    <Stack spacing={2}>
                        {/* Email */}
                        <FormInput name="email" type="email" control={control} label="Email" required={true} />
                        {/* Password */}
                        <FormInput name="password" control={control} label="Password" type="password" required={true} />
                    </Stack>

                    <Stack
                        flexDirection={{ xs: "row", xss: "column" }}
                        alignItems={{ xs: "center", xss: "start" }}
                        justifyContent="space-between"
                    >
                        <FormControlLabel
                            sx={{ color: theme.palette.text.secondary }}
                            control={<Checkbox />}
                            label="Remember Me"
                        />
                        <Link>
                            <Typography
                                component="a"
                                href="#"
                                variant="body2"
                                color="primary"
                                sx={{ textDecoration: "none" }}
                            >
                                Forgot password?
                            </Typography>
                        </Link>
                    </Stack>

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        size="large"
                        disabled={loading}
                        sx={{
                            color: theme.palette.customColors.white,
                            fontWeight: theme.fontWeight.bold,
                            borderRadius: theme.customShape.btn,
                        }}
                    >
                        {loading ? <SpinLoading size={24} /> : "Sign in"}
                    </Button>

                    <Divider sx={{ my: 4, color: theme.palette.text.secondary }}>Or</Divider>

                    <Box display="flex" justifyContent="center" gap={1}>
                        <IconButton
                            sx={{
                                color: theme.palette.primary.dark,
                                backgroundColor: theme.palette.primary.light,
                                borderRadius: theme.customShape.input,
                            }}
                        >
                            <FacebookIcon />
                        </IconButton>
                        <IconButton
                            sx={{
                                color: theme.palette.customColors.orange200,
                                backgroundColor: theme.palette.background.error,
                                borderRadius: theme.customShape.input,
                            }}
                        >
                            <Google />
                        </IconButton>
                        <IconButton
                            sx={{
                                color: theme.palette.secondary.light,
                                backgroundColor: theme.palette.primary.light,
                                borderRadius: theme.customShape.input,
                            }}
                        >
                            <TwitterIcon />
                        </IconButton>
                    </Box>

                    <Typography variant="body2" align="center" color="text.secondary" mt={2}>
                        New on our platform?{" "}
                        <Link to="/get-started">
                            <Typography
                                component="a"
                                href="#"
                                variant="body2"
                                color="primary"
                                sx={{ textDecoration: "none" }}
                            >
                                Create an account
                            </Typography>
                        </Link>
                    </Typography>
                </Stack>
            </Box>

            {/* Left side with text */}
            <Box
                sx={{
                    position: "relative",
                    display: { xss: "none", sm: "none", md: "flex" },
                    backgroundColor: theme.palette.action.selected,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "100vh",
                    width: "50%",
                }}
            >
                <Box
                    flex={1}
                    sx={{
                        backgroundImage: `url(${images[currentImage]})`,
                        backgroundColor: theme.palette.action.selected,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        height: "60vh",
                        width: "100%",
                    }}
                />

                <Typography
                    variant="h4"
                    sx={{
                        position: "absolute",
                        top: "95%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: theme.palette.text.primary,
                        maxWidth: 200,
                        animation: "fadeInOut 5s ease-in-out infinite",
                        textAlign: "center",
                    }}
                >
                    {texts[currentText]}
                </Typography>

                {/* Keyframes for the fade-in and fade-out animation */}
                <style>
                    {`
                        @keyframes fadeInOut {
                            0% { opacity: 0; }
                            50% { opacity: 1; }
                            100% { opacity: 0; }
                        }
                    `}
                </style>
            </Box>
        </Box>
        // ============ End login container ============
    );
};

export default LoginPage;
