// React library import
import { Link } from "react-router-dom";

// MUI import
import { Box, Typography, Button, Stack } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";

// Custom import
import theme from "../../assets/themes";
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import OutletImageComponent from "./OutletImageTemplate";
import ResetPasswordIconSvg from "../../assets/icons/resetPasswordSuccess.svg";

const ResetPasswordSuccessPage = () => {
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
                            <Box
                                component="img"
                                src={RatifyMELogo}
                                alt="Ratifyme Favicon"
                                sx={{ width: 150, height: 150 }}
                            />
                        </Link>

                        <Box component="img" src={ResetPasswordIconSvg} />

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
                                Password Reset Successfully.
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                You've successfully changed your password.
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
                                Login
                            </Button>
                        </Link>
                    </Stack>
                </Box>

                {/* Left side with text */}
                <OutletImageComponent />
            </Box>
        </>
        // ============ End reset password success container ============
    );
};

export default ResetPasswordSuccessPage;
