//useTheme allow us to use theme that we have already constome in MUI
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";

//Import neccessary item in MUI
import { Box, Grid, Typography, Button } from "@mui/material";

//Import Contact Icon for Contact us page
import LandingContainer from "../../components/styles/LandingContainer";
import FormInput from "../../components/FormInput";

import ContactUsIconSvg from "../../assets/icons/contactUs.svg";

// ============ Start Contact Us Page ============
const ContactUsPage = () => {
    // for use theme costom
    const theme = useTheme();
    // form controller
    const { handleSubmit, control } = useForm();

    // handle submission
    const onSubmit = (data) => console.log(data);

    return (
        // Use Container to wrap the contact us form and contact us icon
        <LandingContainer sx={{ mt: 6 }}>
            <Grid container spacing={4}>
                <Grid
                    component="form"
                    item
                    // xs={12} and md={5} in here is working for responsive
                    xs={12}
                    md={5}
                    //order right here means that we want to give the position to the section
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
                            Thank you for your interest in VerifyME by TechA. We
                            are the experts in digital credentialing, and we are
                            here to help you:
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
                        <FormInput
                            name="name"
                            label="Name"
                            control={control}
                            type="text"
                            required={true}
                        />
                        <FormInput
                            label="Email"
                            name="email"
                            control={control}
                            required={true}
                            type="text"
                        />
                        <FormInput
                            name="organization"
                            label="Organization Name"
                            control={control}
                            type="text"
                            required={true}
                        />
                        <FormInput
                            name="profession"
                            label="Profession"
                            control={control}
                            type="text"
                            required={true}
                        />
                        <Typography variant="">
                            We would like to contact you about our products that
                            may be of interest to you.
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                color: theme.palette.background.default,
                                borderRadius: theme.shape.borderRadius.btn, // Applying custom borderRadius to the Button
                                my: 4,
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={7} order={{ xs: 1, md: 2 }}>
                    <Box
                        component="img"
                        sx={{
                            width: "100%",
                            maxHeight: 600,
                            maxWidth: 600,
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
// ============ Start Contact Us Page ============
