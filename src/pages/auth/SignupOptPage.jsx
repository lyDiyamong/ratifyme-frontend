import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, Stack, Typography } from "@mui/material";
import theme from "../../assets/themes";
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import SignupOptionCard from "./SignupOptionCard";
import { signupOptsData } from "../../data/auth/signupOptsData";

const SignupOptPage = () => {
    const navigate = useNavigate();

    // Handles role selection
    const handleRoleSelect = (role) => {
        navigate(
            role === "Institution" ? `/auth/signup?as=${role.toLowerCase()}` : `/auth/join-invitation?as=${role.toLowerCase()}`,
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "center",
                mx: "auto",
                height: "100vh",
                backgroundColor: "#fff",
            }}
        >
            <Stack width="100%" maxWidth="1800px" gap={2} px={3} alignItems='center' mt={6}>
                {/* logo  */}
                <Link to="/">
                    <Box component="img" src={RatifyMELogo} alt="Ratifyme Favicon" sx={{ width: 150, height: 150 }} />
                </Link>

                {/* Signup Options  */}
                <Box>
                    <Typography align="center" variant="h1" fontWeight={theme.fontWeight.semiBold} mb={1}>
                        How do you want to use RatifyMe?
                    </Typography>
                    <Typography align="center" variant="body1" color="text.secondary" mb={3}>
                        We’ll personalize your setup experience accordingly.
                    </Typography>

                    {/* Render signup option cards */}
                    <Grid container spacing={3} justifyContent="center" alignItems="stretch" mt={4}>
                        {signupOptsData.map((opt, index) => (
                            <Grid
                                item
                                key={index}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                            >
                                <SignupOptionCard
                                    title={opt.title}
                                    description={opt.description}
                                    circleBg={opt.circleBg}
                                    icon={opt.icon}
                                    onClick={() => handleRoleSelect(opt.title)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Stack>
        </Box>
    );
};

export default SignupOptPage;
