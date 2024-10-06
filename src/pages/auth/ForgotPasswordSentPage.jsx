// React library import
import { Link } from "react-router-dom";

// MUI import
import { Box, Typography, Stack } from "@mui/material";
import { MailOutline } from "@mui/icons-material";

// Custom import
import theme from "../../assets/themes";
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import OutletImageComponent from "./OutletImageTemplate";

const ForgotPasswordSentPage = () => {
    return (
        // ============ Start login container ============
        <Box component="div" sx={{ height: "100vh", display: "flex" }}>
            {/* Right side with login form */}
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
                        <Box
                            component="img"
                            src={RatifyMELogo}
                            alt="Ratifyme Favicon"
                            sx={{ width: 150, height: 150 }}
                        />
                    </Link>

                    <Box
                        component="div"
                        width={70}
                        height={70}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: theme.palette.primary.light,
                            borderRadius: theme.customShape.card,
                        }}
                    >
                        <MailOutline sx={{ fontSize: "32px", color: theme.palette.primary.dark }} />
                    </Box>

                    <Box my={3}>
                        <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} mb={1}>
                            Check your email
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={2}>
                            We've sent a password reset instruction link to user@gmail.com.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            If you haven't recieved an email in 5 minutes, check your spam, resend, or try a different
                            email.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Didn't recieve the email? <Link to='/forgot-password'>Click to resent</Link>
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            {/* Left side with text */}
            <OutletImageComponent />
        </Box>
        // ============ End login container ============
    );
};

export default ForgotPasswordSentPage;
