// React library import
import { useForm } from "react-hook-form";

// MUI import
import { Box, Grid, Typography, Button } from "@mui/material";

// Custom import
import FormInput from "../../components/FormInput";
import theme from "../../assets/themes";
import LandingContainer from "../../components/styles/LandingContainer";
import SignupImgSvg from "../../assets/images/Signup-illu.svg";

function SignupPage() {
    // form controller
    const { handleSubmit, control } = useForm();

    // handle submission
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
<<<<<<< HEAD
        // ============ Start Container ============
        <LandingContainer sx={{mt : 6}}>
            {/* Start Grid container */}
            <Grid container spacing={4}>
                {/* Start Signup section */}
=======
        // ============ Start container ============
        <LandingContainer sx={{ my: 6 }}>
            {/* Start grid container */}
            <Grid container spacing={4}>
                {/* Start signup section */}
>>>>>>> feature/05-landing-our-customer
                <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }}>
                    {/* Top text container */}
                    <Box mb={5}>
                        <Typography
<<<<<<< HEAD
                        component="h4"
                            sx={{
                                fontSize: theme.typography.h2,
                                fontWeight: theme.fontWeight.bold,
                                lineHeight : 2
=======
                            component="h4"
                            sx={{
                                fontSize: theme.typography.h2,
                                fontWeight: theme.fontWeight.bold,
                                lineHeight: 2,
>>>>>>> feature/05-landing-our-customer
                            }}
                        >
                            Sign up
                        </Typography>
                        <Typography>
                            Let’s get started. Are you ready to be a part of our
                            digital badge? Then boldly move forward with us.
                        </Typography>
                    </Box>
<<<<<<< HEAD
                    {/* Start Form Container */}
=======
                    {/* Start form Container */}
>>>>>>> feature/05-landing-our-customer
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        noValidate // Reset to default
                    >
<<<<<<< HEAD
                        <FormInput
                            name="username"
                            label="Username:"
=======
                        {/* Username */}
                        <FormInput
                            name="username"
                            label="Username"
>>>>>>> feature/05-landing-our-customer
                            control={control}
                            type="text"
                            required={true}
                            // Additional props if needed
                        />
<<<<<<< HEAD
                        <FormInput
                            label="Email:"
=======
                        {/* Email */}
                        <FormInput
                            label="Email"
>>>>>>> feature/05-landing-our-customer
                            name="email"
                            control={control}
                            required={true}
                            type="text"
                        />
<<<<<<< HEAD
                        <FormInput
                            label="Password:"
=======
                        {/* Password */}
                        <FormInput
                            label="Password"
>>>>>>> feature/05-landing-our-customer
                            name="password"
                            control={control}
                            type="password"
                            required={true}
                        />
<<<<<<< HEAD
                        <FormInput
                            label="Confirm Password:"
=======
                        {/* Confirm password */}
                        <FormInput
                            label="Confirm Password"
>>>>>>> feature/05-landing-our-customer
                            name="cfPassword"
                            control={control}
                            type="password"
                            required={true}
                        />
<<<<<<< HEAD
=======
                        {/* Submit button */}
>>>>>>> feature/05-landing-our-customer
                        <Button
                            fullWidth
                            type="submmit"
                            variant="contained"
                            sx={{
                                color: theme.palette.background.default,
                                borderRadius: theme.customShape.btn,
<<<<<<< HEAD
=======
                                fontWeight : theme.fontWeight.bold
>>>>>>> feature/05-landing-our-customer
                            }}
                        >
                            Sign Up
                        </Button>
<<<<<<< HEAD
=======
                        {/* Text description */}
>>>>>>> feature/05-landing-our-customer
                        <Typography
                            textAlign="center"
                            color={theme.palette.text.secondary}
                        >
                            By signing up to create an account I accept{" "}
                            <Typography
                                component="span"
                                sx={{
<<<<<<< HEAD
                                    fontWeight:
                                        theme.typography.fontWeightMedium,
=======
                                    fontWeight: theme.fontWeight.semiBold,
>>>>>>> feature/05-landing-our-customer
                                    color: theme.palette.text.primary,
                                }}
                            >
                                Term of Use{" "}
                            </Typography>
                            and{" "}
                            <Typography
                                component="span"
                                sx={{
<<<<<<< HEAD
                                    fontWeight:
                                        theme.typography.fontWeightMedium,
=======
                                    fontWeight: theme.fontWeight.semiBold,
>>>>>>> feature/05-landing-our-customer
                                    color: theme.palette.text.primary,
                                }}
                            >
                                Privacy Policy.
                            </Typography>
                        </Typography>
                        <Typography
                            textAlign="center"
                            color={theme.palette.text.secondary}
                        >
                            Already have an account?{" "}
                            <Typography
                                component="span"
                                sx={{
                                    color: theme.palette.text.primary,
<<<<<<< HEAD
                                    fontWeight:
                                        theme.fontWeight.bold,
=======
                                    fontWeight: theme.fontWeight.bold,
>>>>>>> feature/05-landing-our-customer
                                }}
                            >
                                Log in
                            </Typography>{" "}
                        </Typography>
                        <Typography
                            color={theme.palette.text.secondary}
                            fontSize={theme.typography.body2}
                        >
                            Let’s get started. Are you ready to be a part of our
                            digital badge? Then boldly move forward with us.
                        </Typography>
                    </Box>
<<<<<<< HEAD
                    {/* End Form Container */}

                </Grid>
                {/* End Signup section */}

                {/* Image Container */}
=======
                    {/* End form container */}
                </Grid>
                {/* End signup section */}

                {/* Image container */}
>>>>>>> feature/05-landing-our-customer
                <Grid item xs={12} md={8} order={{ xs: 1, md: 2 }}>
                    <Box
                        component="img"
                        sx={{
                            width: "100%",
                        }}
                        alt="illustration"
                        src={SignupImgSvg}
                    />
                </Grid>
            </Grid>
        </LandingContainer>
    );
}

export default SignupPage;
