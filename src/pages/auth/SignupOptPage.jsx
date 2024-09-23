// React library import
import { useNavigate } from "react-router-dom";

// MUI import
import { Box, Grid, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";

// Custom import
import theme from "../../assets/themes";
import LandingContainer from "../../components/styles/LandingContainer";
import LoginImgSvg from "../../assets/images/Login-illu.svg";
import SchoolImage from "../../assets/images/school.png";
import IssuerImage from "../../assets/images/teach.png";
import EarnerImage from "../../assets/images/badge.png";

// Signup options data
const signupOptsData = [
    {
        image: SchoolImage,
        title: "Institution",
        description:
            "Sign up as an institution to manage badge issuance, track performance, and create verifiable credentials for your learners.",
    },
    {
        image: IssuerImage,
        title: "Issuer",
        description:
            "Sign up as an issuer to create, award, and manage badges for achievements, certifications, and skills recognition.",
    },
    {
        image: EarnerImage,
        title: "Earner",
        description:
            "Sign up as an earner to collect and showcase digital badges for your skills and achievements, and share them with employers.",
    },
];

// Card component for signup options
const SignupOptionCard = ({ image, title, description, onClick }) => (
    <Card
        onClick={onClick} 
        sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            backgroundColor: theme.palette.augmentColor.white,
            borderRadius: theme.customShape.card,
            boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 2px;",
            marginBottom: 2,
            padding: "14px 24px",
            ":hover": {
                backgroundColor: theme.palette.action.hover,
            },
        }}
    >
        <CardMedia
            component="img"
            image={image}
            alt={`${title} image`}
            sx={{ width: 80, height: 80, marginRight: 2 }}
        />
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
                <Grid item xs={12} md={10} order={{ xs: 2, md: 1 }}>
                    <Box mb={5}>
                        <Typography
                            component="h1"
                            sx={{
                                fontSize: theme.typography.h2,
                                fontWeight: theme.fontWeight.bold,
                                lineHeight: 1.7,
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
                            image={opt.image}
                            title={opt.title}
                            description={opt.description}
                            onClick={() => handleRoleSelect(opt.title)}
                        />
                    ))}
                </Grid>

            </Grid>
            {/* End grid container */}
        </LandingContainer>
        // End signup container
    );
};

export default SignupOptPage;
