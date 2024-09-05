// React Library Import
import { useForm } from "react-hook-form";

// MUI Import
import { Box, Grid, Typography, Button } from "@mui/material";

// Custom Import
import FormInput from "../../components/FormInput";
import theme from "../../assets/themes";
import LandingContainer from "../../components/styles/LandingContainer";
import LoginImgSvg from "../../assets/images/Login-illu.svg";

const LoginPage = () => {
    // Form controller
    const { handleSubmit, control } = useForm();

    // Submit Handler
    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        // ============ Start Login Container ============
        <LandingContainer sx={{ mt: 6 }}>
            {/* Start Grid container */}
            <Grid container spacing={4}>
                {/* Start Login section */}
                <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }}>
                    <Box mb={5}>
                        <Typography
                        component="h4"
                            sx={{
                                fontSize: theme.typography.h2,
                                fontWeight: theme.fontWeight.bold,
                                lineHeight: 2

                            }}
                        >
                            Sign In
                        </Typography>
                        <Typography
                            sx={{
                                color: theme.palette.text.secondary,
                            }}
                        >
                            Log In your account to manage your company!
                        </Typography>
                    </Box>
                    {/* Start Form Container */}
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2} noValidate>
                        {/* Email */}
                        <FormInput
                            name="email"
                            control={control}
                            label="Email:"
                            required={true}
                        />
                        {/* Password */}
                        <FormInput
                            name="password"
                            control={control}
                            label="Password:"
                            type="password"
                            required={true}
                        />
                        {/* Submit Button */}
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                                color: theme.palette.background.default,
                                borderRadius: theme.customShape.btn,
                            }}
                        >
                            Log in
                        </Button>
                        <Typography color={theme.palette.text.primary}>
                            Forgot Password?
                        </Typography>
                    </Box>
                    {/* End Form Container */}
                </Grid>
                {/* End Signup section */}
                {/* Image Container */}
                <Grid item xs={12} md={8} order={{ xs: 1, md: 2 }}>
                    <Box
                        component="img"
                        sx={{
                            width: "100%",
                        }}
                        alt="illustration"
                        src={LoginImgSvg}
                    />
                </Grid>
            </Grid>
            {/* End Grid container */}
        </LandingContainer>
        // ============ End Login Container ============
    );
};

export default LoginPage;
