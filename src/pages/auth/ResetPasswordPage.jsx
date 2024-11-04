// React library import
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

// MUI import
import { Box, Typography, Button, Stack } from "@mui/material";
import { VpnKeyOutlined } from "@mui/icons-material";

// Custom import
import PasswordFields from "../../components/auth/PasswordFields";
import { SpinLoading } from "../../components/loading/SpinLoading";
import OutletImageComponent from "./OutletImageTemplate";
import { passwordSchema } from "../../utils/auth/passwordUtils";
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import theme from "../../assets/themes";

// API import
import { useResetPasswordMutation, useVerifyResetTokenQuery } from "../../store/api/auth/authApi";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { token } = useParams();
    const [resetPassword] = useResetPasswordMutation();

    const { data, error } = useVerifyResetTokenQuery(token, {
        skip: !token,
    });

    const schema = passwordSchema({
        passwordName: "password",
        passwordConfirmName: "passwordConfirm",
    });

    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
        watch,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            password: "",
            passwordConfirm: "",
        },
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (error) {
            navigate("/auth/invalid-reset-password");
        }
    }, [error, navigate]);

    const onSubmit = async (data) => {

        setLoading(true);
        try {
            // Attempt to reset the password
            await resetPassword({ token, ...data }).unwrap();
            // Navigate to success page if successful
            navigate("/auth/reset-password-success");
        } catch (err) {
            console.error("Error resetting password:", err);
            // Redirect to error page if there's an issue with the token
            if (error) {
                navigate("/auth/invalid-reset-password");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ height: "100vh", display: "flex" }}>
            <Box
                sx={{
                    width: { md: "50%", xss: "100%" },
                    mx: "auto",
                    px: 4,
                    backgroundColor: "transparent",
                    maxWidth: "500px",
                }}
            >
                <Stack spacing={2}>
                    <Link to="/">
                        <Box component="img" src={RatifyMELogo} alt="RatifyME Logo" sx={{ width: 150, height: 150 }} />
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
                        <VpnKeyOutlined sx={{ fontSize: "32px", color: theme.palette.primary.dark }} />
                    </Box>
                    <Box my={3}>
                        <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} mb={1}>
                            Set New Password
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Please enter a new password below.
                        </Typography>
                    </Box>
                    {/* Use the new PasswordFields component */}
                    <PasswordFields
                        control={control}
                        errors={errors}
                        watch={watch}
                        schema={schema}
                        passwordName="password"
                        passwordConfirmName="passwordConfirm"
                    />{" "}
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        size="large"
                        disabled={loading || !isValid}
                        sx={{
                            color: theme.palette.customColors.white,
                            fontWeight: theme.fontWeight.bold,
                            borderRadius: theme.customShape.btn,
                            textTransform: "none",
                        }}
                    >
                        {loading ? <SpinLoading size={24} /> : "Continue"}
                    </Button>
                </Stack>
            </Box>

            <OutletImageComponent />
        </Box>
    );
};

export default ResetPasswordPage;
