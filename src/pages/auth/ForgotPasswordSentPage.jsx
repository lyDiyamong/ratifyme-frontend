// React library import
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

// MUI import
import { Box, Typography } from "@mui/material";

// Custom import
import theme from "../../assets/themes";
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import { Stack } from "@mui/system";

const ForgotPasswordSentPage = () => {
    return (
        // ============ Start login container ============
        <Box component="div" sx={{ height: "100vh", display: "flex" }}>
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

                    <Box my={3}>
                        <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} mb={1}>
                            Check your email
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Thanks! If user@gmail.com matches an email, then we've sent you an email containing futher
                            instructions for resetting your password.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            If you haven't recieved an email in 5 minutes, check your spam, resend, or try a different
                            email.
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Box>
        // ============ End login container ============
    );
};

export default ForgotPasswordSentPage;
