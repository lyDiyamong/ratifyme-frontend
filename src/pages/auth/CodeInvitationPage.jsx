import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import FormInput from "../../components/FormInput";
import theme from "../../assets/themes";
import LandingContainer from "../../components/styles/LandingContainer";
import LoginImgSvg from "../../assets/images/Login-illu.svg";
import { useEffect, useState } from "react";
import { useVerifyInvitationMutation } from "../../store/api/auth/verifyInvitationApi";

const CodeInvitationPage = () => {
    const { search } = useLocation();
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const [verifyInvitation, { isLoading, isError, error }] = useVerifyInvitationMutation();
    const [openErrorDialog, setOpenErrorDialog] = useState(false);

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
        <LandingContainer sx={{ my: 6 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }}>
                    <Box mb={5}>
                        <Typography
                            component="h4"
                            sx={{
                                fontSize: theme.typography.h2,
                                fontWeight: theme.fontWeight.bold,
                                lineHeight: 2,
                            }}
                        >
                            Verify the invitation
                        </Typography>
                        <Typography sx={{ color: theme.palette.text.secondary }}>
                            Log in to your account to manage your company!
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
                            label={role === "issuer" ? "Institution Code" : "Issuer Code"}
                            type="text"
                            required={true}
                        />
                        <FormInput
                            name="inviteEmail"
                            type="email"
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
                    </Box>
                </Grid>

                <Grid item xs={12} md={8} order={{ xs: 1, md: 2 }}>
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
            {/* Error Dialog */}
            <Dialog open={openErrorDialog} onClose={handleCloseErrorDialog} maxWidth='lg'>
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
        </LandingContainer>
    );
};

export default CodeInvitationPage;
