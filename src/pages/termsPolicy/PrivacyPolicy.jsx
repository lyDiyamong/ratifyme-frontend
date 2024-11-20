import { Box, Typography, Container, Divider, Stack, Button } from "@mui/material";
import termsContent from "../../data/privacyPolicy";
import theme from "../../assets/themes";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
            <Typography variant="h1" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
                Privacy Policy
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, textAlign: "center", color: "text.secondary" }}>
                Effective as of November 19, 2024
            </Typography>

            <Typography variant="h4" sx={{ mt: 6, mb: 2 }}>
                Welcome to{" "}
                <a href="/" style={{ color: theme.palette.primary.main }}>
                    <strong>RatifyME</strong>
                </a>
                , your trusted platform for issuing, managing, and verifying Open Badges and digital credentials! We value your
                privacy and are committed to protecting your personal data.
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
                    Security and Privacy First
                </Typography>
                <Typography variant="h4" textAlign="center">
                    RatifyME ensures your credentials are securely managed and verified while adhering to global data protection
                    standards.
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

export default PrivacyPolicy;
