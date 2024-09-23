// React library import
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI import
import { Box, Grid, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

// Custom import
import theme from "../../assets/themes";
import LandingContainer from "../../components/styles/LandingContainer";
import LoginImgSvg from "../../assets/images/Login-illu.svg";

// Signup options data
const signupOptsData = [
    {
        icon: <AccountBalanceIcon />,
        title: "Institution",
        description:
            "Sign up as an institution to manage badge issuance, track performance, and create verifiable credentials for your learners.",
    },
    {
        icon: <AccountBalanceIcon />,
        title: "Issuer",
        description:
            "Sign up as an issuer to create, award, and manage badges for achievements, certifications, and skills recognition.",
    },
    {
        icon: <AccountBalanceIcon />,
        title: "Earner",
        description:
            "Sign up as an earner to collect and showcase digital badges for your skills and achievements, and share them with employers.",
    },
];

// Card component for signup options
const SignupOptionCard = ({ icon, title, description, onClick }) => (
    <Card
        onClick={onClick} // Pass the onClick as a reference, not by calling it immediately
        sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            backgroundColor: theme.palette.customColors.white,
            borderRadius: theme.customShape.card,
            boxShadow:
                "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;",
            marginBottom: 2,
            padding: "14px 24px",
            ":hover": {
                backgroundColor: theme.palette.action.hover,
            },
        }}
    >
        <CardMedia component={() => icon} sx={{ width: 80 }} alt={`${title} role`} />
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <CardContent>
                <Typography component="div" variant="h4">
                    {title}
                </Typography>
                <Typography variant="subtitle1" component="div" sx={{ color: "text.secondary" }}>
                    {description}
                </Typography>
            </CardContent>
        </Box>
    </Card>
);

const SignupOptPage = () => {
    const navigate = useNavigate();

    // Handles role selection
    const handleRoleSelect = (role) => {
        navigate(
            role === "Institution" ? `/signup?as=${role.toLowerCase()}` : `/join-invitation?as=${role.toLowerCase()}`,
        );
    };

    return (
        // Start signup container
        <LandingContainer sx={{ my: 6 }}>
            {/* Grid container */}
            <Grid container spacing={4}>
                {/* Signup options section */}
                <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                    <Box mb={5}>
                        <Typography
                            component="h1"
                            sx={{
                                fontSize: theme.typography.h1,
                                fontWeight: theme.fontWeight.bold,
                                lineHeight: 1.5,
                            }}
                        >
                            How do you want to use RatifyMe?
                        </Typography>
                        <Typography sx={{ color: theme.palette.text.secondary }}>
                            We’ll personalize your setup experience accordingly.
                        </Typography>
                    </Box>

                    {/* Render signup option cards */}
                    {signupOptsData.map((opt, index) => (
                        <SignupOptionCard
                            key={index}
                            icon={opt.icon}
                            title={opt.title}
                            description={opt.description}
                            onClick={() => handleRoleSelect(opt.title)}
                        />
                    ))}
                </Grid>

                {/* Image container */}
                <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
                    <Box
                        component="img"
                        sx={{
                            width: "100%",
                        }}
                        alt="illustration"
                        src={LoginImgSvg}
                    />
                </Grid>
            </Grid>
            {/* End grid container */}
        </LandingContainer>
        // End signup container
    );
};

export default SignupOptPage;
