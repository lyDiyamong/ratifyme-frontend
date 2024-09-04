//useTheme allow us to use theme that we have already constome in MUI
import { useTheme } from "@emotion/react";

//Import neccessary item in MUI
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    TextField,
} from "@mui/material";

//Import Contact Icon for Contact us page
import ContactUsIcon from "../../assets/icons/contactUs.svg";

// ============ Start Contact Us Page ============
const ContactUsPage = () => {
    const theme = useTheme();
    return (
        // Use Container to wrap the contact us form and contact us icon
        <Container
            sx={{
                borderRadius: theme.shape.borderRadius.section,
                boxShadow: theme.shadows.default,
                my: 8,
            }}
        >
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
                    <Box>
                        <Typography
                            component="label"
                            sx={{
                                fontWeight: theme.typography.fontWeightLight,
                                fontSize: theme.typography.h3,
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
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius:
                                        theme.shape.borderRadius.input, // Applying custom borderRadius to the input field
                                },
                            }}
                            required
                            id="outlined-required"
                            label="Name"
                        ></TextField>
                        <TextField
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius:
                                        theme.shape.borderRadius.input, // Applying custom borderRadius to the input field
                                },
                            }}
                            required
                            id="outlined-required"
                            label="Email"
                        ></TextField>
                        <TextField
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius:
                                        theme.shape.borderRadius.input, // Applying custom borderRadius to the input field
                                },
                            }}
                            required
                            id="outlined-required"
                            label="Organization Name"
                        ></TextField>
                        <TextField
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius:
                                        theme.shape.borderRadius.input, // Applying custom borderRadius to the input field
                                },
                            }}
                            required
                            id="outlined-required"
                            label="Profession"
                        ></TextField>
                        <Typography variant="">
                            We would like to contact you about our products that
                            may be of interest to you.
                        </Typography>
                        <Button
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
                        src={ContactUsIcon}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ContactUsPage;
// ============ Start Contact Us Page ============