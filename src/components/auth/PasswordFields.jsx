import { useMemo } from "react";
import { Box, Stack, Typography, LinearProgress } from "@mui/material";
import FormInput from "../../components/FormInput";
import { getPasswordStrength, validatePassword } from "../../utils/auth/passwordUtils";
import theme from "../../assets/themes";

/**
 * PasswordFields component renders the password input fields with validation and strength indicators.
 *
 * @param {object} props - The component props.
 * @param {object} props.control - The control object provided by react-hook-form to manage form state.
 * @param {function} props.watch - The watch function provided by react-hook-form to monitor form inputs.
 * @param {string} [props.passwordName="password"] - The name of the password field.
 * @param {string} [props.passwordConfirmName="passwordConfirm"] - The name of the password confirmation field.
 *
 * @returns {JSX.Element} - Returns the form input fields for password and password confirmation along with the strength indicator and validation hints.
 */

const PasswordFields = ({
    control,
    watch,
    passwordName = "password",
    passwordConfirmName = "passwordConfirm",
    pwdLabelName,
    confirmPwdLableName,
}) => {
    const watchPassword = watch(passwordName, "");
    const passwordStrength = useMemo(() => getPasswordStrength(watchPassword), [watchPassword]);
    const validationState = useMemo(() => validatePassword(watchPassword), [watchPassword]);

    return (
        <Stack spacing={2}>
            <FormInput name={passwordName} label={pwdLabelName} control={control} required type="password" />

            {/* Password strength visual indicator using LinearProgress bars */}
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
                label={confirmPwdLableName}
                control={control}
                required
                type="password"
            />
        </Stack>
    );
};

export default PasswordFields;
