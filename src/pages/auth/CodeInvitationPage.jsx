import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import FormInput from "../../components/FormInput";
import theme from "../../assets/themes";
import { useEffect, useState } from "react";

// Custom import
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import { Stack } from "@mui/system";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import OutletImageComponent from "./OutletImageTemplate";
import TaskAltOutlined from "@mui/icons-material/TaskAltOutlined";
import AlertConfirmation from "../../components/alert/AlertConfirmation";
import { useVerifyInvitationMutation } from "../../store/api/userManagement/verifyInvitationApi";
import PageLoading from "../../components/loading/PageLoading";
import { CheckCircleOutline } from "@mui/icons-material";

const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    verifyCode: yup
        .string()
        .matches(/^\d+$/, "Verification code must be numeric")
        .length(6, "Verification code must be 6 digits")
        .required("Verification code is required"),
});

const CodeInvitationPage = () => {
    const { search } = useLocation();
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const [verifyInvitation, { isLoading, isError, error }] = useVerifyInvitationMutation();
    const [openErrorDialog, setOpenErrorDialog] = useState(false);

    // const [loading, setLoading] = useState(false);

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
                    navigate(`/auth/signup?as=${role}`, { state: { inviter: inviterData, guest: guestData } });
                } else {
                    navigate(`/auth/login`);
                }
            }
        } catch (error) {
            console.error("Verification failed:", error);
        }
    };

    useEffect(() => {
        if (isError) {
            setOpenErrorDialog(true);
        }
    }, [isError]);

    const handleCloseErrorDialog = () => {
        setOpenErrorDialog(false);
    };

    return (
        <Box sx={{ height: "100vh", display: "flex" }}>
            <PageLoading isLoading={isLoading} />
            {/* Right side */}
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
                        <Box component="img" src={RatifyMELogo} alt="Ratifyme Favicon" sx={{ width: 150, height: 150 }} />
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
                            schema={schema.fields.verifyCode}
                        />
                        <FormInput
                            name="inviteEmail"
                            type="email"
                            startIcon={<EmailOutlined />}
                            control={control}
                            label="Email Address"
                            required={true}
                            schema={schema.fields.email}
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

                    {/* AlertConfirmation component for error dialog */}
                    <AlertConfirmation
                        open={openErrorDialog}
                        title="Verification Successfully"
                        message={
                            error?.data?.message ||
                            "There was an issue with verifying your invitation. Please try again or log in."
                        }
                        onConfirm={() => navigate(`/auth/login`)}
                        onClose={handleCloseErrorDialog}
                        confirmText="Go to Login"
                        cancelText="Close"
                        iconColor={theme.palette.customColors.green400}
                        iconBgColor={theme.palette.customColors.green100}
                        icon={CheckCircleOutline}
                    />

                    <Box my={3}>
                        <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} mb={1}>
                            Join via RatifyME
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                            To join, please check your inbox (and spam folder) for a verification code sent as part of your Open
                            Badge invitation. This code will be required to complete the login process.
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            {/* Left side */}
            <OutletImageComponent />
        </Box>
    );
};

export default CodeInvitationPage;
