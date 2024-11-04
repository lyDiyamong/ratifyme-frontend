//React import
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// MUI component
import { Stack, Box, Typography, Button, Grid } from "@mui/material";

// Custom import
import FormInput from "../../../components/FormInput";
import AlertMessage from "../../../components/alert/AlertMessage";
import PasswordFields from "../../../components/auth/PasswordFields";
import useCatchStatus from "../../../hooks/useCatchStatus";
import { passwordSchema } from "../../../utils/auth/passwordUtils";
import ChangePassword from "../../../assets/images/ChangePassword.svg";
import theme from "../../../assets/themes";

// Api import
import { useUpdatePasswordMutation } from "../../../store/api/auth/authApi";
import { useState } from "react";
import { SpinLoading } from "../../../components/loading/SpinLoading";

const ChangePasswordForm = () => {
    const [loading, setLoading] = useState(false);

    const combinedSchema = passwordSchema({
        passwordName: "newPassword",
        passwordConfirmName: "passwordConfirm",
    }).concat(
        yup.object({
            passwordCurrent: yup
                .string()
                .required("⚠️ Current password is required")
                .notOneOf([yup.ref("newPassword")], "⚠️ Current password must differ from the new password"),
            newPassword: yup
                .string()
                .notOneOf([yup.ref("passwordCurrent")], "⚠️ New password must differ from the current password")
                .required("⚠️ New password is required"),
        }),
    );

    const { handleSubmit, control, watch, reset } = useForm({
        mode: "onChange",
        resolver: yupResolver(combinedSchema),
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
        try {
            setLoading(true);
            await updatePassword({
                data,
            }).unwrap();
            reset();
        } finally {
            setLoading(false);
        }
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
                        label="Current Password"
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
                            textTransform: "none",
                        }}
                    >
                        {loading ? <SpinLoading size={24} /> : "Save"}
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
                        display: { xss: "none", md: "block" },
                        textTransform: "none",
                    }}
                />
            </Grid>
        </Stack>
        // ============ End Change Password Form ============
    );
};

export default ChangePasswordForm;
