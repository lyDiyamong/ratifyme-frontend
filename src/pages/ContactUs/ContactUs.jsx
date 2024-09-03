import theme from "../../assets/themes";
import { Container, Box, Typography, Grid, Button } from "@mui/material";
import contactusImg from "../../assets/images/contactUs.svg";

const ContactUs = () => {
    return (
        <Container sx={{ marginTop: 4 }}>
            <Grid container spacing={4}>
                <Grid
                    component="form"
                    item
                    xs={12}
                    md={5}
                    order={{ xs: 2, md: 1 }}
                >
                    <Box>
                        <Typography>
                            
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ContactUs;
