import { Box, Typography, Stack, Grid, Grid2, Chip, Button } from "@mui/material";
import LandingContainer from "../../components/styles/LandingContainer";
import theme from "../../assets/themes";
import { ArrowForwardIosOutlined, Check, CheckCircleOutline } from "@mui/icons-material";
import BadgeDetail from "../../assets/images/BadgeDetail.svg";
import BadgeDetailEarner from "../../assets/images/BadgeDetailEarner.svg";
import BenefitGrid from "./BenefitGrid";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false); // Reset visibility when the section leaves the viewport
                    }
                });
            },
            { threshold: 0.1 },
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const features = ["Dashboard", "Manage earners", "Add earner", "Manage badges", "Issue badge to earners"];

    return (
        <LandingContainer sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Typography variant="h1" fontWeight={theme.fontWeight.semiBold}>
                How it works
            </Typography>
            <Stack
                variant="outlined"
                sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: "#FAFAFA",
                    border: "1px solid #E4E5EB",
                    flexDirection: "column",
                    alignItems: "center",
                    "@media (min-width: 1000px)": {
                        flexDirection: "row",
                    },
                    // Book grid background style with thicker, semi-transparent lines
                    backgroundImage: `
            linear-gradient(0deg, transparent 99.2%, rgba(0, 0, 0, 0.1) 100%),
            linear-gradient(90deg, transparent 99.2%, rgba(0, 0, 0, 0.1) 100%)
        `,
                    backgroundSize: "80px 80px",
                    backgroundBlendMode: "multiply",
                    // animation: "bounceIn 2s ease-in-out 0.5s",
                    animation: "bounceIn 0.75s ease-in-out 0.5s",
                }}
            >
                {/* Step Label */}
                <Box display="flex" flexDirection="column" justifyContent="start" alignItems="start " mb={2} padding={2} gap={4}>
                    <Box
                        sx={{
                            backgroundColor: "#FFF5CD",
                            color: "#1F2937",
                            borderRadius: "8px",
                            px: 1,
                            py: 0.5,
                            fontWeight: "bold",
                            border: "1px solid #FCD34D",
                        }}
                    >
                        Institution
                    </Box>

                    <Typography variant="h2" fontWeight={theme.fontWeight.semiBold}>
                        Integrate Certifier to automate your workflows
                    </Typography>
                    <Typography variant="h4">
                        Save yourself hours, boost team productivity & increase organizational efficiency by integrating Certifier
                        with your favorite tools and into your existing workflows.
                    </Typography>

                    <Stack gap={3}>
                        <Stack gap={1} mt={2}>
                            <Typography variant="h4" fontWeight={theme.fontWeight.semiBold}>
                                Ready to start ? 🤙
                            </Typography>

                            <Link to="/auth/signup?as=institution">
                                <Button
                                    variant="contained"
                                    endIcon={<ArrowForwardIosOutlined />}
                                    sx={{
                                        color: "white",
                                        backgroundColor: "#rgb(0,107,255)",
                                        textTransform: "none",
                                        fontWeight: theme.fontWeight.bold,
                                        fontSize: { sm: "18px", xss: "14px" },
                                    }}
                                >
                                    Start as Institution
                                </Button>
                            </Link>

                            <Typography variant="h6">
                                *You can create an account and run it on your computer for free. Invite your issuer, and let’s get
                                started with digital credentials.
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>

                <Box component="img" src={BadgeDetail} alt="Image" sx={{ maxWidth: 500, width: "100%" }} />
            </Stack>

            <Stack
                variant="outlined"
                sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: "#FAFAFA",
                    border: "1px solid #E4E5EB",
                    flexDirection: "column",
                    alignItems: "center",
                    "@media (min-width: 1000px)": {
                        flexDirection: "row",
                    },
                    animation: "bounceIn 2s ease-in-out 0.5s",
                }}
            >
                {/* Step Label */}
                <Box display="flex" flexDirection="column" justifyContent="start" alignItems="start " mb={2} padding={2} gap={4}>
                    <Box
                        sx={{
                            backgroundColor: "#FFF5CD",
                            color: "#1F2937",
                            borderRadius: "8px",
                            px: 1,
                            py: 0.5,
                            fontWeight: "bold",
                            border: "1px solid #FCD34D",
                        }}
                    >
                        Issuer
                    </Box>

                    <Typography variant="h2" fontWeight={theme.fontWeight.semiBold}>
                        Generate credentials tailored to your organization's branding
                    </Typography>
                    <Typography variant="h4">
                        Showcase your brand to new audiences and build brand recognition by issuing fully branded digital
                        certificates & badges, personalized.
                    </Typography>

                    <Stack gap={3}>
                        <Grid container rowSpacing={2} columnSpacing={1.5} maxWidth="600px" justifyContent="flex-start">
                            {features.map((feature, index) => (
                                <Grid item key={index}>
                                    <Chip
                                        icon={<CheckCircleOutline sx={{ color: "#004385 !important" }} />}
                                        label={feature}
                                        sx={{
                                            backgroundColor: "#E5F3FF",
                                            color: "#0B3558",
                                            fontWeight: "bold",
                                            borderRadius: "8px",
                                            padding: "4px 8px",
                                            fontSize: "14px",
                                            border: "1px solid #65A9ED",
                                            "& .MuiChip-icon": {
                                                color: "#5A5A5A",
                                            },
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                </Box>

                <Box component="img" src={BadgeDetailEarner} alt="Image" sx={{ maxWidth: 500, width: "100%" }} />
            </Stack>

            <BenefitGrid />

            <style>
                {`
                @keyframes bounceIn {
                    60% {
                        opacity: 1;
                        transform: translateY(15px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>
        </LandingContainer>
    );
};

export default HowItWorks;
