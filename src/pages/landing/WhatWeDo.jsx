// MUI import
import { Typography, Grid, Box, Stack, Paper } from "@mui/material";

// React library import
import SelectTextInfo from "../../assets/images/SelectTextInfo.svg";
import theme from "../../assets/themes/index";

//Custom import
import LandingContainer from "../../components/styles/LandingContainer";
import Institution from "../../assets/images/Institution.svg";
import { useEffect, useRef, useState } from "react";
import { Check } from "@mui/icons-material";

//============ start What We Do section ============
export default function WhatWeDo() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
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
        <LandingContainer sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Stack sx={{ gap: 1, animation: "bounceIn 2s ease-in-out 0.5s", justifyContent: "center", alignItems: "center" }}>
                <Typography
                    sx={{
                        fontSize: "72px",
                        textAlign: "center",
                        maxWidth: 600,
                        fontWeight: theme.fontWeight.bold,
                        lineHeight: 1,
                        marginBottom: "20px",
                    }}
                >
                    More than just a Certificate
                </Typography>
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: "center",

                        lineHeight: 1.2,
                        marginBottom: "20px",
                        maxWidth: 600,
                    }}
                >
                    Brings through the world’s most connected digital credentialing network.
                </Typography>
            </Stack>

            {/* Start second image and paragraph */}
            <Grid container spacing={4} alignItems="center">
                <Grid container item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }} gap={2.5}>
                    <Typography variant="h2" fontWeight={theme.fontWeight.semiBold}>
                        What RatifyMe Provide ? 👋
                    </Typography>

                    <Typography variant="h4">
                        At RatifyMe we provide the digital credential standard that allows individuals to earn, display, and share
                        verified badges representing their skills and achievements. Each badge contains detailed metadata, such as
                        the issuing organization, criteria for earning the badge, and evidence of the achievement.
                    </Typography>
                    <Typography variant="h4">
                        Making it a trustworthy and portable way to showcase skills across different platforms and communities.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                    <Box
                        component="img"
                        src={SelectTextInfo}
                        alt="What We Do"
                        sx={{
                            width: "100%",
                        }}
                    />
                </Grid>
            </Grid>

            <Stack
                sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: "#1C1C20",
                    border: "1px solid #E4E5EB",
                    flexDirection: "column",
                    alignItems: "center",
                    "@media (min-width: 1000px)": {
                        flexDirection: "row",
                    },
                    backgroundImage: `
          linear-gradient(0deg, transparent 96.5%, rgba(200, 200, 200, 0.4) 100%),
          linear-gradient(90deg, transparent 96.5%, rgba(200, 200, 200, 0.4) 100%)
        `,
                    backgroundSize: "80px 80px",
                    backgroundBlendMode: "overlay",
                    animation: "bounceIn 2s ease-in-out 0.5s",
                }}
            >
                {/* Step Label */}
                <Box display="flex" flexDirection="column" justifyContent="start" alignItems="start " mb={2} padding={2} gap={4}>
                    <Box
                        sx={{
                            backgroundColor: "#3138F2",
                            color: "#FFFF",
                            borderRadius: "8px",
                            px: 1,
                            py: 0.5,
                            fontWeight: "bold",
                            border: "1px solid #FFFF",
                        }}
                    >
                        Earner
                    </Box>

                    <Typography variant="h2" fontWeight={theme.fontWeight.semiBold} color={theme.palette.customColors.white}>
                        Showcase your skills to the world
                    </Typography>
                    <Typography variant="h4" color={theme.palette.customColors.white}>
                        RatifyME can help you effortlessly create stunning, shareable, and professional certificates and also
                        showcase your skills to the world.
                    </Typography>

                    <Stack gap={3}>
                        <Stack
                            sx={{
                                flexDirection: "row",
                                "@media (max-width: 500px)": {
                                    flexDirection: "column",
                                },
                            }}
                            gap={4}
                        >
                            <Stack sx={{ justifyContent: "start", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.customColors.white,
                                        textDecoration: "underline",
                                        textUnderlineOffset: "3px",
                                    }}
                                >
                                    Get Certificate
                                </Typography>
                            </Stack>

                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.customColors.white,
                                        textDecoration: "underline",
                                        textUnderlineOffset: "3px",
                                    }}
                                >
                                    Publish your Credential
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>

                <Box component="img" src={Institution} alt="Image" sx={{ maxWidth: 500, width: "100%" }} />
            </Stack>

            <Box>
                <Typography variant="h2" sx={{ fontWeight: "bold", mb: 4 }}>
                    Unlock Your Achievements 🚀
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
                    {/* Card 1 */}
                    <Grid item xs={12} sm={6} md={4}>
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
                                Claim Your Badge
                            </Typography>
                            <Box mt={2}>
                                <Box
                                    component="img"
                                    src="https://www.todesktop.com/cdn-cgi/image/width=320,height=88,f=auto,fit=cover/feature-images/plugins@3x.png"
                                    alt="Badge Icon"
                                    width="100%"
                                />
                            </Box>
                            <Typography variant="body1" mt={2}>
                                After successfully completing your course, you can claim your badge as a symbol of your
                                accomplishment and skills gained.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Card 2 */}
                    <Grid item xs={12} sm={6} md={4}>
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
                                Deploy Your Certificate
                            </Typography>
                            <Typography variant="body1" mt={2}>
                                Your earned certificate can be seamlessly deployed to AWS S3 for secure storage and easy access.
                                Ensure your achievements are always at hand!
                            </Typography>
                            <Box mt={2}>
                                <Box
                                    component="img"
                                    src="https://www.todesktop.com/cdn-cgi/image/width=320,height=88,f=auto,fit=cover/feature-images/installers@3x.png"
                                    alt="AWS S3 Icon"
                                    width="100%"
                                />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Card 3 */}
                    <Grid item xs={12} sm={6} md={4}>
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
                                Verify Your Credentials
                            </Typography>
                            <Box mt={2}>
                                <Box
                                    component="img"
                                    src="https://www.todesktop.com/cdn-cgi/image/width=320,height=105,f=auto,fit=cover/feature-images/look-and-feel@3x.png"
                                    alt="Verification Icon"
                                    sx={{ width: "100%" }}
                                />
                            </Box>
                            <Typography variant="body1" mt={2}>
                                Share your verified credentials across multiple platforms, showcasing your accomplishments to
                                employers and peers alike. Elevate your professional profile!
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* End second image and paragraph  */}
        </LandingContainer>
    );
}

//============ end What We Do section ============
