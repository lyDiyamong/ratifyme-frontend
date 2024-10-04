import { useForm } from "react-hook-form";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import FormInput from "../../components/FormInput";
import theme from "../../assets/themes";
import { useEffect, useState } from "react";
import { useVerifyInvitationMutation } from "../../store/api/userManagement/verifyInvitationApi";

// Custom import
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import { Stack } from "@mui/system";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import OutletImageComponent from "./OutletImageTemplate";
import TaskAltOutlined from "@mui/icons-material/TaskAltOutlined";

const CodeInvitationPage = () => {
    const { search } = useLocation();
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const [verifyInvitation, { isLoading, isError, error }] = useVerifyInvitationMutation();
    const [openErrorDialog, setOpenErrorDialog] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const queryRole = new URLSearchParams(search).get("as") || "";
        setRole(queryRole);
    }, [search]);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await verifyInvitation({ data, role });

            if (response?.data) {
                const inviterData = response.data.inviter;
                const guestData = response.data.guest;
                const userData = response.data.user;

                if (userData === null) {
                    navigate(`/signup?as=${role}`, { state: { inviter: inviterData, guest: guestData } });
                } else {
                    navigate(`/login`);
                }
            }
        } catch (error) {
            console.error("Verification failed:", error);
        }
    };

    useEffect(() => {
        if (isError) {
            setOpenErrorDialog(true); // Open the dialog when there's an error
        }
    }, [isError]);

    const handleCloseErrorDialog = () => {
        setOpenErrorDialog(false);
    };

    return (
        <Box sx={{ height: "100vh", display: "flex" }}>
            {/* Right side with login form */}
            <Box
                flexGrow={0}
                display="flex"
                justifyContent="center"
                sx={{
                    borderRadius: theme.customShape.section,
                    width: { md: "50%", xss: "100%" },
                    mx: "auto",
                    px: 4,
                    backgroundColor: "transparent",
                }}
            >
                <Stack width="100%" maxWidth="450px" gap={2}>
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
                            Welcome to RatifyME! 👋
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                            Please verify your code through email.
                        </Typography>
                    </Box>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        noValidate
                    >
                        <FormInput
                            name="inviterCode"
                            control={control}
                            startIcon={<TaskAltOutlined />}
                            label={role === "issuer" ? "Institution Code" : "Issuer Code"}
                            type="text"
                            required={true}
                        />
                        <FormInput
                            name="inviteEmail"
                            type="email"
                            startIcon={<EmailOutlined />}
                            control={control}
                            label="Email Address"
                            required={true}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                                color: theme.palette.background.default,
                                borderRadius: theme.customShape.btn,
                                fontWeight: theme.fontWeight.bold,
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? "Verifying..." : "Verify"}
                        </Button>
                        <Dialog open={openErrorDialog} onClose={handleCloseErrorDialog} maxWidth="lg">
                            <DialogTitle>Verification Failed</DialogTitle>
                            <DialogContent>
                                <Typography variant="body1">
                                    {error?.data?.message ||
                                        "There was an issue with verifying your invitation. Please try again or log in."}
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => navigate(`/login`)} variant="contained" color="primary">
                                    Go to Login
                                </Button>
                                <Button onClick={handleCloseErrorDialog} variant="outlined">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                    <Box my={3}>
                        <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} mb={1}>
                            Join via RatifyME
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                            To join, please check your inbox (and spam folder) for a verification code sent as part of
                            your Open Badge invitation. This code will be required to complete the login process.
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            {/* Left side with text */}
            <OutletImageComponent />
        </Box>
    );
};

export default CodeInvitationPage;
