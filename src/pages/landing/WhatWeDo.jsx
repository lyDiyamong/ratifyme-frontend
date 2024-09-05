// MUI import
import { Typography, Grid, Box } from "@mui/material";

// React library import
import WhatWeDoImg1 from "../../assets/icons/WhatWeDoImg1.svg";
import WhatWeDoImg2 from "../../assets/icons/WhatWeDoImg2.svg";
import theme from "../../assets/themes/index";

//Custom import
import LandingContainer from "../../components/styles/LandingContainer";

//============ start What We Do section ============
export default function WhatWeDo() {
    return (
        <LandingContainer
            sx={{
                my: 5,
                backgroundColor: theme.palette.background,
            }}
        >
            {/* Title */}
            <Typography
                component="h1"
                variant="h1"
                align="center"
                gutterBottom
                sx={{
                    fontSize: theme.typography.h1,
                    fontWeight: theme.fontWeight.bold,
                    color: theme.palette.primary.contrastText,
                    textAlign: "center"
                }}
            >
                What We Do
                <Typography sx={{ textAlign: "center" }}>
                    Brings through
                    the world’s most connected digital credentialing network.
                </Typography>
            </Typography>

            {/* Start first image and paragraph */}
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Box
                        component="img"
                        src={WhatWeDoImg1}
                        alt="What We Do"
                        sx={{ width: "100%", borderRadius: "8px" }}
                    />
                </Grid>
                <Grid container item xs={12} md={6} gap={2.5}>
                    <Typography variant="body1">
                        At VerifyME, we provide fast, secure verification of
                        badges and credentials for students, professionals, and
                        organizations. Our platform simplifies the process,
                        ensuring authenticity and reducing the risk of fraud.
                    </Typography>
                    <Typography variant="body1">
                        With automated systems and real-time checks, we
                        streamline verification, making it efficient and
                        reliable. Whether you're validating student badges or
                        professional credentials, VerifyME guarantees secure,
                        accurate results.
                    </Typography>
                    <Typography variant="body1">
                        Our goal is to make verification seamless and trustworthy. We prioritize security and
                        efficiency, helping organizations and individuals confirm credentials with confidence.
                    </Typography>
                </Grid>
            </Grid>

            {/* End first image and paragraph */}

            {/* Start second image and paragraph */}
            <Grid container spacing={4} alignItems="center" sx={{ mt: 4 }}>
                <Grid container item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }} gap={2.5}>
                    <Typography
                        component="h4"
                        sx={{
                            fontSize: theme.typography.h2,
                            fontWeight: theme.fontWeight.bold,
                            color: theme.palette.text.primary,
                        }}
                    >
                        What Our Service Provide ?
                    </Typography>

                    <Typography variant="body1">
                        Provide the digital credential standard that allows individuals to earn, display, and share
                        verified badges representing their skills and achievements. Each badge contains detailed
                        metadata, such as the issuing organization, criteria for earning the badge, and evidence of the
                        achievement.
                    </Typography>
                    <Typography variant="body1">
                        Making it a trustworthy and portable way to showcase
                        skills across different platforms and communities.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                    <Box
                        component="img"
                        src={WhatWeDoImg2}
                        alt="What We Do"
                        sx={{
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid #E0E0E0",
                        }}
                    />
                </Grid>
            </Grid>

            {/* End second image and paragraph  */}
        </LandingContainer>
    );
}

//============ end What We Do section ============
