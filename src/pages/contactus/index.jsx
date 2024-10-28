//React library import
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";

//MUI import
import { Box, Grid, Typography, Button } from "@mui/material";

//Custom import
import LandingContainer from "../../components/styles/LandingContainer";
import FormInput from "../../components/FormInput";
import ContactUsIconSvg from "../../assets/icons/contactUs.svg";

// ============ Start contact us page ============
const ContactUsPage = () => {
    // For use theme costom
    const theme = useTheme();
    // Form controller
    const { handleSubmit, control, reset } = useForm();

    // Handle submission
    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        // Use Container to wrap the contact us form and contact us icon
        <LandingContainer sx={{ mt: 6 }}>
            <Grid container spacing={4}>
                <Grid
                    item
                    // xs={12} and md={5} in here is working for responsive
                    xs={12}
                    md={5}
                    // order right here means that we want to give the position to the section
                    order={{ xs: 2, md: 1 }}
                >
                    <Box mb={5}>
                        <Typography
                            component="label"
                            sx={{
                                fontSize: theme.typography.h2,
                                fontWeight: theme.fontWeight.bold,
                                lineHeight: 2,
                            }}
                        >
                            Contact Us
                        </Typography>
                        <Typography gutterBottom my={2}>
                            Thank you for your interest in RatifyMe by TechA. We are the experts in digital credentialing, and we
                            are here to help you:
                        </Typography>
                    </Box>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        noValidate
                    >
                        {/* FormInput is the input Feild that we custom */}
                        {/* Name feild */}
                        <FormInput name="name" label="Name" control={control} type="text" required={true} />
                        {/* Email feild */}
                        <FormInput label="Email" name="email" control={control} required={true} type="email" />
                        {/* Organization Name feild */}
                        <FormInput name="organization" label="Organization Name" control={control} type="text" required={true} />
                        {/* Profession feild */}
                        <FormInput name="profession" label="Profession" control={control} type="text" required={true} />
                        {/* Descriptive */}
                        <Typography
                            sx={{
                                color: theme.palette.text.secondary,
                            }}
                        >
                            We would like to contact you about our products that may be of interest to you.
                        </Typography>
                        {/* Button submit that handle submit form */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                color: theme.palette.background.default,
                                borderRadius: theme.customShape.btn, // Applying custom borderRadius to the Button
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Grid>
                {/* Container that scope Icon in contact us form */}
                <Grid item xs={12} md={7} order={{ xs: 1, md: 2 }}>
                    <Box
                        component="img"
                        sx={{
                            width: "100%",
                        }}
                        alt="contactus"
                        src={ContactUsIconSvg}
                    />
                </Grid>
            </Grid>
        </LandingContainer>
    );
};

export default ContactUsPage;
// ============ End contact us page ============
