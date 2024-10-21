// React library import
import { Link } from "react-router-dom";

// MUI import
import { Box, Typography, Button, Stack } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";

// Custom import
import theme from "../../assets/themes";
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import AccountCreatedIconSvg from "../../assets/images/accountCreated.png";
import AuthOutletImage from "../../components/auth/AuthOutletImage";

const SignupSuccessPage = () => {
    return (
        // ============ Start reset password success container ============
        <>
            <Box sx={{ height: "100vh", display: "flex" }}>
                {/* Right side with */}
                <Box
                    flexGrow={0}
                    display="flex"
                    justifyContent="center"
                    sx={{
                        width: { md: "50%", xss: "100%" },
                        mx: "auto",
                        px: 4,
                        backgroundColor: "transparent",
                    }}
                >
                    <Stack width="100%" maxWidth="500px" gap={2}>
                        <Link to="/">
                            <Box component="img" src={RatifyMELogo} alt="Ratifyme Favicon" sx={{ width: 150, height: 150 }} />
                        </Link>

                        <Box component="img" src={AccountCreatedIconSvg} />

                        <Box
                            component="div"
                            width={70}
                            height={70}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: theme.palette.customColors.green100,
                                borderRadius: theme.customShape.card,
                            }}
                        >
                            <CheckCircleOutline sx={{ fontSize: "32px", color: theme.palette.customColors.green400 }} />
                        </Box>

                        <Box my={3}>
                            <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} mb={1}>
                                Account created Successfully.
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                You've successfully created an account.
                            </Typography>
                        </Box>

                        <Link to="/login">
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{
                                    color: theme.palette.customColors.white,
                                    fontWeight: theme.fontWeight.bold,
                                    borderRadius: theme.customShape.btn,
                                    textTransform: "none",
                                }}
                            >
                                Go to Dashboard
                            </Button>
                        </Link>
                    </Stack>
                </Box>

                {/* Left side with text */}
                <AuthOutletImage
                    backgroundColor="#071E3D"
                    image={
                        "https://images.pexels.com/photos/27809294/pexels-photo-27809294/free-photo-of-a-3d-model-of-a-ball-with-red-and-blue-lights.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    }
                    title1="Unlock your potential."
                    title2="Let our digital badges celebrate your journey."
                    description="Transform the future of education and employment by launching a digital credential business that empowers people to securely showcase their skills in a rapidly evolving world."
                />
            </Box>
        </>
        // ============ End reset password success container ============
    );
};

export default SignupSuccessPage;
