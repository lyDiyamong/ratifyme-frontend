import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    TextField,
} from "@mui/material";
import ContactUsImg from "../../assets/images/contactUs.svg";
import { useTheme } from "@emotion/react";

const ContactUs = () => {
    const theme = useTheme();
    return (
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
                    xs={12}
                    md={5}
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
                                borderRadius: theme.shape.borderRadius.btn,
                                my: 4, // Applying custom borderRadius to the input field
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
                        src={ContactUsImg}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ContactUs;
