// MUI import
import { Box, Paper, Typography } from "@mui/material";

// Custom import
import ServiceDetail from "../../components/ServiceDetail";
import LandingContainer from "../../components/styles/LandingContainer";
import theme from "../../assets/themes";

const PricePage = () => {
    return (
        // ============ Start servicePlanSection ============
        <LandingContainer>
            <Paper
                sx={{
                    mx: "auto",
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                    boxShadow: theme.shadows.default,
                    borderRadius: theme.customShape.section,
                    mt: 4,
                }}
            >
                {/* Typography refer to Title of service plan */}
                <Typography
                    sx={{
                        fontFamily: theme.typography.fontFamily,
                        fontSize: theme.typography.h1,
                        textAlign: "center",
                        fontWeight: 700,
                    }}
                >
                    Badge Service Pricing
                </Typography>

                {/* Typography refer to service plan detail */}
                <Typography
                    sx={{
                        fontFamily: theme.typography.fontFamily,
                        fontSize: theme.typography.body1,
                    }}
                >
                    Our Digital Badge Service offers a comprehensive solution
                    for recognizing and showcasing achievements in a digital
                    format. Ideal for educational institutions, professional
                    organizations, and corporate training programs, our service
                    allows you to create, manage, and distribute digital badges
                    that are secure, verifiable, and easily shareable across
                    social media platforms. Each badge is customizable, ensuring
                    it reflects your brand identity while celebrating the
                    recipient’s accomplishments.
                </Typography>

                {/* Box refer to container of card */}
                <Box sx={{ width: "100%" }}>
                    <ServiceDetail button />
                </Box>
            </Paper>
        </LandingContainer>
        // ============ End servicePlanSection ============
    );
};

export default PricePage;
