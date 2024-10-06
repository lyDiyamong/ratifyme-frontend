// React library import
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// MUI import
import { Box, Typography, Button, LinearProgress, Stack } from "@mui/material";
import { VpnKeyOutlined } from "@mui/icons-material";

// Custom imports
import FormInput from "../../components/FormInput";
import theme from "../../assets/themes";
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import { SpinLoading } from "../../components/loading/SpinLoading";
import OutletImageComponent from "./OutletImageTemplate";
import { useResetPasswordMutation } from "../../store/api/auth/authApi";

// Password validation schema
const schema = yup.object({
    password: yup
        .string()
        .min(10, "⚠️ Your password must be at least 10 characters.")
        .matches(/[a-z]/, "⚠️ Your password must contain at least one lowercase letter.")
        .matches(/[A-Z]/, "⚠️ Your password must contain at least one uppercase letter.")
        .matches(/\d/, "⚠️ Your password must contain at least one number.")
        .matches(/[@$!%*?&]/, "⚠️ Your password must contain at least one special character.")
        .required("Password is required"),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password")], "⚠️ Passwords must match")
        .required("Confirm password is required"),
});

// Password strength calculation
const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 10) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    if (/[@$!%*?&]/.test(password)) strength += 20;
    return strength;
};

// Validate password rules
const validatePassword = (password) => {
    return {
        hasMinLength: password.length >= 10,
        hasLowercase: /[a-z]/.test(password),
        hasUppercase: /[A-Z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[@$!%*?&]/.test(password),
    };
};

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { token } = useParams();
    const [resetPassword, { isLoading, isError }] = useResetPasswordMutation();

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

    const watchPassword = watch("password", "");

    // Memoize strength and validation states to avoid unnecessary calculations
    const passwordStrength = useMemo(() => getPasswordStrength(watchPassword), [watchPassword]);
    const validationState = useMemo(() => validatePassword(watchPassword), [watchPassword]);

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            await resetPassword({ token, ...data }).unwrap();
            navigate("/dashboard");
        } catch (error) {
            console.error("Error during password reset:", error.message || error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ height: "100vh", display: "flex" }}>
            {/* Right side with login form */}
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

                    {/* Password Form */}
                    <Stack spacing={2}>
                        <FormInput
                            name="password"
                            label="Password"
                            control={control}
                            required
                            type="password"
                            errorMessage={errors.password?.message}
                            aria-label="Password"
                        />

                        {/* Password Strength Meter broken into 5 segments */}
                        <Box sx={{ display: "flex", gap: 0.5 }}>
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <LinearProgress
                                    key={index}
                                    variant="determinate"
                                    value={passwordStrength >= (index + 1) * 20 ? 100 : 0}
                                    sx={{
                                        flex: 1,
                                        height: 5,
                                        borderRadius: 5,
                                        backgroundColor: theme.palette.customColors.lightGray,
                                        "& .MuiLinearProgress-bar": {
                                            backgroundColor:
                                                passwordStrength < 40
                                                    ? "red"
                                                    : passwordStrength < 80
                                                    ? "orange"
                                                    : "green",
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                        <Stack direction="row">
                            <Typography
                                variant="caption"
                                sx={{
                                    color:
                                        passwordStrength === 0
                                            ? "text.secondary"
                                            : passwordStrength < 40
                                            ? "error.main"
                                            : passwordStrength < 80
                                            ? "warning.main"
                                            : "success.main",
                                }}
                            >
                                Password Strength:{" "}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontWeight: "bold",
                                    color:
                                        passwordStrength === 0
                                            ? "text.secondary"
                                            : passwordStrength < 40
                                            ? "error.main"
                                            : passwordStrength < 80
                                            ? "warning.main"
                                            : "success.main",
                                }}
                            >
                                {passwordStrength === 0
                                    ? "Empty"
                                    : passwordStrength < 40
                                    ? "Weak"
                                    : passwordStrength < 80
                                    ? "Medium"
                                    : "Strong"}
                            </Typography>
                        </Stack>

                        {/* Password Validation Feedback */}
                        <Box mt={2}>
                            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: "bold" }}>
                                Your password must contain:
                            </Typography>
                            <Typography
                                variant="body2"
                                color={validationState.hasMinLength ? "success.main" : "text.secondary"}
                            >
                                {validationState.hasMinLength ? "✔" : "✖"} At least 10 characters
                            </Typography>
                            <Typography
                                variant="body2"
                                color={validationState.hasLowercase ? "success.main" : "text.secondary"}
                            >
                                {validationState.hasLowercase ? "✔" : "✖"} Contains a lowercase letter
                            </Typography>
                            <Typography
                                variant="body2"
                                color={validationState.hasUppercase ? "success.main" : "text.secondary"}
                            >
                                {validationState.hasUppercase ? "✔" : "✖"} Contains an uppercase letter
                            </Typography>
                            <Typography
                                variant="body2"
                                color={validationState.hasNumber ? "success.main" : "text.secondary"}
                            >
                                {validationState.hasNumber ? "✔" : "✖"} Contains a number
                            </Typography>
                            <Typography
                                variant="body2"
                                color={validationState.hasSpecialChar ? "success.main" : "text.secondary"}
                            >
                                {validationState.hasSpecialChar ? "✔" : "✖"} Contains a special character
                            </Typography>
                        </Box>

                        <FormInput
                            name="passwordConfirm"
                            label="Confirm Password"
                            control={control}
                            required
                            type="password"
                            errorMessage={errors.passwordConfirm?.message}
                            aria-label="Confirm Password"
                        />
                    </Stack>

                    {/* Continue Button */}
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

            {/* Left side with text */}
            <OutletImageComponent />
        </Box>
    );
};

export default ResetPasswordPage;
