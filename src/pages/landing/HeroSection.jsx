// React library import
import { Link } from "react-router-dom";

// Mui Import
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import {
    AdminPanelSettingsOutlined,
    ApartmentOutlined,
    ArrowForwardIosOutlined,
    CastForEducationOutlined,
    Circle,
} from "@mui/icons-material";

//Custom Import
import LandingContainer from "../../components/styles/LandingContainer";
import theme from "../../assets/themes";

const HeroSection = () => {
    return (
        //============ Start Hero Section  ============
        <Box component="section" display="flex" justifyContent="center" alignItems="center" paddingTop="32px" minHeight="500px">
            {/*  Start Hero Container  */}
            <LandingContainer>
                <Stack
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 4,
                    }}
                >
                    <Chip
                        icon={<Circle color="#0AA4A5" sx={{ fontSize: 10 }} />}
                        label="v1.0.0"
                        variant="outlined"
                        sx={{
                            color: "#0AA4A5",
                            backgroundColor: "#F3FAFA",
                            border: "1px solid #0AA4A5",
                            maxHeight: 28,
                            "&:hover": {
                                cursor: "help",
                            },
                            padding: "0 6px",
                            borderRadius: "8px",
                            fontSize: 16,
                            fontWeight: theme.fontWeight.bold,
                            animation: "bounceIn 2s ease-in-out 0.5s",
                        }}
                    />

                    <Stack
                        sx={{
                            flexDirection: "row",
                            gap: 3,
                            animation: "bounceIn 2s ease-in-out 0.5s",
                            display: { sm: "flex", xss: "none" },
                        }}
                    >
                        <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                            <ApartmentOutlined sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                            <Typography variant="body1" sx={{ color: theme.palette.text.disabled }}>
                                Institution role
                            </Typography>
                        </Stack>

                        <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                            <CastForEducationOutlined sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                            <Typography variant="body1" sx={{ color: theme.palette.text.disabled }}>
                                Issuer role
                            </Typography>
                        </Stack>

                        <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                            <AdminPanelSettingsOutlined sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                            <Typography variant="body1" sx={{ color: theme.palette.text.disabled }}>
                                Earner role
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack sx={{ gap: 1, animation: "bounceIn 2s ease-in-out 0.5s" }}>
                        <Typography
                            sx={{
                                fontSize: { md: "72px", sm: "50px", xss: "40px" },
                                textAlign: "center",
                                maxWidth: 600,
                                fontWeight: theme.fontWeight.bold,
                                lineHeight: 1,
                                marginBottom: "20px",
                            }}
                        >
                            Unlock the future of credentials
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
                            Ensure the authenticity of qualifications, certifications, and professional credentials in real-time.
                        </Typography>
                    </Stack>

                    <Stack sx={{ flexDirection: { sm: "row", xss: "column" }, gap: 2 }}>
                        <Link to="/auth/get-started">
                            <Button
                                variant="contained"
                                sx={{
                                    color: theme.palette.customColors.white,
                                    fontWeight: theme.fontWeight.bold,
                                    textTransform: "none",
                                    fontSize: "18px",
                                    width: "100%",
                                    height: "100%",
                                    px: 2,
                                    py: 1,
                                }}
                            >
                                Let's Get Start
                            </Button>
                        </Link>
                        <a
                            href="https://tech-a.anbschool.org/credential/RMC-48c71123-916c-48b2-9d34-8f5caf272500"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outlined"
                                endIcon={<ArrowForwardIosOutlined />}
                                sx={{
                                    color: theme.palette.customColors.white,
                                    background: "#0B3558",
                                    border: `1px solid #D0D1D6`,
                                    fontWeight: theme.fontWeight.bold,
                                    textTransform: "none",
                                    fontSize: "18px",
                                    px: 2,
                                    py: 1,
                                    "&:hover": {
                                        background: "#133E87",
                                    },
                                }}
                            >
                                Demo Credential
                            </Button>
                        </a>
                    </Stack>
                </Stack>

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
            {/* End Hero Container  */}
        </Box>
    );
    //============ End Hero Section  ============
};

export default HeroSection;
