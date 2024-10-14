//React import
import { useForm } from "react-hook-form";

// MUI component
import { Stack, Box, Typography, Button, Grid } from "@mui/material";

// Custom import
import theme from "../../../assets/themes";
import FormInput from "../../../components/FormInput";

// Image import
import ChangePassword from "../../../assets/images/ChangePassword.svg";

const ChangePasswordForm = () => {
    // Form controller
    const { control, handleSubmit, setError, reset } = useForm();

    const onSubmit = (data) => {
        if (data.newPassword !== data.confirmPassword) {
            setError("confirmPassword", {
                type: "manual",
                message: "Passwords do not match",
            });
        } else {
            console.log(data);
            reset();
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
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    noValidate
                >
                    {/* Username */}
                    <FormInput
                        name="name"
                        label="Username"
                        control={control}
                        type="text"
                        required={true}
                        autoComplete="off"
                    />
                    {/* Password */}
                    <FormInput
                        label="Password"
                        name="password"
                        control={control}
                        type="password"
                        required={true}
                        autoComplete="off"
                    />
                    {/* New Password */}
                    <FormInput
                        label="New Password"
                        name="newPassword"
                        control={control}
                        type="password"
                        required={true}
                        autoComplete="new-password"
                    />
                    {/* Confirm Password */}
                    <FormInput
                        label="Confirm Password"
                        name="confirmPassword"
                        control={control}
                        type="password"
                        required={true}
                        autoComplete="new-password"
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
