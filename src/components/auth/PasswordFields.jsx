import { useMemo } from "react";
import { Box, Stack, Typography, LinearProgress } from "@mui/material";
import FormInput from "../../components/FormInput";
import { getPasswordStrength, validatePassword } from "../../utils/auth/passwordUtils"; // Assume you create a utils file for the functions
import theme from "../../assets/themes";

const PasswordFields = ({
    control,
    errors = {},
    watch,
    passwordName = "password",
    passwordConfirmName = "passwordConfirm",
}) => {
    const watchPassword = watch(passwordName, "");
    const passwordStrength = useMemo(() => getPasswordStrength(watchPassword), [watchPassword]);
    const validationState = useMemo(() => validatePassword(watchPassword), [watchPassword]);

    return (
        <Stack spacing={2}>
            <FormInput
                name={passwordName}
                label="New password"
                control={control}
                required
                type="password"
                errorMessage={errors[passwordName]?.message || ""}
                aria-label="Password"
            />

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
                                    passwordStrength < 40 ? "red" : passwordStrength < 80 ? "orange" : "green",
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

            <Box mt={2}>
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: "bold" }}>
                    Your password must contain:
                </Typography>
                <Typography variant="body2" color={validationState.hasMinLength ? "success.main" : "text.secondary"}>
                    {validationState.hasMinLength ? "✔" : "✖"} At least 10 characters
                </Typography>
                <Typography variant="body2" color={validationState.hasLowercase ? "success.main" : "text.secondary"}>
                    {validationState.hasLowercase ? "✔" : "✖"} Contains a lowercase letter
                </Typography>
                <Typography variant="body2" color={validationState.hasUppercase ? "success.main" : "text.secondary"}>
                    {validationState.hasUppercase ? "✔" : "✖"} Contains an uppercase letter
                </Typography>
                <Typography variant="body2" color={validationState.hasNumber ? "success.main" : "text.secondary"}>
                    {validationState.hasNumber ? "✔" : "✖"} Contains a number
                </Typography>
                <Typography variant="body2" color={validationState.hasSpecialChar ? "success.main" : "text.secondary"}>
                    {validationState.hasSpecialChar ? "✔" : "✖"} Contains a special character
                </Typography>
            </Box>

            <FormInput
                name={passwordConfirmName}
                label="Confirm new password"
                control={control}
                required
                type="password"
                errorMessage={errors[passwordConfirmName]?.message || ""}
                aria-label="Confirm Password"
            />
        </Stack>
    );
};

export default PasswordFields;
