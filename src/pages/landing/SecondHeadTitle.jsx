// React import
import { Link } from "react-router-dom";

// MUI import
import { Box, Typography, Grid, Button } from "@mui/material";

// Custom import
import LandingContainer from "../../components/styles/LandingContainer";
import theme from "../../assets/themes";
import CredentailImage from "../../assets/images/CredentailImage.svg";
import DevicesShare from "../../assets/images/DevicesShare.svg";

const SecondHeadTitle = () => {
    return (
        <LandingContainer>
            <Grid container spacing={4} alignItems="start">
                {/* Image Grid Item First */}
                <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 1 } }}>
                    <Box
                        component="img"
                        src={DevicesShare}
                        alt="What We Do"
                        sx={{
                            width: "100%",
                        }}
                    />
                </Grid>
                {/* Text Grid Item Second */}
                <Grid container item xs={12} md={6} sx={{ order: { xs: 2, md: 2 } }} gap={2.5}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: "40px",
                            maxWidth: 600,
                            fontWeight: theme.fontWeight.semiBold,
                            lineHeight: 1,
                            marginBottom: "20px",
                        }}
                    >
                        Show Your Skills with RatifyME 🌟
                    </Typography>

                    <Typography variant="h4">
                        RatifyME are an innovative solution for showcasing your skills and achievements in a digital format. These
                        verifiable credentials can be effortlessly shared across various platforms, amplifying your professional
                        presence and making your achievements visible to a wider audience.
                    </Typography>
                    <Typography variant="h4">
                        By utilizing our open badge system, you can easily share your accomplishments with potential employers and
                        peers, creating opportunities that align with your career goals. Join a dynamic community where your
                        skills are recognized and celebrated on multiple platforms!
                    </Typography>

                    <a
                        href="https://ratifyme.digital/credential/RMC-e84e6a67-77b5-4bb5-b638-2cb24338de14"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            sx={{
                                backgroundColor: "#FAAD12",
                                color: "white",
                                textTransform: "none",
                                px: 2,
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "#F3C623",
                                },
                            }}
                        >
                            See the Credential
                        </Button>
                    </a>
                </Grid>
            </Grid>

            <Grid container spacing={4} sx={{ mt: 12 }} alignItems="start">
                <Grid container item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }} gap={2.5}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: "40px",
                            maxWidth: 600,
                            fontWeight: theme.fontWeight.semiBold,
                            lineHeight: 1,
                            marginBottom: "20px",
                        }}
                    >
                        Empower Your Skills with RatifyME 🌟
                    </Typography>

                    <Typography variant="h4">
                        RatifyME are a revolutionary way to showcase your skills and achievements in a digital format. They
                        provide verifiable credentials that can be shared across platforms, enhancing your professional profile.
                    </Typography>
                    <Typography variant="h4">
                        With our open badge system, you can earn recognition for your learning journey and connect with
                        opportunities that align with your skills. Join a community where your achievements are acknowledged and
                        celebrated!
                    </Typography>

                    <Link to="/price">
                        <Button
                            sx={{
                                backgroundColor: "#FAAD12",
                                color: "white",
                                textTransform: "none",
                                px: 2,
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "#F3C623",
                                },
                            }}
                        >
                            Start for free
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                    <Box
                        component="img"
                        src={CredentailImage}
                        alt="What We Do"
                        sx={{
                            width: "100%",
                        }}
                    />
                </Grid>
            </Grid>
        </LandingContainer>
    );
};

export default SecondHeadTitle;
