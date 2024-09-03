import { Box, Container, Grid, Typography, Button } from "@mui/material";
import theme from "../../assets/themes/index";
import ContactUsImg from "../../assets/images/contactUs.svg";
const ContactUs = () => {
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
                </Grid>
            </Grid>
        </Container>
    );
};

export default ContactUs;
