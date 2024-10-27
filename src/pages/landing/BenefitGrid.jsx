import { Box, Typography, Grid, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import BadgeDefault from "../../assets/images/BadgeDefault.svg";
import CreateBadge3D from "../../assets/images/CreateBadge3D.svg";
import ShareSocialMedia from "../../assets/images/ShareSocialMedia.svg";
import Increased3D from "../../assets/images/Increased3D.svg";
import CheckedBoxes3D from "../../assets/images/CheckedBoxes3D.svg";
import Security3D from "../../assets/images/Security3D.svg";

const BenefitGrid = () => {
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

    return (
        <Box>
            {/* Header */}
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 4 }}>
                Showcase Your Achievements Across Platforms 🚀
            </Typography>

            {/* Card Grid */}
            <Grid
                container
                spacing={3}
                ref={sectionRef}
                variant="outlined"
                className={isVisible ? "animate" : ""}
                sx={{ animation: isVisible ? "bounceIn 2s ease-in-out 0.5s" : "none" }}
            >
                {/* Card 1 - About Open Badges */}
                <Grid item xss={12} sm={6} md={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            textAlign: "center",
                            height: "100%",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, rgba(240, 230, 250, 0.3), rgba(230, 240, 255, 0.3), rgba(255, 240, 245, 0.3), rgba(255, 250, 220, 0.3))",
                            },
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            What Are Open Badges?
                        </Typography>
                        <Box mt={2}>
                            <Box component="img" src={BadgeDefault} alt="Customization Icon" width={100} />
                        </Box>
                        <Typography variant="body1" mt={2}>
                            Open badges are digital representations of skills and achievements that can be shared, verified, and
                            displayed across platforms, giving earners the power to own and showcase their accomplishments.
                        </Typography>
                    </Paper>
                </Grid>

                {/* Card 2 - The Role of Issuers */}
                <Grid item xss={12} sm={6} md={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            textAlign: "center",
                            height: "100%",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, rgba(240, 230, 250, 0.3), rgba(230, 240, 255, 0.3), rgba(255, 240, 245, 0.3), rgba(255, 250, 220, 0.3))",
                            },
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            For Issuers: Credibility and Recognition
                        </Typography>
                        <Typography variant="body1" mt={2}>
                            Organizations that issue badges offer public recognition for skill acquisition, learning milestones,
                            and achievements, helping to establish their authority while supporting learners on their career
                            paths.
                        </Typography>
                        <Box mt={2}>
                            <Box component="img" src={CreateBadge3D} alt="Customization Icon" width={100} />
                        </Box>
                    </Paper>
                </Grid>

                {/* Card 3 - Verifiable Credentials */}
                <Grid item xss={12} sm={6} md={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            textAlign: "center",
                            height: "100%",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, rgba(240, 230, 250, 0.3), rgba(230, 240, 255, 0.3), rgba(255, 240, 245, 0.3), rgba(255, 250, 220, 0.3))",
                            },
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            Public and Verifiable Credentials
                        </Typography>
                        <Box mt={2}>
                            <Box component="img" src={ShareSocialMedia} alt="Plugin Icon" sx={{ width: 100 }} />
                        </Box>
                        <Typography variant="body1" mt={2}>
                            With verifiable credentials, earners can demonstrate their expertise and share it with confidence, as
                            each badge or certificate is securely validated and recognized across platforms.
                        </Typography>
                    </Paper>
                </Grid>

                {/* Card 4 - Value for Organizations */}
                <Grid item xss={12} sm={6} md={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            textAlign: "center",
                            height: "100%",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, rgba(240, 230, 250, 0.3), rgba(230, 240, 255, 0.3), rgba(255, 240, 245, 0.3), rgba(255, 250, 220, 0.3))",
                            },
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            For Organizations: Elevate Your Impact
                        </Typography>
                        <Typography variant="body1" mt={2}>
                            Organizations can amplify their impact by issuing badges that motivate learners, certify
                            accomplishments, and establish their brand as a leader in skill-building and workforce development.
                        </Typography>
                        <Box mt={2}>
                            <Box component="img" src={Increased3D} alt="Customization Icon" width={100} />
                        </Box>
                    </Paper>
                </Grid>

                {/* Card 5 - Cross-Platform Sharing */}
                <Grid item xss={12} sm={6} md={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            textAlign: "center",
                            height: "100%",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, rgba(240, 230, 250, 0.3), rgba(230, 240, 255, 0.3), rgba(255, 240, 245, 0.3), rgba(255, 250, 220, 0.3))",
                            },
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            Share Across Platforms
                        </Typography>
                        <Box mt={2}>
                            <Box component="img" src={CheckedBoxes3D} alt="Customization Icon" width={100} />
                        </Box>
                        <Typography variant="body1" mt={2}>
                            Earners can display their badges across social media, professional networks, and personal portfolios,
                            letting others know about their verified skills and accomplishments instantly.
                        </Typography>
                    </Paper>
                </Grid>

                {/* Card 6 - Security and Integrity */}
                <Grid item xss={12} sm={6} md={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            textAlign: "center",
                            height: "100%",
                            background: "linear-gradient(135deg, #f5f7fa, #e2e8f0)",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, rgba(240, 230, 250, 0.3), rgba(230, 240, 255, 0.3), rgba(255, 240, 245, 0.3), rgba(255, 250, 220, 0.3))",
                            },
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            Ensuring Security and Integrity
                        </Typography>
                        <Typography variant="body1" mt={2}>
                            Our platform prioritizes the security and authenticity of each badge, allowing organizations and
                            earners to trust the credibility and verification of each awarded credential.
                        </Typography>
                        <Box mt={2}>
                            <Box component="img" src={Security3D} alt="Customization Icon" width={100} />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
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
        </Box>
    );
};

export default BenefitGrid;
