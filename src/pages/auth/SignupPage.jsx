// React Library Import
import { useForm } from "react-hook-form";

// MUI Import
import { Box, Container, Grid, Typography, Button } from "@mui/material";

// Custom Import
import FormInput from "../../components/FormInput";
import theme from "../../assets/themes";

// Img Import
import SignupImgSvg from "../../assets/images/Signup-illu.svg";

function SignupPage() {
    // form controller
    const { handleSubmit, control } = useForm();

    // handle submission
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        // ============ Start Container ============
        <Container sx={{ my: 4 }}>
            {/* Start Grid container */}
            <Grid container spacing={4}>
                {/* Start Signup section */}
                <Grid item xs={12} md={5} order={{ xs: 2, md: 1 }}>
                    {/* Top text container */}
                    <Box mb={5}>
                        <Typography
                            sx={{
                                fontSize: theme.typography.h3,
                                fontWeight: theme.fontWeight.bold,
                            }}
                        >
                            Sign up
                        </Typography>
                        <Typography>
                            Let’s get started. Are you ready to be a part of our
                            digital badge? Then boldly move forward with us.
                        </Typography>
                    </Box>
                    {/* Start Form Container */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        noValidate // Reset to default
                    >
                        <FormInput
                            name="username"
                            label="Username:"
                            control={control}
                            type="text"
                            required={true}
                            // Additional props if needed
                        />
                        <FormInput
                            label="Email:"
                            name="email"
                            control={control}
                            required={true}
                            type="text"
                        />
                        <FormInput
                            label="Password:"
                            name="password"
                            control={control}
                            type="password"
                            required={true}
                        />
                        <FormInput
                            label="Confirm Password:"
                            name="cfPassword"
                            control={control}
                            type="password"
                            required={true}
                        />
                        <Button
                            fullWidth
                            type="submmit"
                            variant="contained"
                            sx={{
                                color: theme.palette.background.default,
                                borderRadius: theme.customShape.btn,
                            }}
                        >
                            Sign Up
                        </Button>
                        <Typography
                            textAlign="center"
                            color={theme.palette.text.secondary}
                        >
                            By signing up to create an account I accept{" "}
                            <Typography
                                component="span"
                                sx={{
                                    fontWeight:
                                        theme.typography.fontWeightMedium,
                                    color: theme.palette.text.primary,
                                }}
                            >
                                Term of Use{" "}
                            </Typography>
                            and{" "}
                            <Typography
                                component="span"
                                sx={{
                                    fontWeight:
                                        theme.typography.fontWeightMedium,
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
                                    fontWeight:
                                        theme.typography.fontWeightMedium,
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
                    {/* End Form Container */}

                </Grid>
                {/* End Signup section */}

                {/* Image Container */}
                <Grid item xs={12} md={7} order={{ xs: 1, md: 2 }}>
                    <Box
                        component="img"
                        sx={{
                            width: "100%",
                            maxHeight: 600,
                            maxWidth: 600,
                        }}
                        alt="illustration"
                        src={SignupImgSvg}
                    />
                </Grid>
            </Grid>
            {/* End Grid container */}
        </Container>
        // ============ End Container ============
    );
}

export default SignupPage;
