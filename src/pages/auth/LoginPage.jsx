// React library import
import { useForm } from "react-hook-form";

// MUI import
import { Box, Grid, Typography, Button } from "@mui/material";

// Custom import
import FormInput from "../../components/FormInput";
import theme from "../../assets/themes";
import LandingContainer from "../../components/styles/LandingContainer";
import LoginImgSvg from "../../assets/images/Login-illu.svg";

const LoginPage = () => {
    // Form controller
    const { handleSubmit, control } = useForm();

    // Submit handler
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        // ============ Start login container ============
        <LandingContainer sx={{ mt: 6 }}>
            {/* Start grid container */}
            <Grid container spacing={4}>
                {/* Start login section */}
                <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }}>
                    <Box mb={5}>
                        <Typography
                            component="h4"
                            sx={{
                                fontSize: theme.typography.h2,
                                fontWeight: theme.fontWeight.bold,
                                lineHeight: 2,
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
                    {/* Start form container */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        noValidate
                    >
                        {/* Email */}
                        <FormInput
                            name="email"
                            control={control}
                            label="Email"
                            required={true}
                        />
                        {/* Password */}
                        <FormInput
                            name="password"
                            control={control}
                            label="Password"
                            type="password"
                            required={true}
                        />
                        {/* Submit button */}
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                                color: theme.palette.background.default,
                                borderRadius: theme.customShape.btn,
                                fontWeight: theme.fontWeight.bold,
                            }}
                        >
                            Sign in
                        </Button>
                        <Typography color={theme.palette.text.primary}>
                            Forgot Password?
                        </Typography>
                    </Box>
                    {/* End form container */}
                </Grid>
                {/* End signup section */}
                {/* Image container */}
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
            {/* End grid container */}
        </LandingContainer>
        // ============ End login container ============
    );
};

export default LoginPage;
