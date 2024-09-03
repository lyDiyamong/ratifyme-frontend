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
        <Container>
            <Grid>
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
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ContactUs;
