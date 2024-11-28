import { Box, Typography, Container, Divider, Stack, Button } from "@mui/material";
import termsContent from "../../data/termsContent";
import theme from "../../assets/themes";
import { Link } from "react-router-dom";

const TermsOfUse = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
            <Typography variant="h1" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
                Terms of Use
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, textAlign: "center", color: "text.secondary" }}>
                Effective as of November 2, 2024
            </Typography>

            <Typography variant="h4" sx={{ mt: 6, mb: 2 }}>
                Welcome to{" "}
                <a href="/" style={{ color: theme.palette.primary.main }}>
                    <strong>RatifyME </strong>
                </a>
                👋, your trusted platform for issuing, managing, and verifying Open Badges and digital credentials! By accessing
                or using our platform, you acknowledge and agree to these Terms of Use.
            </Typography>
            <Typography variant="h4" sx={{ mb: 6 }}>
                These Terms define the conditions under which you interact with RatifyME’s ecosystem, including credential
                creation, customization, and verification.
            </Typography>

            {termsContent.map((section, index) => (
                <Box key={index} sx={{ mb: 4 }}>
                    <Typography variant="h3" sx={{ fontWeight: theme.fontWeight.semiBold, mb: 1, textTransform: "uppercase" }}>
                        {section.title}
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{ whiteSpace: "pre-wrap", color: "text.primary" }}
                        dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                    {index < termsContent.length - 1 && <Divider sx={{ my: 2 }} />}
                </Box>
            ))}

            <Stack
                sx={{
                    backgroundColor: "#EAF2FF",
                    p: 4,
                    borderRadius: theme.customShape.section,
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h2" sx={{ fontWeight: theme.fontWeight.semiBold, textAlign: "center" }}>
                    Security that scales with your business
                </Typography>
                <Typography variant="h4" textAlign="center">
                    RatifyME scales with you, providing secure administration, authentication, and permissions infrastructure as
                    you grow.
                </Typography>
                <Link to="/auth/get-started">
                    <Button
                        variant="contained"
                        sx={{
                            color: theme.palette.customColors.white,
                            fontWeight: theme.fontWeight.bold,
                            textTransform: "none",
                            px: 3,
                            fontSize: { md: "20px", xss: "16px" },
                        }}
                    >
                        Get Started
                    </Button>
                </Link>
            </Stack>
        </Container>
    );
};

export default TermsOfUse;
