import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

// MUI import
import { Stack } from "@mui/system";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import TaskAltOutlined from "@mui/icons-material/TaskAltOutlined";
import { CheckCircleOutline } from "@mui/icons-material";

// Custom import
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import OutletImageComponent from "./OutletImageTemplate";
import AlertConfirmation from "../../components/alert/AlertConfirmation";
import { useVerifyInvitationMutation } from "../../store/api/userManagement/verifyInvitationApi";
import PageLoading from "../../components/loading/PageLoading";
import AlertMessage from "../../components/alert/AlertMessage";
import useCatchStatus from "../../hooks/useCatchStatus";
import FormInput from "../../components/FormInput";
import theme from "../../assets/themes";

const schema = yup.object({
    inviteEmail: yup.string().email("⚠️ Invalid email").required("⚠️ Email is required"),
    inviterCode: yup
        .string()
        .required("⚠️ Verification code is required")
        .matches(/^\d+$/, "⚠️ Verification code must be numeric")
        .length(6, "⚠️ Verification code must be 6 digits"),
});

const CodeInvitationPage = () => {
    const { search } = useLocation();
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const [verifyInvitation, { isLoading, isSuccess, isError, error, data }] = useVerifyInvitationMutation();
    const [openDialog, setOpenDialog] = useState(false);

    const [message, setMessage] = useCatchStatus(isError, error?.data?.message);

    useEffect(() => {
        const queryRole = new URLSearchParams(search).get("as") || "";
        setRole(queryRole);
    }, [search]);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

    const onSubmit = async (data) => {
        try {
            const response = await verifyInvitation({ data, role });
            if (response?.data) {
                setOpenDialog(true);
            }
        } catch (error) {
            console.error("Verification failed:", error);
        }
    };

    useEffect(() => {
        if (isError) {
            setOpenDialog(true);
        }
    }, [isError]);

    const handleDialogConfirm = () => {
        const { inviter, guest, user } = data;

        if (user === null) {
            navigate(`/auth/signup?as=${role}`, { state: { inviter, guest, isVerified: true } });
        } else {
            navigate(`/auth/login`);
        }
        setOpenDialog(false);
    };

    const handleCloseErrorDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Box sx={{ height: "100vh", display: "flex" }}>
            <PageLoading isLoading={isLoading} />

            {message && (
                <AlertMessage variant="error" onClose={() => setMessage("")}>
                    {message}
                </AlertMessage>
            )}

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
                            schema={schema.fields.inviterCode}
                        />
                        <FormInput
                            name="inviteEmail"
                            type="email"
                            startIcon={<EmailOutlined />}
                            control={control}
                            label="Email Address"
                            required={true}
                            schema={schema.fields.inviteEmail}
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
                    {!isError && (
                        <AlertConfirmation
                            open={openDialog}
                            title="Verification Successfully! 🎉"
                            message={"Congratulations! Your invitation has been successfully verified."}
                            onConfirm={handleDialogConfirm}
                            onClose={handleCloseErrorDialog}
                            confirmText="Get Started"
                            cancelText="Close"
                            iconColor={theme.palette.customColors.green400}
                            iconBgColor={theme.palette.customColors.green100}
                            icon={CheckCircleOutline}
                        />
                    )}

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
