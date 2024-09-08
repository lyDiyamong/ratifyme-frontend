//React import
import { useForm } from "react-hook-form";

// MUI component
import { Stack, Box, Typography, Button, Grid } from "@mui/material";

// Custom import
import theme from "../../../assets/themes";
import DashboardContainer from "../../../components/styles/DashboardContainer";
import FormInput from "../../../components/FormInput";

// Image import
import ChangePassword from "../../../assets/images/ChangePassword.svg";

const ChangePasswordForm = () => {
    // Form controller
    const { control, handleSubmit, setError } = useForm();

    const onSubmit = (data) => {
        if (data.newPassword !== data.confirmPassword) {
            setError("confirmPassword", {
                type: "manual",
                message: "Passwords do not match",
            });
        } else {
            console.log(data)
        }
    };

    return (
      // ============ Start Change Password Form ============
        <DashboardContainer>
            <Stack
                component="section"
                flexDirection={{ xs: "column", md: "row" }}
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "32px",
                    bgcolor: theme.palette.customColors.white,
                    gap: 4,
                }}
            >
                {/* Start Text Container */}
                <Stack maxWidth={600} gap={4}>
                    <Typography sx={{ fontSize: theme.typography.body1 }}>
                        Your new password must be different from previous used passwords.
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        display="flex"
                        flexDirection="column"
                        gap={4}
                        noValidate
                    >
                        {/* Username */}
                        <FormInput name="name" label="Username" control={control} type="text" required={true} />
                        {/* Password */}
                        <FormInput label="Password" name="password" control={control} type="password" required={true} />
                        {/* New Password */}
                        <FormInput label="New Password" name="newPassword" control={control} type="password" required={true} />
                        {/* Confirm Password */}
                        <FormInput
                            label="Confirm Password"
                            name="confirmPassword"
                            control={control}
                            type="password"
                            required={true}
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
                        }}
                    />
                </Grid>
            </Stack>
        </DashboardContainer>
        // ============ End Change Password Form ============
    );
};

export default ChangePasswordForm;
