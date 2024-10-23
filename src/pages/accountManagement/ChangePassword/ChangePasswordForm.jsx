//React import
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// MUI component
import { Stack, Box, Typography, Button, Grid } from "@mui/material";

// Custom import
import theme from "../../../assets/themes";
import FormInput from "../../../components/FormInput";
import ChangePassword from "../../../assets/images/ChangePassword.svg";
import useCatchStatus from "../../../hooks/useCatchStatus";
import AlertMessage from "../../../components/alert/AlertMessage";
import PasswordFields from "../../../components/auth/PasswordFields";
import { passwordSchema } from "../../../utils/auth/passwordUtils";

// Api import
import { useUpdatePasswordMutation } from "../../../store/api/auth/authApi";

const ChangePasswordForm = () => {
    const schema = passwordSchema({
        passwordName: "newPassword",
        passwordConfirmName: "passwordConfirm",
    });

    const {
        handleSubmit,
        control,
        watch,
        reset,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    // Update password hook
    const [updatePassword, { isSuccess, isError, error }] = useUpdatePasswordMutation();
    // Catch status hook
    const [message, setMessage] = useCatchStatus(
        isSuccess || isError,
        isSuccess ? "Update password successfully" : error?.data?.message,
    );
    // Handle react hook form
    const onSubmit = async (data) => {
        await updatePassword({
            data,
        }).unwrap();
        reset();
    };

    return (
        // ============ Start Change Password Form ============
        <Stack
            component="section"
            flexDirection={{ xs: "column-reverse", md: "row" }}
            sx={{
                boxShadow: theme.customShadows.default,
                borderRadius: theme.customShape.section,
                justifyContent: "space-between",
                alignItems: "center",
                padding: 4,
                bgcolor: theme.palette.customColors.white,
                gap: { md: 4, xss: 0 },
            }}
        >
            {message && (
                <AlertMessage variant={isSuccess ? "success" : "error"} onClose={() => setMessage("")}>
                    {message}
                </AlertMessage>
            )}
            {/* Start Text Container */}
            <Stack maxWidth={600} gap={3}>
                <Stack flexDirection="column">
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: theme.typography.h2,
                            fontWeight: theme.fontWeight.bold,
                            color: theme.palette.text.primary,
                            lineHeight: 1.8,
                        }}
                    >
                        Change Password
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: theme.typography.body2,
                            color: theme.palette.text.secondary,
                        }}
                    >
                        Your new password must be different from previous used passwords.
                    </Typography>
                </Stack>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={4} noValidate>
                    {/* Password */}
                    <FormInput
                        label="Password"
                        name="passwordCurrent"
                        control={control}
                        type="password"
                        required={true}
                        autoComplete="off"
                    />
                    {/* Password and Confirm Password field */}
                    <PasswordFields
                        control={control}
                        passwordName="newPassword"
                        passwordConfirmName="passwordConfirm"
                        watch={watch}
                        pwdLabelName="New Password"
                        confirmPwdLableName="Confirm Password"
                    />
                    {/* Submit button */}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            color: theme.palette.background.default,
                            borderRadius: theme.customShape.btn,
                            fontWeight: theme.fontWeight.bold,
                            width: 4,
                        }}
                    >
                        Save
                    </Button>
                </Box>
            </Stack>

            {/* Img Container */}
            <Grid item xs={12} md={8} order={{ xs: 1, md: 2 }}>
                <Box
                    component="img"
                    src={ChangePassword}
                    alt="Change Password"
                    sx={{
                        width: "100%",
                        display: { xs: "none", md: "block" },
                    }}
                />
            </Grid>
        </Stack>
        // ============ End Change Password Form ============
    );
};

export default ChangePasswordForm;
