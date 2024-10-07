// React library import
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";

// MUI import
import { Box, Typography, Button, Stack } from "@mui/material";
import { ArrowBackOutlined, LockOutlined } from "@mui/icons-material";
import { useForgotPasswordMutation } from "../../store/api/auth/authApi";
import EmailOutlined from "@mui/icons-material/EmailOutlined";

// Custom import
import FormInput from "../../components/FormInput";
import theme from "../../assets/themes";
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import { SpinLoading } from "../../components/loading/SpinLoading";
import OutletImageComponent from "./OutletImageTemplate";
import useCatchStatus from "../../hooks/useCatchStatus";
import AlertMessage from "../../components/alert/AlertMessage";
import PageLoading from "../../components/loading/PageLoading";

const schema = yup.object({
    email: yup
        .string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
        .required("Email is required"),
});

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [fortgotPassword, { isLoading, isError, error, isSuccess, data }] = useForgotPasswordMutation();

    // Call custom hook
    const [message, setMessage] = useCatchStatus(isError || isSuccess, isError ? error?.data?.message : data?.message);

    // Form controller
    const { handleSubmit, control } = useForm({ mode: "onChange" });

    const [loading, setLoading] = useState(false);

    // Submit handler
    const onSubmit = async (data) => {
        setLoading(true);

        try {
            await fortgotPassword(data).unwrap();
            navigate("/forgot-password-sent");
        } finally {
            setLoading(false);
        }
    };

    return (
        // ============ Start forgot password container ============
        <>
            <PageLoading isLoading={isLoading} />
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ height: "100vh", display: "flex" }}
                noValidate
            >
                {message && (
                    <AlertMessage variant="error" onClose={() => setMessage("")}>
                        {message}
                    </AlertMessage>
                )}

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
                                backgroundColor: theme.palette.primary.light,
                                borderRadius: theme.customShape.card,
                            }}
                        >
                            <LockOutlined sx={{ fontSize: "32px", color: theme.palette.primary.dark }} />
                        </Box>

                        <Box my={3}>
                            <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} mb={1}>
                                Forgot Password?
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Don't worry! Fill in you email and we'll send you a link to reset your password.
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
                                placeholder="example@gmail.com"
                            />
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
                                textTransform: "none",
                            }}
                        >
                            {loading ? <SpinLoading size={24} /> : "Continue"}
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

                        <Typography variant="body2" align="center" color="text.secondary" mt={2}>
                            New to RatifyMe?{" "}
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
        </>
        // ============ End forgot password container ============
    );
};

export default ForgotPasswordPage;
