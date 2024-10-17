// React library import
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";

// MUI import
import { Box, Typography, Button, Checkbox, FormControlLabel, IconButton, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Google from "@mui/icons-material/Google";

// Custom import
import FormInput from "../../components/FormInput";
import theme from "../../assets/themes";
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import { SpinLoading } from "../../components/loading/SpinLoading";
import { useSignInMutation } from "../../store/api/auth/authApi";
import { Stack } from "@mui/system";
import LockOpenOutlined from "@mui/icons-material/LockOpenOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import OutletImageComponent from "./OutletImageTemplate";
import useCatchStatus from "../../hooks/useCatchStatus";
import AlertMessage from "../../components/alert/AlertMessage";

const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password too short").required("Password is required"),
});

const LoginPage = () => {
    const [signIn, { isLoading, isError, error, isSuccess, data }] = useSignInMutation();

    const [message, setMessage] = useCatchStatus(isError || isSuccess, isError ? error?.data?.message : data?.message);

    const navigate = useNavigate();
    // Form controller
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
    });

    const [loading, setLoading] = useState(false);

    // Submit handler
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await signIn(data).unwrap();
            navigate("/dashboard");
            reset();
        } catch (err) {
            // Handle exception if necessary, though RTK Query already manages error state
            console.log(err?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        // ============ Start login container ============
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ height: "100vh", display: "flex" }} noValidate>
            {message && (
                <AlertMessage variant="error" onClose={() => setMessage("")}>
                    {message}
                </AlertMessage>
            )}
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

                    <Box my={3}>
                        <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} mb={1}>
                            Welcome to RatifyME! 👋
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                            Please sign-in to your account and start the adventure.
                        </Typography>
                    </Box>

                    <Stack spacing={2}>
                        {/* Email */}
                        <FormInput
                            name="email"
                            type="email"
                            control={control}
                            label="Email"
                            required={true}
                            startIcon={<EmailOutlined />}
                            schema={schema.fields.email}
                        />
                        {/* Password */}
                        <FormInput
                            name="password"
                            control={control}
                            label="Password"
                            type="password"
                            required={true}
                            startIcon={<LockOpenOutlined />}
                            schema={schema.fields.password}
                        />
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
                        <Link to="/forgot-password">
                            <Typography
                                component="a"
                                href="#"
                                variant="body1"
                                color="primary"
                                sx={{
                                    textDecoration: "none",
                                    "&:hover": {
                                        color: theme.palette.primary.dark,
                                    },
                                }}
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
                                color: theme.palette.customColors.orange300,
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
            <OutletImageComponent />
        </Box>
        // ============ End login container ============
    );
};

export default LoginPage;
